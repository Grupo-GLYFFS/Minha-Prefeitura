import { useEffect } from 'react';
import Logo from '../Logo';
import PainelConta from './PainelConta';
import BarraVoltar from '../celular/BarraVoltar';
import classes from './MolduraConta.module.css';

// Frase do painel azul quando a página não passa outra
const FRASE_PADRAO = 'Peça, acompanhe e vote sem sair de casa.';

// Moldura das páginas Entrar, Criar conta, Esqueci minha senha e Nova senha (prancha AC3-V3):
// painel azul estreito à esquerda e o formulário numa coluna de 400 no meio da área branca,
// sem Topo e sem Rodapé. No tablet, sem o painel: só o logo centralizado no alto
// (para voltar ao Início) e o formulário logo abaixo. No celular, a barra "‹ Voltar" fica no alto
// (volta uma página, ou ao Início) e o logo com o formulário ficam no meio da altura da tela;
// se não couberem, começam no alto e a página rola.
// Recebe:
// - frase: frase no pé do painel azul;
// - titulo (h1) e texto (linha embaixo do título, opcional);
// - children: o formulário e o que vem depois dele.
export default function MolduraConta({ frase = FRASE_PADRAO, titulo, texto, children }) {
  // Título da aba do navegador: "<h1> · Minha Prefeitura"
  useEffect(() => {
    document.title = `${titulo} · Minha Prefeitura`;
  }, [titulo]);

  return (
    <div className={classes.tela}>
      <BarraVoltar />
      <main className={classes.lado} id="conteudo">
        <div className={classes.barra}>
          <Logo />
        </div>

        <div className={classes.coluna}>
          <h1 className={classes.titulo}>{titulo}</h1>
          {texto && <p className={classes.texto}>{texto}</p>}
          {children}
        </div>
      </main>

      <PainelConta frase={frase} />
    </div>
  );
}
