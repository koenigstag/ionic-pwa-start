import {
  IonBackButton,
  IonButtons,
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
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Container from '../../components/Container';
import { createPostPageRoute, homePageRoute } from '../../constants/routes';
import { postService, userService } from '../../dataServices';
import { PostDto } from '../../types/Post.dto';
import { UserDto } from '../../types/User.dto';

export interface IBlogPage {
  data: UserDto;
}

const BlogPage: React.FC<IBlogPage> = ({ data }) => {
  const { id } = useParams<{ id: string }>();

  const [author, setAuthor] = useState<UserDto | undefined>(data);
  const [posts, setPosts] = useState<PostDto[] | undefined>([]);

  useEffect(() => {
    if (!data) {
      (async () => {
        const author = await userService.findById(id);
        setAuthor(author);

        const posts = await postService.findPosts({ authorId: id });
        setPosts(posts);
      })();
    } else {
      (async () => {
        const posts = await postService.findPosts({ authorId: id });
        setPosts(posts);
      })();
    }
  }, [data, id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={homePageRoute}></IonBackButton>
          </IonButtons>
          <div style={{ display: 'flex' }}>
            <Avatar src={author?.avatarSrc} alt={author?.name} />
            <IonTitle>{author?.name}'s blog</IonTitle>
          </div>
          <IonChip slot="end">ID: {id}</IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{author?.name}'s blog</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container name="Info">
          <div>
            <div>Email: {author?.email}</div>
            <div>Website: {author?.website}</div>
            <div>Phone: {author?.phone}</div>
          </div>
        </Container>
        <Container name="Posts">
          {posts?.map((post) => (
            <Link to={createPostPageRoute({ id: post.id })}>
              <IonCard>
                <IonCardHeader>
                  <IonToolbar>
                    <IonCardTitle>{post.title}</IonCardTitle>
                    <IonChip slot="end">ID: {post.id}</IonChip>
                  </IonToolbar>
                </IonCardHeader>

                <IonCardContent>{post.body}</IonCardContent>
              </IonCard>
            </Link>
          ))}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default BlogPage;
