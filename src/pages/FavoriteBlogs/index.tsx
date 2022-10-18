import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';
import Container from '../../components/Container';
import { userService } from '../../dataServices';
import { UserDto } from '../../models/dto/User.dto';
import './FavoriteBlogs.css';

const FavoriteBlogsPage: React.FC = () => {
  // TODO redux store
  const [favBlogs, setFavBlogs] = useState<UserDto[]>();

  useEffect(() => {
    (async () => {
      const blogs = await userService.trendingBlogs();

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
            <BlogCard key={blog.id} data={blog} />
          ))}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default FavoriteBlogsPage;
