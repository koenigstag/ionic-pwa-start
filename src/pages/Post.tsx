import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonChip,
  IonContent,
} from '@ionic/react';
import CommentList from '../components/CommentList';
import ExploreContainer from '../components/ExploreContainer';

export interface IPost {
  data: any;
}

const Post: React.FC<IPost> = ({ data }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonAvatar>{data.userId}</IonAvatar>
          <IonTitle>{data.title}</IonTitle>
          <IonChip>{data.id}</IonChip>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{data.title}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer name={data.body} />
        <CommentList list={[]} />
      </IonContent>
    </IonPage>
  );
};

export default Post;
