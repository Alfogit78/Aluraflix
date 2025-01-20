import { Link } from "react-router-dom";
import styles from "./Cabecera.module.css";
import Nav from "../Nav/Nav";
import logo from "./logo.svg";

function Cabecera() {
  return (
    <header className={styles.cabecera}>
      <Link to="/">
        <section className={styles.logoContainer}>
          <img src={logo} alt="Logo de Alura" className={styles.logo} />
          <span className={styles.titulo}>ONE</span>
        </section>
      </Link>
      <nav>
        <Nav url="/">HOME</Nav>
        <Nav url="/agregar-video">NUEVO VIDEO</Nav>
      </nav>
    </header>
  );
}

export default Cabecera;
