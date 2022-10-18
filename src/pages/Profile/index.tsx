import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import Avatar from '../../components/Avatar';
import Container from '../../components/Container';
import { userService } from '../../dataServices';
import { UserDto } from '../../models/dto/User.dto';
import './Profile.css';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserDto | undefined>();

  useEffect(() => {
    (async () => {
      const randomId = Math.floor(Math.random() * 10);

      const user = await userService.findById(randomId);
      setUser(user);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container name={user?.username}>
          <div>
            <div>
              <Avatar src={user?.avatarSrc} alt={user?.username} />
            </div>
            <ul>
              <li>Fullname: {user?.name}</li>
              <li>Email: {user?.email}</li>
              <li>Phone: {user?.phone}</li>
              <li>Website: {user?.website}</li>
              <li>Company: {user?.company?.name}</li>
            </ul>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
