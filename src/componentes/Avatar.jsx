import classes from './Avatar.module.css';

// Avatar da pessoa logada: a foto recortada em círculo ou, sem foto, as iniciais.
// Recebe a classe de tamanho e cor de quem usa, a foto (endereço ou null), as iniciais
// e o alt (vazio quando o nome já aparece ao lado; senão, o nome da pessoa).
export default function Avatar({ className = '', foto, iniciais, alt = '' }) {
  if (foto) {
    return (
      <span className={`${className} ${classes.comFoto}`} aria-hidden={alt ? undefined : 'true'}>
        <img className={classes.imagem} src={foto} alt={alt} />
      </span>
    );
  }
  return (
    <span className={className} aria-hidden="true">
      {iniciais}
    </span>
  );
}
