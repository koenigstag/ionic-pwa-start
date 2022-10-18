import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonToolbar,
} from '@ionic/react';
import { CommentDto } from '../../models/dto/Comment.dto';
import Avatar from '../Avatar';

export interface IComment {
  data: CommentDto;
}

const Comment: React.FC<IComment> = ({ data }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonToolbar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={data?.author?.avatarSrc}
              alt={data?.author?.username}
            />
            <IonCardTitle style={{ marginLeft: '10px', maxWidth: '65%' }}>
              <div className="overflow-elipsis">
                {data?.author?.username ?? data.email}
              </div>
            </IonCardTitle>
          </div>
          <IonChip slot="end">ID: {data?.id}</IonChip>
        </IonToolbar>
      </IonCardHeader>
      <IonCardContent>
        <div>{data?.body}</div>
      </IonCardContent>
    </IonCard>
  );
};

export default Comment;
