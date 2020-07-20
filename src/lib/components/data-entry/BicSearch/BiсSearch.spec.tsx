import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BicSearch } from './BiсSearch';
import { IBicSearchProps } from './types';

afterEach(cleanup);

const onChangeMock = jest.fn();

const setup = (props: Partial<IBicSearchProps> = {}) => {
    const utils = render(
        <BicSearch name="biс" onChangeHandler={onChangeMock} {...props} data-testid="biс-search" />
    );
    const bic = utils.getByTestId('biс-search');

    return {
        ...utils,
        bic,
    };
};

describe('*** BiсSearch ***', () => {
    test('should render BiсSearch', async () => {
        const { bic, getByText } = setup();
        expect(bic).toBeInTheDocument();
        fireEvent.change(bic, { target: { value: '123' } });
        expect(getByText('БИК не найден')).toBeInTheDocument();
    });
});
