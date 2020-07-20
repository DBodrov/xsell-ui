import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
// import { withKnobs, text, object, number } from '@storybook/addon-knobs/react';
import { Aside } from './index';

export default storiesOf('lib/components|data-display/Asidec', module)
    .addDecorator(withPropsTable)
    .add('default', () => (
        <Fragment>
            <div style={{ margin: '15px' }}>
                <Aside isOpen clickClose escClose showClose title="Title" onClose={action('onClose')} />
            </div>
        </Fragment>
    ));
