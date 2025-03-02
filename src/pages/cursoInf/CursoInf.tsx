import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonButton, IonSplitPane } from '@ionic/react';
import { useParams } from 'react-router-dom';
import SideBarMenuPublic from '../publicPreview/components/sideBarMenuPublic/SideBarMenuPublic';
import TopToolBarPublic from '../publicPreview/components/topToolBarPublic/TopToolBarPublic';
import styles from './CursoInf.module.css';
import useApi from "../../shared/services/api/api";
import { useState, useEffect } from 'react';

const CursoInf: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtén el ID de la ruta
  const { apiReq } = useApi();
  const [curso, setCurso] = useState<any>({});

  useEffect(() => {
    const cursoDetail = async () => {
      const response = await apiReq('GET', `cursos/getCursoDetailPublic?cursoId=${id}`);
      if (response?.status === 200) {
        setCurso(response.data.data);
        console.log(response.data.data);
      }
    }
    cursoDetail();
  }, [id]);

  return (
    <IonPage>
      <TopToolBarPublic />
      <IonSplitPane contentId="main">
        <SideBarMenuPublic />
        <IonContent fullscreen id="main">
          <IonGrid className={styles["curso-container"]}>
            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCard>
                    <h2 className={styles["card-title"]}>{curso.NombreCurso}</h2>
                  </IonCard>
                  <IonCard>
                    <h2 className={styles["card-text"]}>{curso.NombreCompletoProfesor}</h2>
                  </IonCard>
                  <IonCard>
                    <h2 className={styles["card-text"]}>{curso.DescripcionDet}</h2>
                  </IonCard>
                  <IonCard>
                    <h2 className={styles["card-text"]}>{curso.Precio} $COP</h2>
                  </IonCard>
                  <IonCard>
                    <h2 className={styles["card-text"]}>{curso.Horas} Horas</h2>
                  </IonCard>
                  <IonButton>Comienza tu aventura</IonButton>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default CursoInf;