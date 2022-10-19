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
import { useCallback, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import Avatar from '../../components/Avatar';
import CommentList from '../../components/CommentList';
import Container from '../../components/Container';
import Hideable from '../../components/Hideable';
import Modal from '../../components/Modal';
import { createBlogPageRoute, homePageRoute } from '../../constants/routes';
import { capitalizeFirstLitter } from '../../utils/util-functions';
import postApi from '../../dataServices/PostApi';

export interface IPost {}

const PostPage: React.FC<IPost> = () => {
  const { id } = useParams<{ id: string }>();

  const [fetchPost, { data: post }] =
    postApi.endpoints.findPostById.useLazyQuery();

  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    if (!post) {
      (async () => {
        fetchPost(id);
      })();
    }
  }, [post, id, fetchPost]);

  const closeModal = useCallback(() => {
    modal.current?.dismiss();
  }, []);

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
              <Link to={createBlogPageRoute({ id: post?.author?.id ?? '' })}>
                <Avatar
                  src={post?.author?.avatarSrc}
                  alt={post?.author?.name}
                />
              </Link>
            </Hideable>
            <IonTitle
              style={{ padding: '0 10px' }}
              className="overflow-elipsis"
            >
              {capitalizeFirstLitter(post?.author?.username)}
            </IonTitle>
          </div>
          <IonChip slot="end">ID: {id}</IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <Link to={createBlogPageRoute({ id: post?.author?.id ?? '' })}>
              <IonTitle size="large" className="overflow-elipsis">
                {post?.author?.username}{' '}
                {post?.author?.name ? `(${post?.author?.name})` : ''}
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
          <CommentList list={post?.comments} />
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default PostPage;
