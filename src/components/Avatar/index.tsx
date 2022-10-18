import { IonAvatar } from '@ionic/react';
import React, { FC } from 'react';

export interface IAvatar {
  src?: string;
  alt?: string;
}

const Avatar: FC<IAvatar> = ({ src, alt = '' }) => {
  return (
    <IonAvatar style={{ padding: '10px' }}>
      <img
        alt={alt}
        src={src ?? 'https://ionicframework.com/docs/img/demos/avatar.svg'}
      />
    </IonAvatar>
  );
};

export default Avatar;
