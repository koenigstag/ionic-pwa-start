import './ExploreContainer.css';

interface ContainerProps {
  name: string;
  body?: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name, body }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>{body}</p>
    </div>
  );
};

export default ExploreContainer;
