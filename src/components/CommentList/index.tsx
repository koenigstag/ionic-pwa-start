import Comment from "../Comment";
import { CommentDto } from "../../types/Comment.dto";

export interface ICommentList {
  list?: CommentDto[];
};

const CommentList: React.FC<ICommentList> = ({ list = [] }) => {

  return (
    <div>
      <ul>
        {list.map(item => <Comment data={item} />)}
      </ul>
    </div>
  )
}

export default CommentList;
