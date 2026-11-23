import { STATUS_PEDIDO } from '../dados/statusPedido';
import { CATEGORIAS_PEDIDO } from '../dados/categoriasPedido';
import { HOJE, diasEntre, tempoRelativo } from './datas';
import { calcularPrioridade } from './prioridade';
import { PEDIDOS } from '../dados/pedidos';

// Procura os dados de um status (rótulo, cores, se está aberto).
// Recebe o id do status (ex.: "em-analise"); devolve o objeto do status ou undefined.
export function buscarStatus(idStatus) {
  return STATUS_PEDIDO.find((status) => status.id === idStatus);
}

// Procura os dados de uma categoria (rótulo, ícone, órgão).
// Recebe o id da categoria (ex.: "iluminacao"); devolve o objeto da categoria ou undefined.
export function buscarCategoria(idCategoria) {
  return CATEGORIAS_PEDIDO.find((categoria) => categoria.id === idCategoria);
}

// Foto de cada categoria (em public/img/pedidos) e o que ela mostra, para o texto alternativo
const FOTOS_CATEGORIA = {
  pavimentacao: 'Buraco com água no asfalto de uma rua',
  calcada: 'Calçada de pedras soltas, levantada pela raiz de uma árvore',
  entulho: 'Entulho e um sofá velho largados na esquina',
  iluminacao: 'Poste com a lâmpada apagada numa rua escura',
  'boca-de-lobo': 'Boca de lobo entupida de folhas e lixo',
  poda: 'Galhos de árvore tomando o poste e os fios',
  sinalizacao: 'Faixa de pedestres apagada num cruzamento',
};

// Segunda foto de cada categoria (arquivo <categoria>-2.jpg) e o que ela mostra
const FOTOS_CATEGORIA_2 = {
  pavimentacao: 'Rua com vários buracos e poças no asfalto',
  calcada: 'Calçada rachada e afundada em frente a uma escola municipal',
  entulho: 'Sacos de lixo e restos de obra junto à grade de um terreno',
  iluminacao: 'Poste apagado numa praça escura à noite',
  'boca-de-lobo': 'Boca de lobo transbordando com a chuva',
  poda: 'Galho quebrado pendendo sobre a calçada',
  sinalizacao: 'Placa de trânsito caída na calçada de um cruzamento',
};

// Posição de cada pedido de exemplo dentro da sua categoria (0, 1, 2...), na ordem dos dados.
// Serve para alternar as duas fotos da categoria: 1ª, 2ª, 1ª, 2ª...
const POSICAO_NA_CATEGORIA = (() => {
  const contagem = {};
  const posicao = {};
  for (const pedido of PEDIDOS) {
    const n = contagem[pedido.categoria] ?? 0;
    posicao[pedido.id] = n;
    contagem[pedido.categoria] = n + 1;
  }
  return posicao;
})();

// Pedidos cuja foto foi escolhida pelo que ela mostra (true = 2ª foto, false = 1ª).
const FOTO_ESCOLHIDA = {
  'p-006': true, // calçada da escola
  'p-034': false, // raiz levantando a calçada
  'p-022': true, // vários buracos
  'p-002': false,
  'p-024': true, // praça escura
  'p-001': false,
  'p-015': true, // terreno com entulho
  'p-027': false, // sofá na esquina
  'p-020': true, // bueiro transbordando
  'p-005': false,
  'p-021': true, // galho rachado
  'p-003': false, // galhos na fiação
  'p-016': true, // placa caída
  'p-007': false, // faixa apagada
};

// Escolhe a imagem do pedido: a foto que a pessoa enviou (pedido.foto) ou uma das fotos da categoria.
// Os pedidos de exemplo alternam as duas fotos da categoria pela posição nos dados; um pedido novo
// usa a soma dos números do id. Recebe o pedido; devolve { src, alt } ou null sem foto.
export function imagemDoPedido(pedido) {
  if (pedido.foto) return { src: pedido.foto, alt: `Foto enviada: ${pedido.titulo}` };
  const alt = FOTOS_CATEGORIA[pedido.categoria];
  if (!alt) return null;
  const alt2 = FOTOS_CATEGORIA_2[pedido.categoria];
  const posicao =
    POSICAO_NA_CATEGORIA[pedido.id] ??
    String(pedido.id ?? '')
      .replace(/\D/g, '')
      .split('')
      .reduce((soma, digito) => soma + Number(digito), 0);
  const segunda = FOTO_ESCOLHIDA[pedido.id] ?? posicao % 2 === 1;
  if (alt2 && segunda) {
    return { src: `img/pedidos/${pedido.categoria}-2.jpg`, alt: alt2 };
  }
  return { src: `img/pedidos/${pedido.categoria}.jpg`, alt };
}

// Diz se o pedido ainda está em andamento. Recebe o pedido; devolve true ou false.
export function estaAberto(pedido) {
  return buscarStatus(pedido.status)?.aberto ?? false;
}

