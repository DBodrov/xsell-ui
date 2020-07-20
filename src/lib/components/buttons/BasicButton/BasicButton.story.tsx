import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
// import { withKnobs, text, object, number } from '@storybook/addon-knobs/react';
import { BasicButton } from './index';

export default storiesOf('lib/components|buttons/BasicButton', module)
    .addDecorator(withPropsTable)
    .add('default', () => (
        <Fragment>
            <div style={{ margin: '15px' }}>
                <BasicButton type="button" onClick={action('onClick')} value="Button" />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton type="reset" onClick={action('onClick')} value="Reset" />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton type="submit" onClick={action('onClick')} value="Submit" />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton type="submit" theme="default" onClick={action('onClick')} value="Default" />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton type="submit" theme="secondary" onClick={action('onClick')} value="Secondary" />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton type="submit" theme="hero" onClick={action('onClick')} value="Hero" />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton
                    type="submit"
                    theme="secondary-hero"
                    onClick={action('onClick')}
                    value="SecondaryHero"
                />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton
                    type="submit"
                    flat
                    theme="default"
                    onClick={action('onClick')}
                    value="Flat Default"
                />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton
                    type="submit"
                    flat
                    theme="secondary"
                    onClick={action('onClick')}
                    value="Flat Secondary"
                />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton type="submit" flat theme="hero" onClick={action('onClick')} value="Flat Hero" />
            </div>
            <div style={{ margin: '15px' }}>
                <BasicButton
                    type="submit"
                    flat
                    theme="secondary-hero"
                    onClick={action('onClick')}
                    value="Flat SecondaryHero"
                />
            </div>
        </Fragment>
    ));
