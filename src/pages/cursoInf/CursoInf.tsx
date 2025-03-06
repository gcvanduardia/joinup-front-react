import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonButton, IonSplitPane } from '@ionic/react';
import { useParams } from 'react-router-dom';
import SideBarMenu from '../../shared/components/sideBarMenu/SideBarMenu';
import TopToolBar from '../../shared/components/topToolBar/TopToolBar';
import styles from './CursoInf.module.css';
import useApi from "../../shared/services/api/api";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CursoInf: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtén el ID de la ruta
  const { apiReq } = useApi();
  const [curso, setCurso] = useState<any>({});
  const history = useHistory();

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

  const handleButtonClick = (url: string) => {
    history.push(url); // Redirige a la URL proporcionada
  };

  return (
    <IonPage>
      <TopToolBar />
      <IonSplitPane contentId="main">
        <SideBarMenu />
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
                  <IonButton onClick={() => handleButtonClick(`/compra/${id}`)}>¡Comienza tu aventura!</IonButton>
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