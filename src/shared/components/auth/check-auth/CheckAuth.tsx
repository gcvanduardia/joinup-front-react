import React from 'react';
import { IonSpinner, IonText } from '@ionic/react';
import './CheckAuth.css';

const CheckAuth: React.FC = () => {

    return (
        <div className="loading-container">
            <IonSpinner name="circles" className="large-spinner" color={'primary'}></IonSpinner>
            <IonText color="primary">
                <h1>verificando...</h1>
            </IonText>
        </div>
    );
}

export default CheckAuth;