import { useCallback, useLayoutEffect, useRef } from 'react';
import { IonFab, IonIcon, IonLabel } from '@ionic/react';
import { airplaneOutline } from 'ionicons/icons';
import Modal from '../Modal';
import './OnlineBadge.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import configService, { Config } from '../../dataServices/ConfigService';
import { setIsOnline } from '../../app/slices/userSlice';

export interface IOnlineBadge {}

const OnlineBadge: React.FC<IOnlineBadge> = (props) => {
  const onlineStatus = useSelector((state: RootState) => state.user.isOnline);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    (async () => {
      try {
        await fetch(configService.get(Config.API_URL) ?? '');
        dispatch(setIsOnline(true));
      } catch (error) {
        dispatch(setIsOnline(false));
      }
    })();

    window.addEventListener('offline', () => {
      dispatch(setIsOnline(false));
    });

    window.addEventListener('online', () => {
      dispatch(setIsOnline(true));
    });
  }, [dispatch]);

  const modal = useRef<HTMLIonModalElement>(null);

  const closeModal = useCallback(() => {
    modal.current?.dismiss();
  }, []);

  return !onlineStatus ? (
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
