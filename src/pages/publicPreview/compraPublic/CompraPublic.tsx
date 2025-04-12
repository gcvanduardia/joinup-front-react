import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonTitle, IonSplitPane, IonCard, IonLabel, IonText, IonButton, IonIcon } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { logoWhatsapp } from 'ionicons/icons';
import TopToolBarPublic from '../components/topToolBarPublic/TopToolBarPublic';
import SideBarMenuPublic from '../components/sideBarMenuPublic/SideBarMenuPublic';
import styles from './CompraPublic.module.css';
import useApi from '../../../shared/services/api/api';
import { useState, useEffect } from 'react';

const CompraPublic: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtén el ID de la ruta
  const { apiReq } = useApi();
  const [curso, setCurso] = useState<any>({});

  useEffect(() => {
    const cursoDetail = async () => {
      const response = await apiReq('GET', `cursos/getCursoDetailPublic?cursoId=${id}`);
      if (response?.status === 200) {
        setCurso(response.data.data);
      }
    };
    cursoDetail();
  }, [id]);

  return (
    <IonPage>
      <TopToolBarPublic />
      <IonSplitPane contentId="main">
        <SideBarMenuPublic />
        <IonContent fullscreen id="main">
          <IonGrid className={styles["compra-container"]}>
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonLabel>Para continuar con la compra del curso de <strong>{curso.NombreCurso}</strong>, sigue estos pasos:</IonLabel>
                </IonCard>
                <IonCard>
                  <IonLabel><strong>Ingresa a nuestro Whatsapp:</strong></IonLabel>
                  <br />
                  <IonLabel>Paso 1: Escoge el plan o curso que más te convenga</IonLabel>
                  <br />
                  <IonLabel>Paso 2: Haz el pago y envía tu comprobante de pago</IonLabel>
                  <br />
                  <IonLabel>Paso 3: Recibe tu usuario y contraseña</IonLabel>
                  <br />
                  <IonLabel>Paso 4: Inicia sesión y Disfruta!</IonLabel>
                  <br />
                </IonCard>
                <IonCard>
                  <IonLabel>Continuar en nuestro chatbot de WhatsApp:</IonLabel>
                  <IonButton color="success" href={`https://wa.me/573207105607?text=Hola%20quiero%20más%20información%20sobre%20el%20curso%20de%20${curso.NombreCurso}`} target="_blank" className={styles["whatsapp-button"]}>
                    <IonIcon slot="icon-only" icon={logoWhatsapp} style={{ fontSize: '200%' }} />
                  </IonButton>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default CompraPublic;