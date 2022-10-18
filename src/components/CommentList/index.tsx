import Comment from "../Comment";

export interface ICommentList {
  list: any[];
};

const CommentList: React.FC<ICommentList> = ({ list }) => {

  return (
    <div>
      <ul>
        {list.map(item => <Comment data={item} />)}
      </ul>
    </div>
  )
}

export default CommentList;
