import Pagina from '../componentes/Pagina';
import CabecalhoGs from '../componentes/gs/CabecalhoGs';
import CardIntegrante from '../componentes/gs/CardIntegrante';
import CardPitch from '../componentes/gs/CardPitch';
import BannerFimGs from '../componentes/gs/BannerFimGs';
import { INTEGRANTES } from '../dados/equipe';
import classes from './GlobalSolution.module.css';
import classesEquipe from './Equipe.module.css';

// Equipe (/equipe), última página da Global Solution: os 5 integrantes do grupo GLYFFS
// (3 + 2 centralizados), o card do pitch e o banner que leva ao app.
// Nomes, RMs e links ficam em dados/equipe.js.
export default function Equipe() {
  return (
    <Pagina
      cabecalho={
        <CabecalhoGs atual="equipe" />
      }
    >
      <div className={classes.pilha}>
        <section aria-labelledby="equipe-integrantes">
          <h2 className={classesEquipe.oculto} id="equipe-integrantes">
            Integrantes
          </h2>
          <ul className={classesEquipe.integrantes}>
            {INTEGRANTES.map((integrante) => (
              <CardIntegrante key={integrante.rm} integrante={integrante} />
            ))}
          </ul>
        </section>
        <CardPitch />
        <BannerFimGs atual="equipe" />
      </div>
    </Pagina>
  );
}
