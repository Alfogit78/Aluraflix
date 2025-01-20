import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav({ url, children }) {
  return (
    <Link to={url} className={styles.link}>
      {children}
    </Link>
  );
}

export default Nav;

