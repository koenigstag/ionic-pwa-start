import Hideable from '../Hideable';
import './Container.css';

interface ContainerProps {
  style?: object;
  name?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const Container: React.FC<ContainerProps> = ({ style, children, name }) => {
  return (
    <div style={style} className="container">
      <Hideable show={!!name}>
        <strong>{name}</strong>
      </Hideable>
      {children}
    </div>
  );
};

export default Container;
