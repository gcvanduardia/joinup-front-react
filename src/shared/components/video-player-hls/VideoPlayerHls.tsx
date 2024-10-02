import React, { useEffect, useRef, useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import { environment } from "../../../enviroments/enviroment";
import useApi from '../../services/api/api';
import { UserIdContext } from "../../services/global/global";

interface VideoPlayerProps {
    curso: string;
    video: string;
    IdSesion: number;
    IdCurso: number;
    url: string;
    order: number
}

const VideoPlayerHls: React.FC<VideoPlayerProps> = ({ curso, video, IdSesion, IdCurso, url, order }) => {
    const { apiReq } = useApi();
    const { IdUsuario, setIdUsuario } = useContext(UserIdContext);
    const src = url;
    const playerRef = useRef<ReactPlayer>(null);
    const lastTime = useRef<number>(0);
    const [completada, setCompletada] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [minutoActual, setMinutoActual] = useState<number>(0);
    const [progresoCurso, setProgresoCurso] = useState<number>(0);
    const [sesiones, setSesiones] = useState<any>([]);

    const progressDetail = async (idSesion: number) => {
        const response = await apiReq('GET', `cursos/getUserProgress?IdUsuario=${IdUsuario}&IdSesion=${idSesion}`);
        if (response?.status === 200 && response.data && response.data.data) {
          console.log(response.data.data.Completada);
          console.log(`Id Usuario: ${IdUsuario} Id Sesion: ${idSesion}`);
          setCompletada(response.data.data.Completada);
          setProgress(response.data.data.ProgresoSesion);
          setMinutoActual(response.data.data.MinutoActual);
        }
        return response;
      }

    const courseProgressDetail = async (idCurso: number) => {
        try {
            const response = await apiReq('GET', `cursos/getUserCourseProgress?IdUsuario=${IdUsuario}&IdCurso=${idCurso}`);
            if (response?.status === 200 && response.data && typeof response.data.progreso !== 'undefined') {
                console.log(`El progreso total del usuario es: ${parseInt(response.data.progreso)}`);
                setProgresoCurso(parseInt(response.data.progreso));
            } else {
                console.error('Error en la respuesta del API o la estructura de datos es incorrecta');
            }
            return response;
        } catch (error) {
            console.error('Error al obtener el progreso del curso:', error);
            return error.response;
        }
    }

    useEffect(() => {
        const savedTime = localStorage.getItem('lastTime');
        console.log('savedTime', savedTime);
        if (savedTime) {
            lastTime.current = parseFloat(savedTime);
        }

        progressDetail(IdSesion);
        courseProgressDetail(IdCurso);

        const listadoSesiones = async () => {
            const response = await apiReq('GET', `cursos/getListadoSesiones?IdCurso=${IdCurso}`);
            if (response?.status === 200) {
              setSesiones(response.data.data);
            }
          }

        listadoSesiones();
    }, []);

    const onReady = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(minutoActual * 60, 'seconds');
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
                ProgresoCurso: progresoCurso,
                Completada: completada
            });
        }
        catch (error) {
            console.error(error);
        }
        }

    const onEnded = () => {
        setCompletada(true);
        console.log(order)
        const nextClass = sesiones[order].IdSesion
        console.log('onEnded');
        if (playerRef.current) {
            const state = { playedSeconds: playerRef.current.getCurrentTime() };
            onProgress(state);
        }
        setTimeout(() => {
            window.location.href = `/curso/${IdCurso}/${nextClass}`;
          }, 2000);
    };
    return (
        <div style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <ReactPlayer
                ref={playerRef}
                url={src}
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