import React from 'react';
import './Ingreso.css';
import { IonPage, IonContent, IonGrid, IonCol, IonRow, IonCard, IonTitle, IonButton, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Importa useHistory

const Ingreso: React.FC = () => {
  const history = useHistory(); // Usa el hook useHistory

  const handleIniciaSesionClick = () => {
    history.push('/login'); // Redirige a la ruta /login
  };

  const handleRegistrarseClick = () => {
    history.push('/register'); // Redirige a la ruta /login
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid className='fondo'>
          <IonRow>
            <IonCol className='container'>
              <IonCard className='card-container'>
                <IonRow>
                  <IonTitle className='titulo'>Mi Plataforma</IonTitle>
                </IonRow>
                
                <IonRow className="center-content">
                  <IonLabel className='subTitulo'>Cada paso te acerca a tu futuro!! Únete Gratis</IonLabel>
                </IonRow>
                
                <IonRow className="center-content">
                  <IonLabel className='texto'>Tenemos más de 2000 cursos y proyectos para que crezcas en eso que tanto te interesa. Disfruta las mejores clases desde solo *5% USD por clase</IonLabel>
                </IonRow>

                <IonRow className="center-content">
                  <IonButton className='btn google'>Continuar con Google</IonButton>
                </IonRow>

                <IonRow className="center-content">
                  <IonButton className='btn facebook'>Continuar con Facebook</IonButton>
                </IonRow>

                <IonRow className="center-content">
                  <IonButton className='btn apple'>Continuar con Apple</IonButton>
                </IonRow>
                
                <IonRow className="center-content">
                  <IonButton className='btn correo' onClick={handleRegistrarseClick}>Registrate con correo electronico</IonButton>
                </IonRow>

                <IonRow className="center-content">
                  <IonLabel>¿Ya tienes tu cuenta?</IonLabel>
                  <IonButton className='iniciaSesion' onClick={handleIniciaSesionClick}>Inicia Sesión</IonButton>
                </IonRow>

                <IonRow>
                  <IonLabel className='texto-condiciones'>Al hacer clic en Registrarse o Continuar con Google, Facebook o Apple, acepta las Condiciones de Servicio y Politica de Privacidad de Miplataforma </IonLabel>
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