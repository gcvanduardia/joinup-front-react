import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonLabel, IonGrid, IonRow, IonCol, IonCard, IonTitle, IonSelect, IonSelectOption } from '@ionic/react';
import styles from './Personalizacion.module.css';

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
    const [username, setUsername] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const handleAvatarClick = (avatar: string) => {
        setSelectedAvatar(avatar);
    };

    const handleSave = () => {
        console.log('Username:', username);
        console.log('Selected Avatar:', selectedAvatar);
        console.log('Selected Interests:', selectedInterests);
        // Aquí puedes agregar la lógica para guardar el nombre de usuario, el avatar seleccionado y los intereses seleccionados
    };

    return (
        <IonPage>
            <IonContent >
                <IonGrid fixed className={styles.fondo}>
                    <IonRow>
                        <IonCol className={styles.container}>
                            <IonCard className={styles['card-container']}>
                                <IonRow>
                                    <IonTitle>¡Personalicemos Tu Perfil!</IonTitle>
                                </IonRow>
                                <IonRow>
                                    <input
                                        className={styles.input}
                                        placeholder="Nombre de usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value!)}
                                    />
                                </IonRow>
                                <IonRow>
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
                                </IonRow>
                                <IonRow>
                                    <IonLabel className={styles.input}>
                                        <IonSelect
                                            placeholder="Selecciona tus intereses"
                                            multiple={true}
                                            value={selectedInterests}
                                            onIonChange={(e) => setSelectedInterests(e.detail.value)}
                                        >
                                            {interests.map((interest) => (
                                                <IonSelectOption key={interest} value={interest}>
                                                    {interest}
                                                </IonSelectOption>
                                            ))}
                                        </IonSelect>
                                    </IonLabel>
                                </IonRow>
                                <IonRow>
                                    <IonButton onClick={handleSave} className={styles.button}>Guardar</IonButton>
                                </IonRow>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Personalizacion;