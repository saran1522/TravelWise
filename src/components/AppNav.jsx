import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.active}>
          <NavLink to="cities" className={styles.active}>
            cities
          </NavLink>
        </li>
        <li>
          <NavLink to="countries" className={styles.active}>
            coutnries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
