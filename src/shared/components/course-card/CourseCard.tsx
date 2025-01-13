import React from 'react';
import { IonCard, IonCardContent, IonButton, IonImg, IonProgressBar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  title: string;
  description: string;
  courseId: number;
  Imagen: string;
  ProgresoCurso?: number;
  Page: string
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, courseId, Imagen, ProgresoCurso, Page }) => {
  const history = useHistory();

  return (
    <IonCard className={styles['course-card ion-no-margin']} mode='ios' button onClick={() => history.push(`/${Page}/${courseId}`)}>
      <IonImg className={styles.ionImage} src={Imagen} alt={Imagen}></IonImg>
      <IonCardContent>
        <h2 className={styles["course-title"]}>{title}</h2>
        <p className={styles["course-description"]}>{description}</p>
      </IonCardContent>
      {ProgresoCurso !== undefined && ( 
        <div className={styles["progress-bar-container"]}>
          <IonProgressBar className={styles["course-progress-bar"]} value={ProgresoCurso / 100}></IonProgressBar>
        </div>
      )}
    </IonCard>
  );
}

export default CourseCard;