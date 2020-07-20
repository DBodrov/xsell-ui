import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
// import { withKnobs, text, object, number } from '@storybook/addon-knobs/react';
import { BasicCheckbox } from './BasicCheckbox';

export default storiesOf('lib/components|data-entry/BasicCheckbox', module)
    .addDecorator(withPropsTable)
    .add('default', () => (
        <Fragment>
            <BasicCheckbox name="checkbox" onChangeHandler={action('onChangeHandler')}>
                Чекбокс обыкновенный
            </BasicCheckbox>
            <BasicCheckbox name="checkbox" onChangeHandler={action('onChangeHandler')} checked>
                Чекбокс чекнутый
            </BasicCheckbox>
            <BasicCheckbox name="checkbox" onChangeHandler={action('onChangeHandler')} disabled>
                Чекбокс неактивный
            </BasicCheckbox>
            <BasicCheckbox name="checkbox" onChangeHandler={action('onChangeHandler')} indeterminate>
                Чекбокс неопределенный
            </BasicCheckbox>
        </Fragment>
    ));
