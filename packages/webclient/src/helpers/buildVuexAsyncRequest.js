/**
 * @typedef {Object} AsyncStore
 * @property {Object} store state of the async operation
 * @property {Function} actionDecorator async operation
 * @property {Object} mutations mutations of the state updates
 */

/**
 * Generates the store, mutations, and actions for an vue async operation
 // TODO: Split the construction of names, mutations and store to a separate factories
 // TODO: Generate a more meaningful store[performing action] name
 * @param  {String} actionName action to perform
 * @param  {String} entityName name of the entity
 * @param  {Any} initialValue initial value of entity
 * @return {AsyncStore}
 */
export default function buildVuexAsyncRequest(actionName, entityName, initialValue) {
  const actionUppercase = actionName.toUpperCase();
  const entityNameUppercase = entityName.toUpperCase();
  const requestMutationName = `${actionUppercase}_${entityNameUppercase}_REQUEST`;
  const successMutationName = `${actionUppercase}_${entityNameUppercase}_SUCCESS`;
  const errorMutationName = `${actionUppercase}_${entityNameUppercase}_FAILURE`;

  const store = {
    [actionName]: false,
    [entityName]: initialValue,
    requestError: false,
  };

  return {
    store,
    /**
     * @param  {Function} action async action to perform
     */
    actionDecorator(action) {
      return async (context, value) => {
        context.commit(requestMutationName);
        console.log('yes');

        try {
          const result = await action(value);
          context.commit(successMutationName, result);
        } catch (error) {
          context.commit(errorMutationName, error);
        }
      };
    },
    mutations: {
      [requestMutationName](state) {
        Object.assign(state, {
          [actionName]: true,
          requestError: null,
        });
      },
      [successMutationName](state, result) {
        Object.assign(state, {
          [actionName]: false,
          requestError: null,
          [entityName]: result,
        });
      },
      [errorMutationName](state, error) {
        Object.assign(state, {
          [actionName]: false,
          requestError: error,
        });
      },
    },
  };
}
