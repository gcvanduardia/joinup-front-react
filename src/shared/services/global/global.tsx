import React from 'react';

export interface User {
    IdUsuario: number;
    Email: string;
    Celular: string;
    Documento: string;
    Nombres: string;
    Apellidos: string;
    FechaCreacion: string;
    FechaActualizacion: string;
    Enable: boolean;
}

export const initialUser: User = {
    IdUsuario: 0,
    Email: '',
    Celular: '',
    Documento: '',
    Nombres: '',
    Apellidos: '',
    FechaCreacion: '',
    FechaActualizacion: '',
    Enable: false,
};

export const UserContext = React.createContext<{
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
    user: initialUser,
    setUser: () => { },
});