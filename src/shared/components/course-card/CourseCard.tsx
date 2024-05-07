import React from 'react';
import { IonCard, IonCardContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './CourseCard.css';

interface CourseCardProps {
  title: string;
  description: string;
  courseId: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, courseId }) => {
  const history = useHistory();

  return (
    <IonCard className="clickable-card" onClick={() => history.push(`/curso/${courseId}`)}>
      <IonCardContent>
        <h2 className="course-title">{title}</h2>
        <p>{description}</p>
        <IonButton href="home">Click me</IonButton>
      </IonCardContent>
    </IonCard>
  );
}

export default CourseCard;