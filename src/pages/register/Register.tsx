import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonGrid, IonCol, IonRow, IonCard, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Register.module.css';
import useApi from "../../shared/services/api/api";

const Register: React.FC = () => {

    const { apiReq } = useApi();
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [document, setDocument] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleLoginRedirect = () => {
        history.push('/login'); // Redirige a la página de inicio de sesión
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            document: document,
            phone: phone,
            password: password,
            userName: userName
        };
        apiReq('POST', 'auth/register', body)
            .then((response) => {
                if(!response){
                    console.log('No response from server');
                    return;
                }
                if (response.status === 200) {
                    console.log('Registration success');
                    setSuccessMessage(response.data.message);
                    setShowSuccessAlert(true);
                } else {
                    console.log('Registration failed', response.data);
                    setErrorMessage(response.data.message); 
                    setShowAlert(true);
                }
            })
            .catch((error: any) => {
                console.error('Registration failed: ', error);
            });
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid fixed className={styles.fondo}>
                    <IonRow>
                        <IonCol size="12" className={styles.container}>
                            <IonCard className={styles['card-container']}>
                                <IonRow className={styles['center-content']}>
                                    <IonLabel className={styles.titulo}>Mi Plataforma</IonLabel>
                                </IonRow>
                                <IonRow className={styles['center-content']}>
                                    <img src="img/logoPrincipal 1.png" alt="logo2" className={styles['logo-form']} />
                                </IonRow>

                                <IonRow className={styles['center-content']}>
                                    <IonLabel className={styles['subTitulo']}>Crea tu cuenta!!</IonLabel>
                                </IonRow>
                                <form onSubmit={handleSubmit}>
                                    <IonLabel>
                                        UserName:
                                        <IonInput type="text" value={userName} onIonChange={e => setUserName(e.detail.value!)} />
                                    </IonLabel>
                                    <IonLabel>
                                        Nombres:
                                        <IonInput type="text" value={firstName} onIonChange={e => setFirstName(e.detail.value!)} />
                                    </IonLabel>
                                    <IonLabel>
                                        Apellidos:
                                        <IonInput type="text" value={lastName} onIonChange={e => setLastName(e.detail.value!)} />
                                    </IonLabel>
                                    <IonLabel>
                                        Correo:
                                        <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} />
                                    </IonLabel>
                                    <IonLabel>
                                        Documento:
                                        <IonInput type="text" value={document} onIonChange={e => setDocument(e.detail.value!)} />
                                    </IonLabel>
                                    <IonLabel>
                                        Celular:
                                        <IonInput type="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)} />
                                    </IonLabel>
                                    <IonLabel>
                                        Password:
                                        <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
                                    </IonLabel>
                                    <IonButton expand="block" type="submit" mode="ios">Registrarse</IonButton>
                                    <IonButton expand="block" fill="clear" onClick={handleLoginRedirect}>Iniciar Sesion</IonButton>
                                </form>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Error'}
                    message={errorMessage}
                    buttons={['OK']}
                />
                 <IonAlert
                    isOpen={showSuccessAlert}
                    onDidDismiss={() => {
                        setShowSuccessAlert(false);
                        history.push('/login'); // Redirigir al inicio de sesión cuando se cierre la alerta
                    }}
                    header={'Success'}
                    message={successMessage}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};

export default Register;