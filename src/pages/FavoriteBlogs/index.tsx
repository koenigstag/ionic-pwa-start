import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect } from 'react';
import BlogCard from '../../components/BlogCard';
import Container from '../../components/Container';
import blogsApi from '../../dataServices/BlogApi';
import usersApi from '../../dataServices/UserApi';
import './FavoriteBlogs.css';

const FavoriteBlogsPage: React.FC = () => {
  const [fetchCurrentUser, { data: currentUser }] =
    usersApi.endpoints.getCurrentUser.useLazyQuery();

  const [fetchFavBlogs, { data: favBlogs }] =
    blogsApi.endpoints.findFavBlogs.useLazyQuery();

  useEffect(() => {
    (async () => {
      if (!currentUser) {
        await fetchCurrentUser();
      }

      if ((!favBlogs || !favBlogs.length) && currentUser) {
        await fetchFavBlogs(currentUser.id);
      }
    })();
  }, [favBlogs, fetchFavBlogs, fetchCurrentUser, currentUser]);

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
            <BlogCard key={blog.id} data={blog} />
          ))}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default FavoriteBlogsPage;
