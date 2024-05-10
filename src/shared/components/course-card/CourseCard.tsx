import React from 'react';
import { IonCard, IonCardContent, IonButton, IonImg, IonProgressBar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './CourseCard.css';

interface CourseCardProps {
  title: string;
  description: string;
  courseId: number;
  Imagen: string;
  ProgresoCurso: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, courseId, Imagen, ProgresoCurso }) => {
  const history = useHistory();

  return (
    <IonCard className="clickable-card" onClick={() => history.push(`/curso/${courseId}`)}>
      <IonImg src={Imagen} alt={Imagen}></IonImg>
      <IonCardContent>
        <h2 className="course-title">{title}</h2>
        <p>{description}</p>
        <IonProgressBar value={ProgresoCurso / 100}></IonProgressBar>
      </IonCardContent>
    </IonCard>
  );
}

export default CourseCard;