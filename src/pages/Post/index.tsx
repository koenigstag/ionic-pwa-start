import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonChip,
  IonContent,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import CommentList from '../../components/CommentList';
import Container from '../../components/Container';
import { createBlogPageRoute, homePageRoute } from '../../constants/routes';
import { postService, userService } from '../../dataServices';
import { PostDto } from '../../types/Post.dto';
import { UserDto } from '../../types/User.dto';

export interface IPost {
  data: PostDto;
}

const PostPage: React.FC<IPost> = ({ data }) => {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostDto | undefined>(data);
  const [author, setAuthor] = useState<UserDto | undefined>();

  useEffect(() => {
    if (!data) {
      (async () => {
        const post = await postService.findById(id);
        setPost(post);

        const author = await userService.findById(post.userId);
        setAuthor(author);
      })();
    } else {
      (async () => {
        const author = await userService.findById(data.userId);
        setAuthor(author);
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
            <Link to={createBlogPageRoute({ id: author?.id ?? '' })}>
              <Avatar src={author?.avatarSrc} alt={author?.name} />
            </Link>
            <IonTitle className="overflow-elipsis">{post?.title}</IonTitle>
          </div>
          <IonChip slot="end">ID: {id}</IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="overflow-elipsis">{post?.title}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container>
          <div className="line-clamp">{post?.body}</div>
        </Container>
        <CommentList list={[]} />
      </IonContent>
    </IonPage>
  );
};

export default PostPage;
