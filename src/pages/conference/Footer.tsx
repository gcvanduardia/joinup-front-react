import { IonButton, IonFooter, IonToolbar } from '@ionic/react';
import { useAVToggle, useHMSActions, useHMSStore, selectIsLocalScreenShared } from "@100mslive/react-sdk";
import './Footer.css';

function Footer() {
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo
  } = useAVToggle();

  const hmsActions = useHMSActions();
  const isScreenShared = useHMSStore(selectIsLocalScreenShared);

  const toggleScreenShare = async () => {
    if (isScreenShared) {
      await hmsActions.setScreenShareEnabled(false);
    } else {
      await hmsActions.setScreenShareEnabled(true);
    }
  };

  return (
    <IonFooter>
      <IonToolbar className="control-bar">
        <IonButton className="btn-control" onClick={toggleAudio}>
          {isLocalAudioEnabled ? "Mute" : "Unmute"}
        </IonButton>
        <IonButton className="btn-control" onClick={toggleVideo}>
          {isLocalVideoEnabled ? "Hide" : "Unhide"}
        </IonButton>
        <IonButton className="btn-control" onClick={toggleScreenShare}>
          {isScreenShared ? "Stop Sharing" : "Share Screen"}
        </IonButton>
      </IonToolbar>
    </IonFooter>
  );
}

export default Footer;