import Comment from '../Comment';
import { CommentDto } from '../../models/dto/Comment.dto';

export interface ICommentList {
  list?: CommentDto[];
}

const CommentList: React.FC<ICommentList> = ({ list = [] }) => {
  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {list.map((item) => (
          <li key={item.id}>
            <Comment data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
