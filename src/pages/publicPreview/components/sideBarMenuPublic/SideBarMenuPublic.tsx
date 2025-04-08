import React from 'react';
import { IonGrid, IonRow, IonTitle, IonContent, IonCol, IonMenu, IonButton } from '@ionic/react';
import styles from './SideBarMenuPublic.module.css';

const SideBarMenuPublic: React.FC = () => {

  return (
    <IonMenu contentId="main" side="start" menuId="first" className={styles.sideMenu}>
      <IonContent>
        <div className={styles.fondo}>
          <div className={styles.container}>
            <IonGrid>
              <IonRow className={`${styles.ionRow} ${styles.titleContainer}`}><IonCol><IonTitle>CATEGORÍAS</IonTitle></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol><IonButton className={styles['categoria-button']}>Matemáticas</IonButton></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol><IonButton className={styles['categoria-button']}>Robótica</IonButton></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol><IonButton className={styles['categoria-button']}>Inglés</IonButton></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol><IonButton className={styles['categoria-button']}>Culinaria</IonButton></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol><IonButton className={styles['categoria-button']}>Biología</IonButton></IonCol></IonRow>
              <IonRow className={styles.ionRow}><IonCol><IonButton className={styles['categoria-button']}>Literatura</IonButton></IonCol></IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default SideBarMenuPublic;