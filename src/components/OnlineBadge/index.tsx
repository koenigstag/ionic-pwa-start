import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { IonFab, IonIcon, IonLabel } from '@ionic/react';
import { airplaneOutline } from 'ionicons/icons';
import { client } from '../../dataServices';
import Modal from '../Modal';
import './OnlineBadge.css';

export interface IOnlineBadge {}

const OnlineBadge: React.FC<IOnlineBadge> = (props) => {
  const [showBadge, setShowBadge] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);

  useLayoutEffect(() => {
    (async () => {
      try {
        await client.get('/');
      } catch (error) {
        setShowBadge(true);

        // TODO dispatch to redux store
        setOnlineStatus(false);
      }
    })();

    window.addEventListener('offline', () => {
      setShowBadge(true);
      // TODO dispatch to redux store
      setOnlineStatus(false);
    });

    window.addEventListener('online', () => {
      setShowBadge(false);
      // TODO dispatch to redux store
      setOnlineStatus(true);
    });
  }, []);

  const modal = useRef<HTMLIonModalElement>(null);

  const closeModal = useCallback(() => {
    modal.current?.dismiss();
  }, []);
  useEffect(() => {
    return closeModal;
  }, [closeModal]);

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
      <Modal
        ref={modal}
        trigger="offline-info-modal"
        title="Offline mode"
        onClose={closeModal}
      >
        <p>
          Now you are in Offline mode. This means that you can do *some things*
          but it will be stored only on your device.
        </p>
        <p style={{ fontWeight: 'bolder' }}>
          Your changes will be proccessed when connection resumes.
        </p>
      </Modal>
    </>
  ) : (
    <></>
  );
};

export default OnlineBadge;
