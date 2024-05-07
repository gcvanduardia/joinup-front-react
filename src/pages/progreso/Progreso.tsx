import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { IonGrid, IonRow, IonCol, IonPage, IonContent, IonHeader, IonTitle, IonCard, IonLabel } from '@ionic/react';
import MenuToolbar from '../../shared/components/menuToolbar/MenuToolbar';
import './Progreso.css';

// Register the element
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale);

const Progreso: React.FC = () => {
    let time = '5h';
    let numClases = 10;
    let numCursos = 5;
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <IonPage>
            <MenuToolbar />
            <IonContent id = "main">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <div className='title-container'>
                                <IonTitle className='title'>Mi Progreso</IonTitle>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonLabel  className='statistic-card'>
                                    <h2>{time}</h2>
                                    <p>de Aprendizaje</p>
                                </IonLabel>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard>
                                <IonLabel  className='statistic-card'>
                                    <h2>{numCursos}</h2>
                                    <p>Cursos tomados</p>
                                </IonLabel>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard>
                                <IonLabel  className='statistic-card'>
                                    <h2>{numClases}</h2>
                                    <p>Clases tomadas</p>
                                </IonLabel>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size='6'>
                            <div className="custom-card">
                                <div>
                                    <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
</                              div>
                            </div>
                        </IonCol>
                        <IonCol size='6'>
                            <div className="custom-card">
                                <div>
                                  <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
</                              div>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Progreso;