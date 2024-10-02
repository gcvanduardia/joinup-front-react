import React from 'react';
import { IonSpinner, IonText } from '@ionic/react';
import styles from './CheckAuth.module.css';

const CheckAuth: React.FC = () => {

    return (
        <div className={styles["loading-container"]}>
            <IonSpinner name="circles" className={styles["large-spinner"]} color={'primary'}></IonSpinner>
            <IonText color="primary">
                <h1>verificando...</h1>
            </IonText>
        </div>
    );
}

export default CheckAuth;