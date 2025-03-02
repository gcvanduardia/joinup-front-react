import { IonFooter, IonToolbar, IonIcon } from '@ionic/react';
import { micOffOutline, micOutline, videocamOffOutline, videocamOutline, stopOutline, ellipseOutline, shareOutline, stopCircleOutline } from 'ionicons/icons';
import { useAVToggle, useHMSActions, useHMSStore, selectIsLocalScreenShared } from "@100mslive/react-sdk";

interface FooterProps {
  onRecordingToggle: () => void;
  isRecording: boolean;
  onLeaveConference: () => void; // Añade esta propiedad
}

function Footer({ onRecordingToggle, isRecording, onLeaveConference }: FooterProps) {
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
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button className="btn-control" onClick={toggleAudio}>
            <IonIcon icon={isLocalAudioEnabled ? micOutline : micOffOutline} />
          </button>
          <button className="btn-control" onClick={toggleVideo}>
            <IonIcon icon={isLocalVideoEnabled ? videocamOutline : videocamOffOutline} />
          </button>
          <button className="btn-control" onClick={toggleScreenShare}>
            <IonIcon icon={isScreenShared ? stopOutline : shareOutline} />
          </button>
          <button className="btn-control" onClick={onRecordingToggle}>
            <IonIcon icon={isRecording ? stopCircleOutline : ellipseOutline} />
          </button>
          <button className="btn-control exit" onClick={onLeaveConference}>
            Leave
          </button>
          {isRecording && <div className="recording-indicator">Grabando</div>}
        </div>
      </IonToolbar>
    </IonFooter>
  );
}

export default Footer;