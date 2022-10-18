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
import PostCard from '../../components/PostCard';
import { postService, userService } from '../../dataServices';
import { PostDto } from '../../models/dto/Post.dto';
import { UserDto } from '../../models/dto/User.dto';
import './Home.css';

const HomePage: React.FC = () => {
  const [trendPosts, setTrendPosts] = useState<PostDto[]>([]);
  const [trendBlogs, setTrendBlogs] = useState<UserDto[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const posts = await postService.getTrandingPosts();

        const userIds = posts.map((p) => p.userId);
        const authors = await userService.findUsers(userIds);

        const postsWithAuthors = posts.map((post, index) => ({
          ...post,
          author: authors[index],
        }));
        setTrendPosts(postsWithAuthors);

        const trendBlogs = await userService.trendingBlogs();
        setTrendBlogs(trendBlogs);
      } catch (error) {}
    })();
  }, []);

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

        <Container name="Trending posts">
          {trendPosts.map((post) => (
            <PostCard key={post.id} showAuthor data={post} />
          ))}
        </Container>

        <Container name="Blogs">
          {trendBlogs.map((blog) => (
            <BlogCard key={blog.id} data={blog} />
          ))}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
