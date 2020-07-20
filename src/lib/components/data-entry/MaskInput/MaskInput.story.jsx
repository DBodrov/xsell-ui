/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { MaskInput } from 'lib/components/data-entry/MaskInput';

const sectionStyles = {
    display: 'flex',
    padding: '8px',
};

export default storiesOf('lib/components|data-entry/MaskInput', module)
    .addParameters({
        props: {
            propTablesExclude: [React.Fragment],
        },
    })
    .addDecorator(withPropsTable)
    .addDecorator(withKnobs)
    .add('default', () => {
        const value = text('Value', '74953668833');

        return (
            <React.Fragment>
                <section style={sectionStyles}>
                    <MaskInput value="" onChangeHandler={action('onChange')} />
                </section>
                <section style={sectionStyles}>
                    <MaskInput value={value} onChangeHandler={action('onChange')} />
                </section>
                <section style={sectionStyles}>
                    <MaskInput value={value} onChangeHandler={action('onChange')} disabled />
                </section>
            </React.Fragment>
        );
    });
