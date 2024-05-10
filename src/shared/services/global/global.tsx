import { createContext } from 'react';

export const UserIdContext = createContext({
    IdUsuario: 0,
    setIdUsuario: (IdUsuario: number) => {}
});