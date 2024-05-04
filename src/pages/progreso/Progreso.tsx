import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

// Register the element
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale);

const Progreso: React.FC = () => {
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
        <IonGrid fixed>
            <IonRow>
                <IonCol size='4'>
                    <Doughnut data={data} />
                </IonCol>
                <IonCol size='4'>
                    <Bar data={data} />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default Progreso;