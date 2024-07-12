import React, { useEffect, useRef, useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import { environment } from "../../../enviroments/enviroment";
import useApi from '../../services/api/api';
import { UserIdContext } from "../../services/global/global";

interface VideoPlayerProps {
    curso: string;
    video: string;
    IdSesion: number;
    IdCurso: number
}

const VideoPlayerHls: React.FC<VideoPlayerProps> = ({ curso, video, IdSesion, IdCurso }) => {
    const { apiReq } = useApi();
    const folder = video.split('.')[0];
    const { IdUsuario, setIdUsuario } = useContext(UserIdContext);
    const src = `${environment.apiUrl}/video-hls/${curso}/${folder}/${video}`;
    const playerRef = useRef<ReactPlayer>(null);
    const lastTime = useRef<number>(0);
    const [completada, setCompletada] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const progressDetail = async (idSesion: number) => {
        const response = await apiReq('GET', `cursos/getUserProgress?IdUsuario=${IdUsuario}&IdSesion=${idSesion}`);
        if (response?.status === 200 && response.data && response.data.data) {
          console.log(response.data.data.Completada);
          console.log(`Id Usuario: ${IdUsuario} Id Sesion: ${idSesion}`);
          setCompletada(response.data.data.Completada);
          setProgress(response.data.data.ProgresoSesion);
        }
        return response;
      }

    useEffect(() => {
        const savedTime = localStorage.getItem('lastTime');
        console.log('savedTime', savedTime);
        if (savedTime) {
            lastTime.current = parseFloat(savedTime);
        }

        progressDetail(IdSesion);
    }, []);

    const onReady = () => {
        if (playerRef.current && lastTime.current) {
            playerRef.current.seekTo(lastTime.current);
        }
    };

    const onProgress = async (state: { playedSeconds: number }) => {
        const playedMinutes = state.playedSeconds / 60;
        const sessionProgress = progress;
        console.log('Minuto actual: ', Math.floor(playedMinutes));
        console.log('progress', progress);
        localStorage.setItem('lastTime', state.playedSeconds.toString());
        if (playedMinutes > progress) {
            setProgress(playedMinutes);
        }
        try {
            const response = await apiReq('post', 'cursos/updateOrCreateHistorialCurso', {
                IdUsuario: IdUsuario,
                IdCurso: IdCurso,
                IdSesion: IdSesion,
                MinutoActual: playedMinutes,
                ProgresoSesion: sessionProgress,
                ProgresoCurso: 0.5,
                Completada: completada
            });
        }
        catch (error) {
            console.error(error);
        }
        }

    const onEnded = () => {
        setCompletada(true);
        console.log('onEnded');
        if (playerRef.current) {
            const state = { playedSeconds: playerRef.current.getCurrentTime() };
            onProgress(state);
        }
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
                progressInterval={5000}
                onProgress={onProgress}
                onEnded={onEnded}
            />
        </div>
    );
};

export default VideoPlayerHls;