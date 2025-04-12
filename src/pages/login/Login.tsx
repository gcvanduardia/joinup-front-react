import { IonContent, IonPage, IonInput, IonButton, IonLabel, IonGrid, IonCol, IonRow, IonCard, IonAlert } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './Login.module.css';
import useApi from "../../shared/services/api/api";

const Login: React.FC = () => {
    
    const { apiReq, verifyToken } = useApi();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const handleRegisterRedirect = () => {
        history.push(`/comprar/${id}`);
    };
  
    useEffect(() => {
        const checkToken = async () => {
            const isValid = await verifyToken();
            if (isValid) {
                history.replace('/home');
            }
        }
        checkToken();
    }, [history]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
        const body = {
            username: username,
            password: password
        };
        apiReq('POST', 'auth/login', body)
            .then((response) => {
                if(!response){
                    console.log('No response from server');
                    return;
                }
                console.log('status login: ', response.status);
                console.log('data login: ', response.data);
                if (response.status === 200) {
                    console.log('Login success');
                    const storageSession = response.data.token
                    console.log('storageSession: ', storageSession);
                    localStorage.setItem('joinup-session', storageSession);
                    if (response.data.isUserNameNull) {
                        history.replace(`/personalizarPerfil`);
                    }

                    else if (!response.data.isUserNameNull) {
                        history.replace('/home');
                    }
                } else if (response.status === 401){
                    console.log('Login failed', response.data);
                    setErrorMessage(response.data.message);
                    setShowAlert(true);
                } else {                
                    console.log('Login failed');
                }
            })
            .catch((error: any) => {
                console.error('login failed: ', error);
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
                                  <IonButton fill="clear" onClick={() => history.push('/inicio')} className={styles['logo-button']}>
                                    <img src="img/logoPrincipal.png" alt="logo2" className={styles['logo-form']} />
                                  </IonButton>
                                </IonRow>

                                <IonRow className={styles['center-content']}>
                                    <IonLabel className={styles['subTitulo']}>INICIO SESIÓN</IonLabel>
                                </IonRow>

                                <IonRow className={styles['center-content']}>
                                    <form onSubmit={handleSubmit}>
                                        <IonLabel className={styles['texto']}>
                                            Usuario
                                            <input type="text" value={username} onChange={e => setUsername(e.target.value!)} />
                                        </IonLabel>
                                        <IonLabel className={styles['texto']}>
                                            Password
                                            <input type="password" value={password} onChange={e => setPassword(e.target.value!)} />
                                        </IonLabel>
                                        <IonButton expand="block" type="submit" mode="ios">Iniciar sesión</IonButton>
                                        <IonButton expand="block" fill="clear" mode="ios" onClick={handleRegisterRedirect}>Registrarse</IonButton>
                                    </form>
                                </IonRow>

                                <IonRow>
                                    <IonLabel className={styles['texto-condiciones']}>Al unirse acepta las Condiciones de Servicio y Politica de Privacidad de MiPlataforma</IonLabel>
                                </IonRow>
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
            </IonContent>
        </IonPage>
    );
};

export default Login;