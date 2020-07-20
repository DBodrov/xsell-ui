import { IAuthActions, IAuthState, AuthStatus } from './types';
import { IErrorState } from '../../typings';

export const initAuthState: IAuthState = {
  error: undefined,
  authStatus: AuthStatus.IDLE,
  userProfile: null,
} as const;

export const authReducer = (state: Readonly<IAuthState>, action: IAuthActions): IAuthState => {
  switch (action.type) {
    case 'STARTED': {
      return {
        ...state,
        authStatus: AuthStatus.PENDING,
      };
    }
    case 'ERROR': {
      return {
        ...state,
        authStatus: AuthStatus.AUTH_REJECTED,
        error: action.payload as IErrorState,
      };
    }
    case 'SUCCESS': {
      const { status, profile } = action.payload;
      return {
        ...state,
        authStatus: status,
        userProfile: profile,
      };
    }
    default:
      return state;
  }
};
