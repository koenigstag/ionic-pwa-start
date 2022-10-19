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
import PostCard from '../../components/PostCard';
import blogsApi from '../../dataServices/BlogApi';
import postsApi from '../../dataServices/PostApi';
import './Home.css';

const HomePage: React.FC = () => {
  const [fetchTrendBlogs, { data: trendBlogs }] =
    blogsApi.endpoints.getTrendBlogs.useLazyQuery();

  const [fetchTrendPosts, { data: trendPosts }] =
    postsApi.endpoints.getTrendPosts.useLazyQuery();

  useEffect(() => {
    (async () => {
      try {
        if (!trendPosts || !trendPosts.length) {
          fetchTrendPosts();
        }

        if (!trendBlogs || !trendBlogs.length) {
          fetchTrendBlogs();
        }
      } catch (error) {}
    })();
  }, [trendBlogs, trendPosts, fetchTrendBlogs, fetchTrendPosts]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container name="Trending Posts">
          {trendPosts?.map((post) => (
            <PostCard key={post.id} showAuthor data={post} />
          ))}
        </Container>

        <Container name="Trending Blogs">
          {trendBlogs?.map((blog) => (
            <BlogCard key={blog.id} data={blog} />
          ))}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
