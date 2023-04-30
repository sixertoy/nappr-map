import { MapContext } from '../interfaces';
import { LayersContext } from './layers-context';

interface LayersConsumerProps {
  children: (state: Partial<MapContext>) => React.ReactNode;
}

export function LayersConsumer({ children }: LayersConsumerProps) {
  return (
    <LayersContext.Consumer>{state => children(state)}</LayersContext.Consumer>
  );
}

LayersConsumer.displayName = 'LayersConsumer';
