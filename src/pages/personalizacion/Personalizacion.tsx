import React, { useState, useEffect, useContext } from 'react';
import { IonContent, IonPage, IonModal, IonAlert, IonLabel, IonGrid, IonRow, IonCol, IonCard, IonTitle, IonSelect, IonSelectOption, IonHeader, IonToolbar } from '@ionic/react';
import styles from './Personalizacion.module.css';
import useApi from "../../shared/services/api/api";
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UserIdContext } from "../../shared/services/global/global";

const avatars = [
    'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436178.jpg?t=st=1727924847~exp=1727928447~hmac=bcf5e98b215d190ab96503cd0aa280eb616c56f91f62daac9caac156f52838e8&w=740',
    'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?t=st=1727924796~exp=1727928396~hmac=8b7300a8da8c019c608a23c7d312017e1fbcac47759cf58f043f93ffb9706b62&w=740',
    'https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?t=st=1728003595~exp=1728007195~hmac=27bab3a5d32f7f105fade7273aacf11424822d940f4217b1ce14bded2923e258&w=740',
    'https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436180.jpg?w=740&t=st=1728003636~exp=1728004236~hmac=10f8a6d2938c5460b0121ad2d64498f92cc2d0db921acb6485933fd52f2a0786'
];

const interests = [
    'Deportes',
    'Música',
    'Tecnología',
    'Arte',
    'Ciencia'
];

const Personalizacion: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtenemos el id de los parámetros de la ruta
    const { IdUsuario } = useContext(UserIdContext);
    const { apiReq } = useApi();
    const [username, setUsername] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [selectedInterest, setSelectedInterest] = useState(''); // Cambiado a un solo valor
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        console.log('IdUsuario from Personalizacion: ', IdUsuario);
    }, []);
    
    const handleAvatarClick = (avatar: string) => {
        setSelectedAvatar(avatar);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(`Username: ${username}, Avatar: ${selectedAvatar}, IdUsuario: ${IdUsuario}`);
        const body = {
            IdUsuario: IdUsuario,
            UserName: username,
            Avatar: selectedAvatar
        };
        apiReq('POST', 'auth/updateUserProfile', body)
            .then((response) => {
                if(!response){
                    console.log('No response from server');
                    return;
                }
                if (response.status === 200) {
                    console.log('Registration success');
                    history.replace('/home');
                } else if (response.status === 401 || response.status === 400){
                    console.log('Registration failed', response.data);
                    setErrorMessage('Por favor selecciona un avatar y escribe un nombre de usuario');
                    setShowAlert(true);
                }
            })
            .catch((error: any) => {
                console.error('Registration failed: ', error);
            });
    };

    return (
        <IonPage>
            <IonContent >
                <IonGrid fixed className={styles.fondo}>
                    <div className={styles.container}>
                        <IonCard className={styles['card-container']}>
                            <IonRow className={styles['center-content']}>
                                <IonLabel className={styles.titulo}>Mi Plataforma</IonLabel>
                            </IonRow>

                            <IonRow className={styles['center-content']}>
                                <img src="img/logoPrincipal 1.png" alt="logo2" className={styles['logo-form']} />
                            </IonRow>

                            <IonRow>
                                <IonTitle className={styles.subTitulo}>¡Personalicemos Tu Perfil!</IonTitle>
                            </IonRow>
                            <IonRow>
                                <IonCol size='3'>
                                    <button className={styles.btnAvatar} onClick={() => setShowModal(true)}>
                                        {selectedAvatar ? (
                                            <img src={selectedAvatar} alt="Selected Avatar" className={styles.selectedAvatar} />
                                        ) : (
                                            'Escoge tu Avatar'
                                        )}
                                    </button>
                                </IonCol>
                                
                                <IonCol size='9' className={styles.form}>
                                    <input
                                        className={styles.input}
                                        placeholder="Nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label className={styles.label}>
                                        <select
                                            className={styles.select}
                                            value={selectedInterest} // Cambiado a un solo valor
                                            onChange={(e) => setSelectedInterest(e.target.value)} // Modificado
                                        >
                                            <option value="" disabled>Selecciona tu interés</option>
                                            {interests.map((interest) => (
                                                <option key={interest} value={interest}>
                                                    {interest}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <div className={styles.buttonContainer}>
                                        <button onClick={handleSubmit} className={styles.button}>Guardar</button>
                                    </div>
                                </IonCol>
                                
                            </IonRow>
                        </IonCard>
                    </div>
                </IonGrid>
                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonContent>
                        <div className={styles['center-content']}><IonTitle className={styles.subTitulo}>¡Escoge tu avatar!</IonTitle></div>
                        <div className={styles['avatar-container']}>
                            {avatars.map((avatar) => (
                                <img
                                    key={avatar}
                                    src={avatar}
                                    alt="Avatar"
                                    className={`${styles.avatar} ${selectedAvatar === avatar ? styles.selected : ''}`}
                                    onClick={() => handleAvatarClick(avatar)}
                                />
                            ))}
                        </div>
                        <div className={styles['center-content']}>
                            <button className={styles.button} onClick={() => setShowModal(false)}>¡Listo!</button>
                        </div>
                    </IonContent>
                </IonModal>
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

export default Personalizacion;
