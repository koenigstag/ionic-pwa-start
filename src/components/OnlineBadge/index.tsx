import { useLayoutEffect, useRef, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { airplaneOutline } from 'ionicons/icons';
import './OnlineBadge.css';

export interface IOnlineBadge {}

const OnlineBadge: React.FC<IOnlineBadge> = (props) => {
  const [showBadge, setShowBadge] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);

  useLayoutEffect(() => {
    window.addEventListener('offline', () => {
      setShowBadge(true);
      // dispatch to redux store
      setOnlineStatus(false);
    });

    window.addEventListener('online', () => {
      setShowBadge(false);
      // dispatch to redux store
      setOnlineStatus(true);
    });
  }, []);

  const modal = useRef<HTMLIonModalElement>(null);

  return showBadge ? (
    <>
      <IonFab
        className="online-fab"
        vertical="top"
        horizontal="end"
        slot="absolute"
      >
        <button id="offline-info-modal">
          <IonIcon icon={airplaneOutline} />
          <IonLabel style={{ marginLeft: '10px' }}>
            {onlineStatus ? 'online' : 'offline'}
          </IonLabel>
        </button>
      </IonFab>
      <IonModal ref={modal} trigger="offline-info-modal">
        <IonHeader>
          <IonToolbar>
            <IonButtons className="modal-buttons" slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                CLOSE
              </IonButton>
            </IonButtons>
            <IonTitle className="modal-title">Offline mode</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ padding: '0px 20px' }}>
            <p>
              Now you are in Offline mode. This means that you can do *some
              things* but it will be stored only on your device.
            </p>
            <p style={{ fontWeight: 'bolder' }}>
              Your changes will be proccessed when connection resumes.
            </p>
          </div>
        </IonContent>
      </IonModal>
    </>
  ) : (
    <></>
  );
};

export default OnlineBadge;
