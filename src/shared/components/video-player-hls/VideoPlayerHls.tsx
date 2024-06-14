import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { environment } from "../../../enviroments/enviroment";

interface VideoPlayerProps {
    curso: string;
    video: string;
    url: string;
}

const VideoPlayerHls: React.FC<VideoPlayerProps> = ({ curso, video, url }) => {
    /* const folder = video.split('.')[0]; */
    /* const src = `${environment.apiUrl}/video-hls/${curso}/${folder}/${video}`; */
    const playerRef = useRef<ReactPlayer>(null);
    const lastTime = useRef<number>(0);

    useEffect(() => {
        const savedTime = localStorage.getItem('lastTime');
        console.log('savedTime', savedTime);
        if (savedTime) {
            lastTime.current = parseFloat(savedTime);
        }
    }, []);

    const onReady = () => {
        if (playerRef.current && lastTime.current) {
            playerRef.current.seekTo(lastTime.current);
        }
    };

    const onProgress = (state: { playedSeconds: number }) => {
        localStorage.setItem('lastTime', state.playedSeconds.toString());
    };

    return (
        <div style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <ReactPlayer
                ref={playerRef}
                url={url}
                width='100%'
                height='100%'
                controls={true}
                playing={true}
                style={{ position: 'absolute', top: 0, left: 0 }}
                onReady={onReady}
                onProgress={onProgress}
            />
        </div>
    );
};

export default VideoPlayerHls;