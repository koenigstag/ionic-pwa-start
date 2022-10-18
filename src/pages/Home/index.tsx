import {
  IonCard,
  IonCardContent,
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
import {
  createBlogPageRoute,
  createPostPageRoute,
} from '../../constants/routes';
import { postService, userService } from '../../dataServices';
import { PostDto } from '../../types/Post.dto';
import { UserDto } from '../../types/User.dto';
import './Home.css';

const HomePage: React.FC = () => {
  const [trendPosts, setTrendPosts] = useState<PostDto[]>([]);
  const [trendAuthors, setTrendAuthors] = useState<UserDto[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const posts = await postService.getTrandingPosts();
        setTrendPosts(posts);

        const userIds = posts.map((p) => p.userId);
        const authors = await userService.findUsers(userIds);
        setTrendAuthors(authors);
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
          {trendPosts.map((post, index) => (
            <Link to={createPostPageRoute({ id: post.id })}>
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Link to={createBlogPageRoute({ id: post.userId })}>
                        <Avatar
                          src={trendAuthors[index]?.avatarSrc}
                          alt={trendAuthors[index]?.name}
                        />
                      </Link>
                      <IonCardTitle style={{ marginLeft: '10px' }} className="overflow-elipsis">
                        {post.title}
                      </IonCardTitle>
                    </div>
                    <IonChip slot="end">ID: {post.id}</IonChip>
                  </IonToolbar>
                </IonCardHeader>

                <IonCardContent className="line-clamp">
                  {post.body}
                </IonCardContent>
              </IonCard>
            </Link>
            /*{<div>
              <div>
                <Link to={createBlogPageRoute({ id: post.userId })}>
                  {trendAuthors[index]?.name}
                </Link>
              </div>

              <div>
                <Link key={post.id} to={createPostPageRoute(post)}>
                  {post.title}
                </Link>
              </div>
            </div>}*/
          ))}
        </Container>

        <Container name="Blogs">
          {[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }].map((blog) => (
            <Link key={blog.id} to={createBlogPageRoute(blog)}>
              <div>{blog.id}</div>
            </Link>
          ))}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