// Separa os pedidos em andamento de uma pessoa, do mais recente para o mais antigo.
// Recebe a lista de pedidos e o id da pessoa; devolve uma nova lista.
export function pedidosAbertosDaPessoa(pedidos, idPessoa) {
  return pedidos
    .filter((pedido) => pedido.autorId === idPessoa && estaAberto(pedido))
    .sort((a, b) => b.atualizadoEm.localeCompare(a.atualizadoEm));
}

// Separa todos os pedidos de uma pessoa: primeiro os em andamento, depois os encerrados;
// em cada grupo, do mais recente para o mais antigo.
// Recebe a lista de pedidos e o id da pessoa; devolve uma nova lista.
export function pedidosDaPessoa(pedidos, idPessoa) {
  return pedidos
    .filter((pedido) => pedido.autorId === idPessoa)
    .sort(
      (a, b) =>
        Number(estaAberto(b)) - Number(estaAberto(a)) ||
        b.atualizadoEm.localeCompare(a.atualizadoEm),
    );
}

// Filtros da lista "Meus pedidos": todos, só os em andamento ou só os encerrados
export const SITUACOES_PEDIDO = [
  { value: 'todos', label: 'Todos' },
  { value: 'andamento', label: 'Em andamento' },
  { value: 'encerrados', label: 'Encerrados' },
];

// Filtra os pedidos pela situação escolhida.
// Recebe a lista e a situação ("todos", "andamento" ou "encerrados"); devolve uma nova lista.
export function filtrarPorSituacao(pedidos, situacao) {
  if (situacao === 'andamento') return pedidos.filter(estaAberto);
  if (situacao === 'encerrados') return pedidos.filter((pedido) => !estaAberto(pedido));
  return pedidos;
}

// Resume os pedidos em andamento de um bairro.
// Recebe a lista de pedidos e o nome do bairro; devolve { abertos } com a quantidade.
// (As obras do bairro vêm de Obras da Cidade, não dos pedidos.)
export function resumirPedidosDoBairro(pedidos, bairro) {
  return {
    abertos: pedidos.filter((pedido) => pedido.bairro === bairro && estaAberto(pedido)).length,
  };
}

// Escolhe os pedidos em andamento de um bairro, dos mais prioritários para os menos.
// Recebe a lista de pedidos, o nome do bairro e quantos devolver; devolve uma nova lista.
export function pedidosPrioritariosDoBairro(pedidos, bairro, quantidade = 3) {
  return pedidos
    .filter((pedido) => pedido.bairro === bairro && estaAberto(pedido))
    .sort((a, b) => calcularPrioridade(b) - calcularPrioridade(a))
    .slice(0, quantidade);
}

// Escreve quando o pedido mudou pela última vez.
// Recebe o pedido e a data de hoje; devolve "Enviado ontem" (se nunca mudou depois de criado)
// "Atualizado há 2 dias" ou, depois de 7 dias, "Atualizado em 5 nov".
export function textoUltimaMudanca(pedido, hoje = HOJE) {
  const nuncaMudou = diasEntre(pedido.criadoEm, pedido.atualizadoEm) === 0;
  const verbo = nuncaMudou ? 'Enviado' : 'Atualizado';
  return `${verbo} ${tempoRelativo(pedido.atualizadoEm, hoje)}`;
}

// Aplica as mudanças de status guardadas (ex.: um pedido novo que passou para "em análise").
// Recebe a lista de pedidos e um objeto { idPedido: { status, atualizadoEm } };
// devolve uma nova lista com os status trocados.
export function aplicarMudancasStatus(pedidos, mudancas) {
  return pedidos.map((pedido) =>
    mudancas[pedido.id] ? { ...pedido, ...mudancas[pedido.id] } : pedido,
  );
}

// Situações em que quem abriu o pedido ainda pode cancelar
const STATUS_CANCELAVEIS = ['enviada', 'em-analise'];

// Diz se a pessoa pode cancelar o pedido: só o próprio, enquanto Enviado ou Em análise.
// Recebe o pedido e o id da pessoa logada; devolve true ou false.
export function podeCancelar(pedido, idPessoa) {
  return (
    Boolean(idPessoa) && pedido.autorId === idPessoa && STATUS_CANCELAVEIS.includes(pedido.status)
  );
}

// Diz se a seção "Avalie o serviço" aparece: pedido da pessoa, Concluído ou já Avaliado.
// Recebe o pedido e o id da pessoa logada; devolve true ou false.
export function mostraAvaliacao(pedido, idPessoa) {
  return (
    Boolean(idPessoa) &&
    pedido.autorId === idPessoa &&
    (pedido.status === 'concluida' || pedido.status === 'avaliada')
  );
}

// Procura um pedido pelo id. Recebe a lista e o id; devolve o pedido ou undefined.
export function buscarPedido(pedidos, idPedido) {
  return pedidos.find((pedido) => pedido.id === idPedido);
}
