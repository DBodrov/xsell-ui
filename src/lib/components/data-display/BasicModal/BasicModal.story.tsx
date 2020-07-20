import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
// import { withKnobs, text, object, number } from '@storybook/addon-knobs/react';
import { BasicModal } from './index';

export default storiesOf('lib/components|data-display/BasicModal', module)
    .addDecorator(withPropsTable)
    .add('default', () => (
        <Fragment>
            <div style={{ margin: '15px' }}>
                <BasicModal isOpen showClose escClose title="Title" onClose={action('onClose')}>
                    children
                </BasicModal>
            </div>
        </Fragment>
    ));
