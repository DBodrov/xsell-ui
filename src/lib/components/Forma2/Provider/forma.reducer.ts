import { IFormaActions, IFormaState } from '../typings';

export const formaReducer = (state: IFormaState, action: IFormaActions): Readonly<IFormaState> => {
    // console.log('Form reducer', action);

    switch (action.type) {
        case 'INIT_FORM': {
            return {
                ...state,
                ...action.payload,
            };
        }
        case 'CHANGE_VALUE': {
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.fieldName]: action.payload,
                },
            };
        }

        case 'SET_ISTOUCHED': {
            return {
                ...state,
                touched: {
                    ...state.touched,
                    ...action.payload,
                },
            };
        }
        case 'CLEAR_FIELD': {
            const newState = { ...state };
            delete newState.touched[action.fieldName];
            newState.values[action.fieldName] = undefined;
            return newState;
        }
        case 'ADD_ERROR': {
            return {
                ...state,
                errors: { ...action.payload },
            };
        }
        case 'SET_ISVALIDATING': {
            return {
                ...state,
                isValidating: action.payload,
            };
        }
        case 'SET_ISVALID': {
            return {
                ...state,
                isValid: action.payload,
            };
        }
        case 'SET_ISSUBMITING': {
            return {
                ...state,
                isSubmiting: true,
                isValidating: true,
            };
        }
        case 'SET_ISSUBMITED': {
            return {
                ...state,
                isSubmiting: false,
                touched: {},
            };
        }
        case 'RESET_FORM':
            return state;
        default:
            return state;
    }
};
