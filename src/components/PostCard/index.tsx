import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonToolbar,
} from '@ionic/react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import {
  createBlogPageRoute,
  createPostPageRoute,
} from '../../constants/routes';
import { PostDto } from '../../models/dto/Post.dto';
import Hideable from '../Hideable';

export interface IPostCard {
  showAuthor?: boolean;
  data?: PostDto;
}

const PostCard: React.FC<IPostCard> = ({ showAuthor = false, data }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonToolbar>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Hideable show={showAuthor}>
              <Link to={createBlogPageRoute({ id: data?.userId ?? '' })}>
                <Avatar
                  src={data?.author?.avatarSrc}
                  alt={data?.author?.name}
                />
              </Link>
            </Hideable>
            <Link
              style={{ maxWidth: '75%' }}
              to={createPostPageRoute({ id: data?.id ?? '' })}
            >
              <IonCardTitle style={{ marginLeft: '10px' }}>
                <div className="overflow-elipsis">{data?.title}</div>
              </IonCardTitle>
            </Link>
          </div>
          <IonChip slot="end">ID: {data?.id}</IonChip>
        </IonToolbar>
      </IonCardHeader>

      <IonCardContent>
        <div className="line-clamp">{data?.body}</div>
      </IonCardContent>
    </IonCard>
  );
};

export default PostCard;
