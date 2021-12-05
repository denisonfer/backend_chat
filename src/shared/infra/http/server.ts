import { httpServer } from '.';

import './websocket';

httpServer.listen('3000', () => {
  console.log('SERVIDOR ON FIRE! 🔥🔥🔥');
});
