import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonToolbar,
} from '@ionic/react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import { createBlogPageRoute } from '../../constants/routes';
import { UserDto } from '../../models/dto/User.dto';

export interface IBlogCard {
  data?: UserDto;
}

const BlogCard: React.FC<IBlogCard> = ({ data }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonToolbar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={createBlogPageRoute({ id: data?.id ?? '' })}>
              <Avatar src={data?.avatarSrc} alt={data?.username} />
            </Link>
            <Link
              style={{ maxWidth: '70%' }}
              to={createBlogPageRoute({ id: data?.id ?? '' })}
            >
              <IonCardTitle style={{ marginLeft: '10px' }}>
                <div className="overflow-elipsis">{data?.username}</div>
              </IonCardTitle>
            </Link>
          </div>
          <IonChip slot="end">ID: {data?.id}</IonChip>
        </IonToolbar>
      </IonCardHeader>
    </IonCard>
  );
};

export default BlogCard;
