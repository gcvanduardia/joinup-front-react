import { IonFooter, IonToolbar, IonIcon } from '@ionic/react';
import { micOffOutline, micOutline, videocamOffOutline, videocamOutline, stopOutline, ellipseOutline, shareOutline, chatboxEllipsesOutline, exitOutline } from 'ionicons/icons';
import { useAVToggle, useHMSActions, useHMSStore, selectIsLocalScreenShared } from "@100mslive/react-sdk";

interface FooterProps {
  onRecordingToggle: () => void;
  isRecording: boolean;
  onLeave: () => void;
  roleName: string | null;
  onToggleChat: () => void;
}

function Footer({ onRecordingToggle, isRecording, onLeave, roleName, onToggleChat }: FooterProps) {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } = useAVToggle();
  const hmsActions = useHMSActions();
  const isScreenShared = useHMSStore(selectIsLocalScreenShared);

  const toggleScreenShare = async () => {
    await hmsActions.setScreenShareEnabled(!isScreenShared);
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
          {/* {roleName !== 'guest' && (
            <>
              <button className="btn-control" onClick={onRecordingToggle}>
                <IonIcon icon={isRecording ? stopCircleOutline : ellipseOutline} />
              </button>
              {isRecording && <div className="recording-indicator">Grabando</div>}
            </>
          )} */}
          <button className="btn-control" onClick={toggleScreenShare}>
            <IonIcon icon={isScreenShared ? stopOutline : shareOutline} />
          </button>
          <button className="btn-control" onClick={onToggleChat}>
            <IonIcon icon={chatboxEllipsesOutline} />
          </button>

          <button className="btn-control exit" onClick={onLeave}>
            <IonIcon icon={exitOutline} />
          </button>
        </div>
      </IonToolbar>
    </IonFooter>
  );
}

export default Footer;
