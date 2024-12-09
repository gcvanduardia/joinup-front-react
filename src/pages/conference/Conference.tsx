import { selectPeers, selectIsConnectedToRoom, useHMSStore } from "@100mslive/react-sdk";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Peer from "./Peer";
import Footer from "./Footer"; // Importa el Footer
import './Conference.css';

interface PeerType {
  id: string;
  name: string;
  videoTrack: string;
  isLocal: boolean;
}

function Conference() {
  const peers = useHMSStore(selectPeers) as PeerType[];
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const history = useHistory();

  useEffect(() => {
    if (!isConnected) {
      history.push('/join');
    }
  }, [isConnected, history]);

  useEffect(() => {
    console.log(`Peers updated: ${JSON.stringify(peers)}`);
    const localPeer = peers.find(peer => peer.isLocal);
    if (localPeer) {
      console.log(`Local peer created: ${JSON.stringify(localPeer)}`);
      console.log(`Local peer videoTrack: ${localPeer.videoTrack}`);
    } else {
      console.log("Local peer not found.");
    }
  }, [peers]);

  return (
    <div className="conference-section">
      <h2>Conference</h2>

      <div className="peers-container">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>
      <Footer /> {/* Incluye el Footer aquí */}
    </div>
  );
}

export default Conference;