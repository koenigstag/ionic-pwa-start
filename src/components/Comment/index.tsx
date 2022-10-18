export interface IComment {
  data: any;
};

const Comment: React.FC<IComment> = ({ data }) => {

  return (
    <div className="commentContainer">
      <div className="commentHeader">
        <div>
          {data.id}
        </div>
        <div className="commentTitle">
          {data.name}
        </div>
        <div className="commentUser">
          {data.email}
        </div>
      </div>
      <div className="commentContent">
        {data.body}
      </div>
    </div>
  )
}

export default Comment;
