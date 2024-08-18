import React from "react";
import NavComponent from "./NavComponent";
import styles from "../../styles/Navigation.module.css";
import { Outlet } from "react-router-dom";

const TopComponent: React.FC = () => {
  return (
    <nav className={styles.topNav}>
      <ul>
        <NavComponent horizontalPosition="left" path="/" title="FlightBooker" />
        <NavComponent
          horizontalPosition="right"
          path="/language"
          title="Language"
        />
        <NavComponent horizontalPosition="right" path="/login" title="Login" />
      </ul>

      <Outlet />
    </nav>
  );
};

export default TopComponent;
