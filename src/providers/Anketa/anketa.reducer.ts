import { IAnketaState, IAnketa, /* ActionTypes,*/ IAnketaActions } from './types';

export const initAnketaState: Readonly<IAnketaState> = {
  isFetching: false,
  hasError: false,
  error: undefined,
  anketaStatus: undefined,
  anketa: {} as IAnketa,
} as const;

export const anketaReducer = (state = initAnketaState, action: IAnketaActions): IAnketaState => {
  // console.log('anketa reducer', action);
  switch (action.type) {
    case 'IS_FETCHING': {
      return {
        ...state,
        isFetching: true,
        hasError: false,
        error: undefined,
      };
    }
    case 'IS_SUCCESS': {
      return {
        ...state,
        isFetching: false,
        anketaStatus: action.status,
        anketa: {
          ...state.anketa,
          ...action.payload,
        },
      };
    }
    case 'IS_FAILURE': {
      return {
        ...state,
        isFetching: false,
        hasError: true,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
