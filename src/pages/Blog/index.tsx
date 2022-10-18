import {
  IonBackButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Container from '../../components/Container';
import PostCard from '../../components/PostCard';
import { homePageRoute } from '../../constants/routes';
import { postService, userService } from '../../dataServices';
import { PostDto } from '../../models/dto/Post.dto';
import { UserDto } from '../../models/dto/User.dto';

export interface IBlogPage {
  data: UserDto;
}

const BlogPage: React.FC<IBlogPage> = ({ data }) => {
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<UserDto | undefined>(data);
  const [posts, setPosts] = useState<PostDto[] | undefined>([]);

  useEffect(() => {
    if (!data) {
      (async () => {
        const blog = await userService.findById(id);
        setBlog(blog);

        const posts = await postService.findPosts({ authorId: id });
        setPosts(posts);
      })();
    } else {
      (async () => {
        const posts = await postService.findPosts({ authorId: id });

        setPosts(posts);
      })();
    }
  }, [blog, data, id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={homePageRoute}></IonBackButton>
          </IonButtons>
          <div style={{ display: 'flex' }}>
            <Avatar src={blog?.avatarSrc} alt={blog?.username} />
            <IonTitle>{blog?.username}'s blog</IonTitle>
          </div>
          <IonChip slot="end">ID: {id}</IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{blog?.username}'s blog</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container name="Info">
          <div>
            <div>Fullname: {blog?.name}</div>
            <div>Email: {blog?.email}</div>
            <div>Website: {blog?.website}</div>
            <div>Phone: {blog?.phone}</div>
          </div>
        </Container>
        <Container name="Posts">
          {posts?.map((post) => (
            <PostCard key={post.id} data={post} />
          ))}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default BlogPage;
