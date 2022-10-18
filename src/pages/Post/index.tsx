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
  isPlatform,
} from '@ionic/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import CommentList from '../../components/CommentList';
import Container from '../../components/Container';
import Hideable from '../../components/Hideable';
import Modal from '../../components/Modal';
import { createBlogPageRoute, homePageRoute } from '../../constants/routes';
import { commentService, postService, userService } from '../../dataServices';
import { CommentDto } from '../../models/dto/Comment.dto';
import { PostDto } from '../../models/dto/Post.dto';
import { UserDto } from '../../models/dto/User.dto';
import { capitalizeFirstLitter } from '../../utils/util-functions';

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
              <Link to={createBlogPageRoute({ id: author?.id ?? '' })}>
                <Avatar src={author?.avatarSrc} alt={author?.name} />
              </Link>
            </Hideable>
            <IonTitle
              style={{ padding: '0 10px' }}
              className="overflow-elipsis"
            >
              {capitalizeFirstLitter(author?.username)}
            </IonTitle>
          </div>
          <IonChip slot="end">ID: {id}</IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <Link to={createBlogPageRoute({ id: author?.id ?? '' })}>
              <IonTitle size="large" className="overflow-elipsis">
                {author?.username} {author?.name ? `(${author?.name})` : ''}
              </IonTitle>
            </Link>
          </IonToolbar>
        </IonHeader>

        <Container>
          <div style={{ fontWeight: 'bold', padding: '10px 0px' }}>
            {capitalizeFirstLitter(post?.title)}
          </div>
          <div>{capitalizeFirstLitter(post?.body)}</div>
        </Container>

        <IonButtons style={{ marginTop: '25px' }}>
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
