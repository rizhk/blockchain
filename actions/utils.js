import { REQUEST, CONFIRMATION, PENDING, SUCCESS, FAILURE } from '../actions/constants';

export const action = (type, payload = {}) => ({
  type,
  ...payload,
});

export const requestAction = (action, payload = {}) => ({
  type: action.REQUEST,
  ...payload,
});

const requestTypes = [REQUEST, SUCCESS, FAILURE];

export function createRequestTypes(base) {
  return requestTypes.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

const transactionRequestTypes = [REQUEST, PENDING, SUCCESS, FAILURE, CONFIRMATION];

export function createTransactionRequestTypes(base) {
  return transactionRequestTypes.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const createEntityAction =
  (entity) =>
  (...args) => ({ ...action.apply(null, args), entity });
