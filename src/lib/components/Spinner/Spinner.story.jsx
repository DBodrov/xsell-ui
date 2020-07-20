/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { withKnobs } from '@storybook/addon-knobs/react';
import { Spinner } from 'lib/components/Spinner';

const sectionStyles = {
    display: 'flex',
    padding: '8px',
};

export default storiesOf('lib/components|Spinner', module)
    .addParameters({
        props: {
            propTablesExclude: [React.Fragment],
        },
    })
    .addDecorator(withPropsTable)
    .addDecorator(withKnobs)
    .add('default', () => (
        <React.Fragment>
            <section style={sectionStyles}>
                <Spinner />
            </section>
            <section style={sectionStyles}>
                <Spinner message="Spinner Message" />
            </section>
        </React.Fragment>
    ));
