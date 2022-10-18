import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonChip,
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
} from '@ionic/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import CommentList from '../../components/CommentList';
import Container from '../../components/Container';
import Modal from '../../components/Modal';
import { createBlogPageRoute, homePageRoute } from '../../constants/routes';
import { commentService, postService, userService } from '../../dataServices';
import { CommentDto } from '../../models/dto/Comment.dto';
import { PostDto } from '../../models/dto/Post.dto';
import { UserDto } from '../../models/dto/User.dto';

export interface IPost {
  data: PostDto;
}

const PostPage: React.FC<IPost> = ({ data }) => {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostDto | undefined>(data);
  const [author, setAuthor] = useState<UserDto | undefined>();
  const [comments, setComments] = useState<CommentDto[]>([]);

  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    if (!data) {
      (async () => {
        const post = await postService.findById(id);
        setPost(post);

        const author = await userService.findById(post.userId);
        setAuthor(author);

        const comments = await commentService.findComments({ postId: id });
        setComments(comments);
      })();
    } else {
      (async () => {
        const author = await userService.findById(data.userId);
        setAuthor(author);

        const comments = await commentService.findComments({ postId: data.id });
        setComments(comments);
      })();
    }
  }, [data, id]);

  const closeModal = useCallback(() => {
    modal.current?.dismiss();
  }, []);
  useEffect(() => {
    return () => {
      console.log('test');

      closeModal();
    };
  }, [closeModal]);

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
            <IonTitle size="large" className="overflow-elipsis">
              {post?.title}
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container>
          <div className="line-clamp">{post?.body}</div>
        </Container>

        <IonButtons>
          <IonButton id="open-comments-btn">Comments</IonButton>
        </IonButtons>

        <Modal
          ref={modal}
          trigger="open-comments-btn"
          title="Comments"
          onClose={closeModal}
        >
          <CommentList list={comments} />
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default PostPage;
