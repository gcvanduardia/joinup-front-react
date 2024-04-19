import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLabel, IonGrid, IonCol, IonRow, IonCard } from '@ionic/react';
import React, { useState } from 'react';
import './Cursos.css';
import { useHistory } from 'react-router-dom';

const Cursos: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
        history.push('/home');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="12">
                            <div className='center'>
                                <IonCard>
                                    <form onSubmit={handleSubmit}>
                                        <IonLabel>
                                            Username:
                                            <IonInput type="text" value={username} onIonChange={e => setUsername(e.detail.value!)} />
                                        </IonLabel>
                                        <IonLabel>
                                            Password:
                                            <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} />
                                        </IonLabel>
                                        <IonButton expand="block" type="submit" mode="ios">Submit</IonButton>
                                        
                                    </form>
                                </IonCard>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Cursos;