import React from 'react';
import { IonGrid, IonRow, IonTitle, IonContent, IonCol, IonMenu, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Importa useHistory
import styles from './SideBarMenuPublic.module.css';

const SideBarMenuPublic: React.FC = () => {
  const history = useHistory(); // Inicializa useHistory

  const handleRedirect = (categoryId: number) => {
    history.push(`/seccion-preview/${categoryId}`); // Redirige a la ruta deseada
  };

  return (
    <IonMenu contentId="main" side="start" menuId="first" className={styles.sideMenu}>
      <IonContent>
        <div className={styles.fondo}>
          <div className={styles.container}>
            <IonGrid>
              <IonRow className={`${styles.ionRow} ${styles.titleContainer}`}><IonCol><IonTitle>CATEGORÍAS</IonTitle></IonCol></IonRow>
              <IonRow className={styles.ionRow}>
                <IonCol>
                  <IonButton className={styles['categoria-button']} onClick={() => handleRedirect(1)}>Matemáticas</IonButton>
                </IonCol>
              </IonRow>
              <IonRow className={styles.ionRow}>
                <IonCol>
                  <IonButton className={styles['categoria-button']} onClick={() => handleRedirect(2)}>Robótica</IonButton>
                </IonCol>
              </IonRow>
              <IonRow className={styles.ionRow}>
                <IonCol>
                  <IonButton className={styles['categoria-button']} onClick={() => handleRedirect(3)}>Inglés</IonButton>
                </IonCol>
              </IonRow>
              <IonRow className={styles.ionRow}>
                <IonCol>
                  <IonButton className={styles['categoria-button']} onClick={() => handleRedirect(4)}>Artes</IonButton>
                </IonCol>
              </IonRow>
              <IonRow className={styles.ionRow}>
                <IonCol>
                  <IonButton className={styles['categoria-button']} onClick={() => handleRedirect(5)}>Biología</IonButton>
                </IonCol>
              </IonRow>
              <IonRow className={styles.ionRow}>
                <IonCol>
                  <IonButton className={styles['categoria-button']} onClick={() => handleRedirect(6)}>Literatura</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideBarMenuPublic;