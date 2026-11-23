import { useState } from 'react';
import Icone from '../Icone';
import classes from './CardIntegrante.module.css';

// Card de um integrante da equipe: faixa azul-clara em cima, avatar sobreposto,
// nome, RM, divisória de borda a borda e o papel no projeto.
// Recebe o integrante { nome, rm, papel, foto } (dados/equipe.js).
// O avatar mostra a foto; se o arquivo não existir (onError), volta para o ícone.
export default function CardIntegrante({ integrante }) {
  const [semFoto, setSemFoto] = useState(!integrante.foto);

  return (
    <li className={classes.card}>
      <div className={classes.faixa} />
      {semFoto ? (
        <span className={classes.avatar} aria-hidden="true">
          <Icone nome="person" tamanho={32} />
        </span>
      ) : (
        <span className={classes.avatar}>
          <img
            className={classes.foto}
            src={integrante.foto}
            alt={integrante.nome}
            onError={() => setSemFoto(true)}
          />
        </span>
      )}
      <div className={classes.texto}>
        <h3 className={classes.nome} title={integrante.nome}>{integrante.nome}</h3>
        <p className={classes.rm}>RM {integrante.rm}</p>
      </div>
      <p className={classes.papel}>{integrante.papel}</p>
    </li>
  );
}
