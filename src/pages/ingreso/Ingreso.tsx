import React from 'react';
import styles from './Ingreso.module.css';
import { IonPage, IonContent, IonGrid, IonCol, IonRow, IonCard, IonTitle, IonButton, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Ingreso: React.FC = () => {
  const history = useHistory();

  const handleIniciaSesionClick = () => {
    history.push('/login');
  };

  const handleRegistrarseClick = () => {
    history.push('/register');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid className={styles.fondo}>
          <IonRow class='center'>
            <IonCol className={styles.container}>
              <IonCard className={styles['card-container']}>
                <IonRow>
                  <IonTitle className={styles.titulo}>Mi Plataforma</IonTitle>
                </IonRow>
                
                <IonRow className={styles['center-content']}>
                  <IonLabel className={styles.subTitulo}>Cada paso te acerca a tu futuro!! Únete Gratis</IonLabel>
                </IonRow>
                
                <IonRow className={styles['center-content']}>
                  <IonLabel className={styles.texto}>Tenemos más de 2000 cursos y proyectos para que crezcas en eso que tanto te interesa. Disfruta las mejores clases desde solo *5% USD por clase</IonLabel>
                </IonRow>

                <IonRow className={styles['center-content']}>
                  <IonButton className={styles.btn + ' ' + styles.google}>Continuar con Google</IonButton>
                </IonRow>

                <IonRow className={styles['center-content']}>
                  <IonButton className={styles.btn + ' ' + styles.facebook}>Continuar con Facebook</IonButton>
                </IonRow>

                <IonRow className={styles['center-content']}>
                  <IonButton className={styles.btn + ' ' + styles.apple}>Continuar con Apple</IonButton>
                </IonRow>
                
                <IonRow className={styles['center-content']}>
                  <IonButton className={styles.btn + ' ' + styles.correo} onClick={handleRegistrarseClick}>Registrate con correo electronico</IonButton>
                </IonRow>

                <IonRow className={styles['center-content']}>
                  <IonLabel>¿Ya tienes tu cuenta?</IonLabel>
                  <IonButton className={styles.iniciaSesion} onClick={handleIniciaSesionClick}>Inicia Sesión</IonButton>
                </IonRow>

                <IonRow>
                  <IonLabel className={styles['texto-condiciones']}>Al hacer clic en Registrarse o Continuar con Google, Facebook o Apple, acepta las Condiciones de Servicio y Politica de Privacidad de Miplataforma </IonLabel>
                </IonRow>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Ingreso;