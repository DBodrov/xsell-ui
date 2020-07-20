/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, object, number } from '@storybook/addon-knobs/react';
import { BasicInput } from 'lib/components/data-entry/BasicInput';
import userIco from 'lib/ui-kit/assets/icons/people/user_male-white.svg';

const sectionStyles = {
    display: 'flex',
    padding: '8px',
};

const sectionStylesFormField = {
    display: 'flex',
    padding: '8px',
    flexFlow: 'column nowrap',
};

const stylePhone = {
    display: 'flex',
    flexFlow: 'row nowrap',
};

export default storiesOf('lib/components|data-entry/BasicInput', module)
    .addParameters({
        props: {
            propTablesExclude: [React.Fragment],
        },
    })
    .addDecorator(withPropsTable)
    .addDecorator(withKnobs)
    .add('default', () => {
        const value = text('Value', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit');
        const styles = {
            wrapper: {
                width: '25rem',
                height: '2.5rem',
                zIndex: 4,
                overflow: 'hidden',
                // marginBottom: '1rem',
            },
            icon: {
                width: '2rem',
                backgroundColor: '#d02138',
            },
            control: {
                paddingLeft: '2.5rem',
            },
            label: {
                paddingLeft: 0,
            },
        };

        const validatorProps = {
            errorText: 'Текст ошибки валидации',
        };

        const valueNumber = 0;
        return (
            <React.Fragment>
                <section style={sectionStyles}>
                    <BasicInput value={value} onChange={action('onChange')} disabled />
                </section>
                <section style={sectionStyles}>
                    <BasicInput value="" onChange={action('Change text')} />
                </section>
                <section style={sectionStyles}>
                    <BasicInput
                        value={value}
                        hasClear
                        styles={object('styles', styles)}
                        onClear={action('onClear')}
                        onChange={action('onChange')}
                    />
                </section>
                <section style={sectionStyles}>
                    <BasicInput icon={userIco} value={value} onChange={action('onChange')} />
                </section>
                <section style={sectionStyles}>
                    <BasicInput
                        icon={userIco}
                        value={value}
                        type="password"
                        onChange={action('onChange')}
                        styles={object('styles', styles)}
                    />
                    <div style={{ paddingLeft: '1rem' }}>withStyles</div>
                </section>
                <section style={sectionStyles}>
                    <BasicInput
                        label="Название поля"
                        name="someText"
                        icon={userIco}
                        value={value}
                        onChange={action('onChange')}
                        styles={object('styles', styles)}
                    />
                    <div style={{ paddingLeft: '1rem' }}>label</div>
                </section>
                <section style={sectionStylesFormField}>
                    <BasicInput
                        label="Название поля"
                        name="someText"
                        icon={userIco}
                        value=""
                        onChange={action('onChange')}
                        styles={object('styles', styles)}
                    />
                    <div style={{ paddingLeft: '1rem' }}>label + wrapper like form field</div>
                </section>
                <section style={sectionStylesFormField}>
                    <BasicInput
                        label="Название поля"
                        name="name-of-field"
                        icon={userIco}
                        value={-7}
                        type="number"
                        styles={object('styles', styles)}
                        hasError
                        hasClear
                        onClear={action('onClear')}
                        onChange={action('onChange')}
                        onFocus={action('onFocus')}
                        onBlur={action('onBlur')}
                        validatorProps={object('validatorProps', validatorProps)}
                    />
                    <div style={{ padding: '1rem' }}>
                        'props: hasError=true, validatorProps: errorText:'Текст ошибки валидации''
                    </div>
                </section>
                <section style={sectionStylesFormField}>
                    <BasicInput
                        label="Числовое поле"
                        name="name-of-field"
                        icon={userIco}
                        value={number('value', valueNumber)}
                        type="number"
                        styles={object('styles', styles)}
                        hasClear
                        onClear={action('onClear')}
                        onChange={action('onChange')}
                        onFocus={action('onFocus')}
                        onBlur={action('onBlur')}
                    />
                    <div style={{ padding: '1rem' }}>type='number'</div>
                </section>
                <section style={sectionStylesFormField}>
                    <label htmlFor="name-of-field">Телефонный номер</label>
                    <div style={stylePhone}>
                        <span>+7</span>
                        <BasicInput
                            name="name-of-field"
                            value={text('phoneNumber', valueNumber)}
                            type="tel"
                            pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                            hasClear
                            onClear={action('onClear')}
                            onChange={action('onChange')}
                            onFocus={action('onFocus')}
                            onBlur={action('onBlur')}
                        />
                    </div>

                    <div style={{ padding: '1rem' }}>type='tel'</div>
                </section>
            </React.Fragment>
        );
    });
