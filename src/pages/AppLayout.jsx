import AppNav from "../components/AppNav";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import User from "../components/User";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
