import { useSyncExternalStore } from 'react';
import { useSessao } from './useSessao';

// Foto de perfil da pessoa logada. Começa pela foto do cadastro (a Maria tem uma, em
// dados/usuario.js); a foto escolhida em Meu perfil fica só na memória enquanto o app está
// aberto: não é guardada no navegador (ver a página Privacidade).
// Escolhas por id da conta: endereço blob: da foto nova, ou null quando a pessoa removeu.
const escolhas = new Map();
let versao = 0;
const ouvintes = new Set();

// Avisa os componentes que usam o hook. Recebe a função chamada a cada mudança.
function inscrever(ouvinte) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

// Troca a foto de uma conta e avisa quem usa. Recebe o id e o endereço (blob:) ou null para remover.
function trocarFoto(id, novaFoto) {
  const anterior = escolhas.get(id);
  if (anterior) URL.revokeObjectURL(anterior);
  escolhas.set(id, novaFoto);
  versao += 1;
  ouvintes.forEach((ouvinte) => ouvinte());
}

// Dá acesso à foto de perfil da pessoa logada e às ações de trocar e remover.
// Devolve { foto, escolherArquivo(arquivo), removerFoto() }; foto é null sem foto (ou visitante).
export function useFotoPerfil() {
  const { usuario } = useSessao();
  useSyncExternalStore(inscrever, () => versao);
  const id = usuario?.id;
  let foto = null;
  if (usuario) foto = escolhas.has(id) ? escolhas.get(id) : (usuario.foto ?? null);
  return {
    foto,
    escolherArquivo: (arquivo) => trocarFoto(id, URL.createObjectURL(arquivo)),
    removerFoto: () => trocarFoto(id, null),
  };
}
