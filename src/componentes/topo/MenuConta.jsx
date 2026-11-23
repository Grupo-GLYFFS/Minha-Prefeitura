import { Link, useLocation } from 'react-router-dom';
import Botao from '../Botao';
import Icone from '../Icone';
import { usePainelAberto } from './usePainelAberto';
import { useSessao } from '../../contexto/useSessao';
import { useCaminhoConta } from '../../contexto/useCaminhoConta';
import { useSair } from '../../contexto/useSair';
import { useFotoPerfil } from '../../contexto/useFotoPerfil';
import Avatar from '../Avatar';
import { MENU_CONTA } from '../../dados/navegacao';
import classes from './MenuConta.module.css';
import painel from './PainelMenu.module.css';

// Canto direito do topo.
// Visitante: botões "Entrar" e "Criar conta" (voltam para a página atual depois).
// Logado: botão com avatar e primeiro nome que abre o menu da conta. O resumo (avatar, nome
// e e-mail) leva a Meu perfil; depois vêm Minhas solicitações, Meus pedidos, Meus votos,
// O que você segue, Configurações e Sair. Linhas de separação de borda a borda do painel.
export default function MenuConta() {
  const { usuario } = useSessao();
  const caminhos = useCaminhoConta();
  const sairDaConta = useSair();
  const { foto } = useFotoPerfil();
  const { pathname } = useLocation();
  const { aberto, fechar, alternar, refContorno, aoTeclar } = usePainelAberto();

  if (!usuario) {
    return (
      <>
        <Botao variante="secundario" compacto para={caminhos.entrar}>
          Entrar
        </Botao>
        <Botao variante="principal" compacto para={caminhos.criarConta}>
          Criar conta
        </Botao>
      </>
    );
  }

  // Marca o item da página atual
  const atual = (caminho) => (pathname === caminho ? 'page' : undefined);

  return (
    <div className={classes.contorno} ref={refContorno} onKeyDown={aoTeclar}>
      <button
        type="button"
        className={classes.botao}
        aria-label={`Menu da conta de ${usuario.nome}`}
        aria-expanded={aberto}
        aria-controls="menu-conta"
        onClick={alternar}
      >
        <Avatar className={classes.avatar} foto={foto} iniciais={usuario.iniciais} />
        <span className={classes.nome}>{usuario.primeiroNome}</span>
        <Icone nome="expand_more" tamanho={20} />
      </button>

      <div className={`${painel.painel} ${classes.painelConta}`} id="menu-conta" hidden={!aberto}>
        <ul className={painel.lista}>
          <li>
            <Link
              to="/perfil"
              className={classes.quem}
              aria-current={atual('/perfil')}
              aria-label={`Meu perfil de ${usuario.nome}, ${usuario.email}`}
              onClick={fechar}
            >
              <Avatar className={classes.quemAvatar} foto={foto} iniciais={usuario.iniciais} />
              <span className={classes.quemTexto} aria-hidden="true">
                <span className={classes.quemNome}>{usuario.nome}</span>
                <span className={classes.quemEmail}>{usuario.email}</span>
              </span>
              <Icone nome="chevron_right" tamanho={22} className={classes.quemSeta} />
            </Link>
          </li>
          <li className={painel.sep} role="separator" />
          {MENU_CONTA.map((item) => (
            <li key={item.caminho}>
              <Link
                to={item.caminho}
                className={painel.item}
                aria-current={atual(item.caminho)}
                onClick={fechar}
              >
                <Icone nome={item.icone} tamanho={20} className={painel.itemIcone} />
                {item.rotulo}
              </Link>
            </li>
          ))}
          <li className={painel.sep} role="separator" />
          <li>
            <button type="button" className={painel.item} onClick={sairDaConta}>
              <Icone nome="logout" tamanho={20} className={painel.itemIcone} />
              Sair
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
