import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Container from '../../components/Container';
import { createBlogPageRoute } from '../../constants/routes';
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

        <Container>
          <div>
            <Container style={{ paddingTop: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={user?.avatarSrc} alt={user?.username} />
                <div style={{ marginLeft: '10px' }}>{user?.username}</div>
              </div>
              <Link
                style={{ display: 'block', paddingLeft: '10px', paddingTop: '5px' }}
                to={createBlogPageRoute({ id: user?.id ?? '' })}
              >
                My Blog
              </Link>
            </Container>
            <Container name="Info" style={{ paddingTop: '25px' }}>
              <ul style={{ paddingLeft: '35px' }}>
                <li>Fullname: {user?.name}</li>
                <li>Email: {user?.email}</li>
                <li>Phone: {user?.phone}</li>
                <li>Website: {user?.website}</li>
                <li>Company: {user?.company?.name}</li>
              </ul>
            </Container>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
