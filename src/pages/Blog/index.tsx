import {
  IonBackButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Container from '../../components/Container';
import Hideable from '../../components/Hideable';
import PostCard from '../../components/PostCard';
import { createBlogPageRoute, homePageRoute } from '../../constants/routes';
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

  const isIOS = isPlatform('ios');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={homePageRoute}></IonBackButton>
          </IonButtons>
          <div style={{ display: 'flex' }}>
            <Hideable hide={isIOS}>
              <Link to={createBlogPageRoute({ id: blog?.id ?? '' })}>
                <Avatar src={blog?.avatarSrc} alt={blog?.username} />
              </Link>
            </Hideable>
            <IonTitle style={{ paddingLeft: '10px', maxWidth: '75%' }}>
              {blog?.username}'s blog
            </IonTitle>
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
          <ul style={{ paddingLeft: '35px' }}>
            <li>Fullname: {blog?.name}</li>
            <li>Email: {blog?.email}</li>
            <li>Website: {blog?.website}</li>
            <li>Phone: {blog?.phone}</li>
          </ul>
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
