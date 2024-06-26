
import { IonContent, IonPage, IonInput, IonButton, IonLabel, IonGrid, IonCol, IonRow, IonCard, IonAlert } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import useApi from "../../shared/services/api/api";

const Login: React.FC = () => {
    
    const { apiReq, verifyToken } = useApi();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const handleRegisterRedirect = () => {
        history.push('/register'); // Redirige a la página de registro
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
                    history.replace('/home');
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
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="12">
                            <div className='center'>
                                <IonCard>
                                    <img src="img/logo2.png" alt="logo2" className='logo-form' />
                                    <form onSubmit={handleSubmit}>
                                        <IonLabel>
                                            Username:
                                            <IonInput type="text" value={username} onIonChange={e => setUsername(e.detail.value!)} />
                                        </IonLabel>
                                        <IonLabel>
                                            Password:
                                            <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
                                        </IonLabel>
                                        <IonButton expand="block" type="submit" mode="ios">Iniciar sesión</IonButton>
                                        <IonButton expand="block" fill="clear" mode="ios" onClick={handleRegisterRedirect}>Registrarse</IonButton>
                                    </form>
                                </IonCard>
                            </div>
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