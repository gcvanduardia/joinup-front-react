import { IonButton, IonFooter, IonToolbar } from '@ionic/react';
import { useAVToggle, useHMSActions, useHMSStore, selectIsLocalScreenShared } from "@100mslive/react-sdk";
import './Footer.css';

interface FooterProps {
  onRecordingToggle: () => void;
  isRecording: boolean;
}

function Footer({ onRecordingToggle, isRecording }: FooterProps) {
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo
  } = useAVToggle(); // Para alternar entre audio y video

  const hmsActions = useHMSActions(); // Acciones del SDK de 100ms
  const isScreenShared = useHMSStore(selectIsLocalScreenShared); // Estado de la pantalla compartida

  // Función para alternar el estado de la pantalla compartida
  const toggleScreenShare = async () => {
    if (isScreenShared) {
      await hmsActions.setScreenShareEnabled(false); // Detener la compartición de pantalla
    } else {
      await hmsActions.setScreenShareEnabled(true); // Iniciar la compartición de pantalla
    }
  };

  return (
    <IonFooter>
      <IonToolbar className="control-bar">
        <IonButton className="btn-control" onClick={toggleAudio}>
          {isLocalAudioEnabled ? "Mute" : "Unmute"} {/* Cambia el texto del botón de audio */}
        </IonButton>
        <IonButton className="btn-control" onClick={toggleVideo}>
          {isLocalVideoEnabled ? "Hide" : "Unhide"} {/* Cambia el texto del botón de video */}
        </IonButton>
        <IonButton className="btn-control" onClick={toggleScreenShare}>
          {isScreenShared ? "Stop Sharing" : "Share Screen"} {/* Cambia el texto del botón de pantalla compartida */}
        </IonButton>
        <IonButton className="btn-control" onClick={onRecordingToggle}>
          {isRecording ? "Stop Recording" : "Start Recording"} {/* Cambia el texto del botón de grabación */}
        </IonButton>
      </IonToolbar>
    </IonFooter>
  );
}

export default Footer;
