import React from 'react';
import NavComponent from "./NavComponent";
import styles from "../../styles/Navigation.module.css"
import { Outlet } from 'react-router-dom';

const BottomComponent: React.FC = () => {
    return (
        <nav className={styles.bottomNav}>
            <ul>
                <NavComponent horizontalPosition='left' path='/' title='FlightBooker'/>
                <NavComponent horizontalPosition='right' path='/customerservice' title='CustomerService'/>
            </ul>

            <Outlet />
        </nav>
    );
};

export default BottomComponent;
