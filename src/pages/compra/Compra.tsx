import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonTitle, IonSplitPane, IonCard, IonLabel, IonText, IonButton, IonIcon } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { logoWhatsapp } from 'ionicons/icons';
import TopToolBar from '../../shared/components/topToolBar/TopToolBar';
import SideBarMenu from '../../shared/components/sideBarMenu/SideBarMenu';
import styles from './Compra.module.css';
import useApi from '../../shared/services/api/api';
import { useState, useEffect } from 'react';

const Compra: React.FC = () => {
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
      <TopToolBar />
      <IonSplitPane contentId="main">
        <SideBarMenu />
        <IonContent fullscreen id="main">
          <IonGrid className={styles["compra-container"]}>
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonLabel>Para seguir con la compra del curso:</IonLabel>
                </IonCard>
                <IonCard>
                  <h2>{curso.NombreCurso}</h2>
                </IonCard>
                <IonCard>
                  <IonLabel>Continue por nuestro chatbot de WhatsApp</IonLabel>
                </IonCard>
                <IonButton color="success" href="https://wa.me/573207105607" target="_blank" className={styles["whatsapp-button"]}>
                  <IonIcon slot="icon-only" icon={logoWhatsapp} style={{ fontSize: '200%' }} />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default Compra;