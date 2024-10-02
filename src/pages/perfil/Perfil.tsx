import React from 'react';
import { IonContent, IonLabel, IonPage, IonTitle, IonRow, IonCard, IonCardContent, IonGrid } from '@ionic/react';
import styles from './Perfil.module.css';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import { UserIdContext } from '../../shared/services/global/global';
import { useContext, useEffect, useState } from 'react';
import useApi from '../../shared/services/api/api';

const Perfil: React.FC = () => {

  const [user, setUser] = useState<any>({});
  const { apiReq } = useApi();

  const { IdUsuario } = useContext(UserIdContext);
  useEffect(() => {
    console.log('IdUsuario from MenuToolbar: ', IdUsuario);
    const userDataIni = async () => {
      const response = await apiReq('GET', `user/dataIni?IdUsuario=${IdUsuario}`);
      if (response?.status === 200) {
        console.log('user: ', response.data.data);
        setUser(response.data.data);
      }
    }
    userDataIni();
  }, [IdUsuario]);

  return (
    <IonPage>
        <MenuToolbar />
        <IonContent fullscreen id='main'>
            <div className={styles["big-card"]}>
                <IonGrid>
                    <IonRow className={styles['profile-header']}>
                        <h2> Mi Perfil</h2>
                        <img src={user.Avatar} alt="Avatar" className={styles['avatar']}/>
                    </IonRow>
                    <IonRow>
                        <div className={styles["card"]}>
                            <IonLabel>Nombres: {user.Nombres}</IonLabel>
                        </div>
                    </IonRow>
                    <IonRow>
                        <div className={styles["card"]}>
                            <IonLabel>Apellidos: {user.Apellidos}</IonLabel>
                        </div>
                    </IonRow>
                    <IonRow>
                        <div className={styles["card"]}>
                            <IonLabel>Email: {user.Email}</IonLabel>
                        </div>
                    </IonRow>
                    <IonRow>
                        <div className={styles["card"]}>
                            <IonLabel>Documento: {user.Documento}</IonLabel>
                        </div>
                    </IonRow>
                    <IonRow>
                        <div className={styles["card"]}>
                            <IonLabel>Telefono: {user.Celular}</IonLabel>
                        </div>
                    </IonRow>
                    <IonRow>
                        <div className={styles["card"]}>
                            <IonLabel>Rol: {user.Rol}</IonLabel>
                        </div>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>
    </IonPage>
  );
};

export default Perfil;