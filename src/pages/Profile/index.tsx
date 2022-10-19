import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../components/Avatar';
import Container from '../../components/Container';
import { createBlogPageRoute } from '../../constants/routes';
import usersApi from '../../dataServices/UserApi';
import './Profile.css';

const ProfilePage: React.FC = () => {
  const [fetchCurrentUser, { data: user }] =
    usersApi.endpoints.getCurrentUser.useLazyQuery();

  useEffect(() => {
    (async () => {
      if (!user) {
        fetchCurrentUser();
      }
    })();
  }, [user, fetchCurrentUser]);

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
                style={{
                  display: 'block',
                  paddingLeft: '10px',
                  paddingTop: '5px',
                }}
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
