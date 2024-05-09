import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Routes from './Routes';
import { useState } from 'react';
import { UserIdContext } from "./shared/services/global/global";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [IdUsuario, setIdUsuario] = useState(0);
  return (
    <UserIdContext.Provider value={{ IdUsuario, setIdUsuario }}>
      <IonApp>
        <IonReactRouter>
          <Routes />
        </IonReactRouter>
      </IonApp>
    </UserIdContext.Provider>
  );
};

export default App;
