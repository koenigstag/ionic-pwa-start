import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

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

import { IonRoutes } from './routes';
import OnlineBadge from './components/OnlineBadge';
import {
  favoriteBlogsPageRoute,
  homePageRoute,
  profilePageRoute,
  rootRoute,
} from './constants/routes';

setupIonicReact();

const App: React.FC = () => {
  const pathname = window.location.pathname;

  return (
    <IonApp>
      <OnlineBadge />
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <IonRoutes />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton
              selected={pathname === rootRoute || pathname === homePageRoute}
              tab="feed"
              href={homePageRoute}
            >
              <IonIcon icon={triangle} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton
              selected={pathname === favoriteBlogsPageRoute}
              tab="favorite"
              href={favoriteBlogsPageRoute}
            >
              <IonIcon icon={ellipse} />
              <IonLabel>Favorite</IonLabel>
            </IonTabButton>
            <IonTabButton
              selected={pathname === profilePageRoute}
              tab="profile"
              href={profilePageRoute}
            >
              <IonIcon icon={square} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
