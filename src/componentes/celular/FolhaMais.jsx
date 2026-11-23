import { Link, useLocation } from 'react-router-dom';
import Popup from '../Popup';
import Botao from '../Botao';
import Icone from '../Icone';
import { useSessao } from '../../contexto/useSessao';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { useSair } from '../../contexto/useSair';
import { useFotoPerfil } from '../../contexto/useFotoPerfil';
import Avatar from '../Avatar';
import { useNotificacoes } from '../../contexto/useNotificacoes';
import { MENU_CONTA } from '../../dados/navegacao';
import classes from './FolhaMais.module.css';

// Grupos de links da folha, depois da conta
const GRUPOS = [
  {
    titulo: 'Global Solution',
    links: [
      { rotulo: 'Apresentação', caminho: '/', icone: 'public' },
      { rotulo: 'Como funciona', caminho: '/como-funciona', icone: 'route' },
      { rotulo: 'Impacto', caminho: '/impacto', icone: 'insights' },
      { rotulo: 'Equipe', caminho: '/equipe', icone: 'groups' },
    ],
  },
  {
    titulo: 'Ajuda',
    links: [
      { rotulo: 'Perguntas frequentes', caminho: '/ajuda/perguntas-frequentes', icone: 'help' },
      { rotulo: 'Telefones úteis', caminho: '/ajuda/telefones', icone: 'call' },
      { rotulo: 'Privacidade', caminho: '/ajuda/privacidade', icone: 'shield_person' },
    ],
  },
];

// Linha da folha: ícone, nome, contagem (opcional) e chevron. Divisórias de borda a borda.
// Recebe o caminho, o ícone, o rótulo, a contagem e aoIr() (fecha a folha).
function LinhaMais({ caminho, icone, rotulo, contagem, aoIr }) {
  const { pathname } = useLocation();
  return (
    <li>
      <Link
        to={caminho}
        className={classes.linha}
        aria-current={pathname === caminho ? 'page' : undefined}
        onClick={aoIr}
      >
        <Icone nome={icone} tamanho={22} className={classes.icone} />
        <span className={classes.rotulo}>{rotulo}</span>
        {contagem > 0 && (
          <span className={classes.contagem} aria-label={`${contagem} não lidas`}>
            {contagem}
          </span>
        )}
        <Icone nome="chevron_right" tamanho={22} className={classes.chevron} />
      </Link>
    </li>
  );
}

// Folha "Mais" do celular (abre pela aba Mais), na ordem da prancha 29:
// com conta, o resumo (avatar, nome, "Meu perfil"), Minhas solicitações, Meus pedidos, Meus votos,
// O que você segue, Notificações (com o número de não lidas) e Configurações;
// sem conta, a frase e o botão "Entrar ou criar conta".
// Depois, os grupos Global Solution e Ajuda e, para quem entrou, Sair no fim.
// Diferente das outras folhas, ela acaba no topo da barra de abas: a aba Mais fica marcada e
// clicável por cima, e tocar nela de novo fecha a folha.
// Recebe aberto e aoFechar().
export default function FolhaMais({ aberto, aoFechar }) {
  const { usuario } = useSessao();
  const caminhos = useCaminhoConta();
  const sairDaConta = useSair();
  const { foto } = useFotoPerfil();
  const { naoLidas } = useNotificacoes();

  // Notificações entra depois de "O que você segue", antes de Configurações
  const itensConta = [...MENU_CONTA];
  itensConta.splice(itensConta.length - 1, 0, {
    rotulo: 'Notificações',
    caminho: '/notificacoes',
    icone: 'notifications',
    contagem: naoLidas,
  });

  function sair() {
    aoFechar();
    sairDaConta();
  }

  return (
    <Popup
      aberto={aberto}
      aoFechar={aoFechar}
      titulo="Mais"
      semPadding
      extras={{ inner: classes.inner, veu: classes.veu, caixa: classes.caixa }}
    >
      {usuario ? (
        <>
          <Link
            to="/perfil"
            className={classes.quem}
            aria-label={`Meu perfil de ${usuario.nome}`}
            onClick={aoFechar}
          >
            <Avatar className={classes.avatar} foto={foto} iniciais={usuario.iniciais} />
            <span className={classes.quemTexto} aria-hidden="true">
              <b className={classes.quemNome}>{usuario.nome}</b>
              <small className={classes.quemMeta}>Meu perfil</small>
            </span>
            <Icone nome="chevron_right" tamanho={22} className={classes.chevron} />
          </Link>
          <ul className={classes.linhas}>
            {itensConta.map((item) => (
              <LinhaMais key={item.caminho} {...item} aoIr={aoFechar} />
            ))}
          </ul>
        </>
      ) : (
        <div className={classes.entrar}>
          <p className={classes.entrarTexto}>
            Entre para pedir serviços, abrir pedidos e acompanhar tudo pelo app.
          </p>
          <Botao
            variante="principal"
            largo
            icone="arrow_forward"
            iconeDireita
            para={caminhos.entrar}
            onClick={aoFechar}
          >
            Entrar ou criar conta
          </Botao>
        </div>
      )}

      {GRUPOS.map((grupo) => (
        <section key={grupo.titulo} aria-label={grupo.titulo}>
          <h3 className={classes.grupoTitulo}>{grupo.titulo}</h3>
          <ul className={classes.linhas}>
            {grupo.links.map((item) => (
              <LinhaMais key={item.caminho} {...item} aoIr={aoFechar} />
            ))}
          </ul>
        </section>
      ))}

      {usuario && (
        <button type="button" className={`${classes.linha} ${classes.sair}`} onClick={sair}>
          <Icone nome="logout" tamanho={22} className={classes.icone} />
          <span className={classes.rotulo}>Sair</span>
        </button>
      )}
    </Popup>
  );
}
