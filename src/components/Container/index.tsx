import Hideable from '../Hideable';
import './Container.css';

interface ContainerProps {
  style?: object;
  name?: string;
  body?: string | React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
}

const Container: React.FC<ContainerProps> = ({ style, children, name, body = children }) => {
  return (
    <div style={style} className="container">
      <Hideable show={!!name}>
        <strong>{name}</strong>
      </Hideable>
      {body}
    </div>
  );
};

export default Container;
