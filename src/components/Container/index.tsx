import { isPlatform } from '@ionic/core';
import Hideable from '../Hideable';
import './Container.css';

interface ContainerProps {
  style?: object;
  name?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const Container: React.FC<ContainerProps> = ({ style, children, name }) => {
  const isIOS = isPlatform('ios');

  return (
    <div style={style} className="container">
      <Hideable show={!!name}>
        <strong className={isIOS ? 'title-ios' : ''}>{name}</strong>
      </Hideable>
      {children}
    </div>
  );
};

export default Container;
