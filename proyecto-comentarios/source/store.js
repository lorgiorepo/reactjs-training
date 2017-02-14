import { createStore, applyMiddleware } from 'redux';

import reducer from './reducer';

const logger = store => next => (action) => {
  console.group('logger');
  console.debug('estado actual', store.getState());
  console.debug('accion', action);
  const result = next(action);
  console.debug('estado nuevo', store.getState());
  console.groupEnd('logger');
  return result;
};

const store = createStore(
    reducer,
    applyMiddleware(
        logger,
    ),
);

export default store;
