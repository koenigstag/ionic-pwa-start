import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { capitalizeFirstLitter } from '../../utils/util-functions';
import Container from '../Container';

export interface IModal {
  ref: any;
  trigger: string;
  children: React.ReactNode | React.ReactNode[];
  title: string;
  onClose(): void;
}

const Modal = React.forwardRef<HTMLIonModalElement, IModal>(
  ({ trigger, children, title, onClose }, ref) => {
    return (
      <IonModal ref={ref} trigger={trigger} animated>
        <IonHeader>
          <IonToolbar>
            <IonButtons className="modal-buttons" slot="start">
              <IonButton onClick={onClose}>
                CLOSE
              </IonButton>
            </IonButtons>
            <IonTitle className="modal-title">{capitalizeFirstLitter(title)}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <Container>{children}</Container>
        </IonContent>
      </IonModal>
    );
  }
);

export default Modal;
