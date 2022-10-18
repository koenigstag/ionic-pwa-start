import { IonAvatar, isPlatform } from '@ionic/react';

export interface IAvatar {
  src?: string;
  alt?: string;
}

const Avatar: React.FC<IAvatar> = ({ src, alt = '' }) => {
  const isIOS = isPlatform('ios');

  return (
    <IonAvatar
      style={{
        padding: '10px',
        minWidth: isIOS ? 'none' : '65px',
        aspectRatio: '1/1',
      }}
    >
      <img
        alt={alt}
        src={src ?? 'https://ionicframework.com/docs/img/demos/avatar.svg'}
      />
    </IonAvatar>
  );
};

export default Avatar;
