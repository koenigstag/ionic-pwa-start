import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonChip,
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
import { createBlogPageRoute, createPostPageRoute } from '../../constants/routes';
import { userService } from '../../dataServices';
import { UserDto } from '../../types/User.dto';
import './FavoriteBlogs.css';

const FavoriteBlogsPage: React.FC = () => {
  // TODO redux store
  const [favBlogs, setFavBlogs] = useState<UserDto[]>();

  useEffect(() => {
    (async () => {
      const randomIds = Array(5)
        .fill(1)
        .map(() => Math.floor(Math.random() * 30));

      const blogs = await userService.findUsers(randomIds);

      setFavBlogs(blogs);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorite blogs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Favorite blogs</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container>
          {favBlogs?.map((blog) => (
            <Link to={createPostPageRoute({ id: blog.id })}>
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Link to={createBlogPageRoute({ id: blog.id })}>
                        <Avatar
                          src={blog.avatarSrc}
                          alt={blog.name}
                        />
                      </Link>
                      <IonCardTitle style={{ marginLeft: '10px' }} className="overflow-elipsis">
                        {blog.name}
                      </IonCardTitle>
                    </div>
                    <IonChip slot="end">ID: {blog.id}</IonChip>
                  </IonToolbar>
                </IonCardHeader>
              </IonCard>
            </Link>
          ))}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default FavoriteBlogsPage;
