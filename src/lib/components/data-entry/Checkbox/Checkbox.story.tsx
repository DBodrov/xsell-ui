import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
// import { withKnobs, text, object, number } from '@storybook/addon-knobs/react';
// import { FormField } from 'lib/components/Forma';
import { Checkbox } from './Checkbox';

const TextWithLink = () => (
    <span>
        Я даю свое{' '}
        <a className="as-link" href="https://google.com">
            согласие на обработку
        </a>{' '}
        персональных данных и получение кредитных отчетов о моей кредитной истории в бюро кредитных историй в
        целях проверки благонадежности и заключения/исполнения договора.
    </span>
);

export default storiesOf('lib/components|data-entry/Checkbox', module)
    .addDecorator(withPropsTable)
    .add('default', () => (
        <Fragment>
            <Checkbox name="checkbox" onChangeHandler={action('onChangeHandler')}>
                Чекбокс обыкновенный
            </Checkbox>
            <br />
            <Checkbox name="checkbox" onChangeHandler={action('onChangeHandler')} checked>
                Чекбокс чекнутый
            </Checkbox>
            <br />
            <Checkbox name="checkbox" onChangeHandler={action('onChangeHandler')} disabled>
                Чекбокс неактивный
            </Checkbox>
            <br />
            <Checkbox name="checkbox" onChangeHandler={action('onChangeHandler')} indeterminate>
                Чекбокс неопределенный
            </Checkbox>
            <br />
            <Checkbox name="checkbox" onChangeHandler={action('onChangeHandler')} />
        </Fragment>
    ))
    .add('with FormField', () => (
        <Fragment>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', padding: '1rem' }}>
                <Checkbox name="signature" checked onChangeHandler={action('FIRE!!!')} />
                <TextWithLink />
            </div>
        </Fragment>
    ));
