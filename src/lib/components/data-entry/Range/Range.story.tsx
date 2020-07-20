import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
import { Range } from './index';

export default storiesOf('lib/components|data-entry/Range', module)
    .addDecorator(withPropsTable)
    .add('Default', () => (
        <Fragment>
            <div style={{ margin: '15px', width: '300px' }}>
                <Range
                    name="money"
                    rangeType="numeric"
                    caption="мес."
                    onChangeHandler={action('onChangeHandler')}
                    value="100000"
                    min={0}
                    max={100}
                />
            </div>
        </Fragment>
    ));
