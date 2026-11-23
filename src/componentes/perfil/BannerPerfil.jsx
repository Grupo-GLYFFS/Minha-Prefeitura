import Icone from '../Icone';
import classes from './BannerPerfil.module.css';

// Banner azul do Meu perfil (30): foto (ou iniciais) de 120, nome e e-mail.
// A foto é um botão: no mouse e no foco aparece "Editar", e o clique abre o popup Trocar foto.
// Recebe o usuario ({ nome, email, iniciais }), a foto (endereço da imagem ou null)
// e aoTrocarFoto().
export default function BannerPerfil({ usuario, foto, aoTrocarFoto }) {
  return (
    <section className={classes.banner} aria-label="Seus dados">
      <button
        type="button"
        className={`${classes.foto} ${foto ? classes.comFoto : ''}`}
        aria-haspopup="dialog"
        aria-label="Trocar foto"
        onClick={aoTrocarFoto}
      >
        {foto ? (
          <img className={classes.imagem} src={foto} alt="" />
        ) : (
          <span aria-hidden="true">{usuario.iniciais}</span>
        )}
        <span className={classes.editar} aria-hidden="true">
          <span className={classes.pilula}>
            <Icone nome="edit" tamanho={20} />
            Editar
          </span>
        </span>
      </button>
      <div className={classes.texto}>
        <p className={classes.nome}>{usuario.nome}</p>
        <p className={classes.email}>{usuario.email}</p>
      </div>
    </section>
  );
}
