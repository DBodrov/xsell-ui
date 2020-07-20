/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { withKnobs } from '@storybook/addon-knobs/react';

const sectionStyles = {
    display: 'flex',
    padding: '8px',
};

const divStyle = {
    border: '1px solid #ccc',
    width: 100,
    height: 100,
};

export default storiesOf('lib/ui-kit|colors', module)
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
                <div style={{ ...divStyle, backgroundColor: '#ffffff' }}>$white</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#000000' }}>$black</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#ffcc00' }}>$yellow</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#ff435a' }}>$red</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#ff435a' }}>$red-error</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#52ae30' }}>$green-primary</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#5ec738' }}>$green-100</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#339900' }}>$green-200</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#2a7f00' }}>$green-dark</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#ff8533' }}>$orange-100</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#ff6600' }}>$orange-200</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#da5100' }}>$orange-300</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#6fb4d8' }}>$blue-100</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#3399cc' }}>$blue-200</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#2f7ea6' }}>$blue-300</div>
            </section>
            // ** Text colors ** //
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#e3e3e3' }}>$text-gray</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '$white' }}>$text-white</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#4a4a4a' }}>$text-primary</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#767676' }}>$text-secondary</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#9e9e9e' }}>$text-dark-gray</div>
            </section>
            // ** Background shades ** //
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#f0f0f0' }}>$shade-100</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#ebebeb' }}>$shade-200</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#e6e6e6' }}>$shade-300</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#c5c5c5' }}>$shade-400</div>
            </section>
            // Advanced colors
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#b00000' }}>$otp-ruby</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#0f87d2' }}>$otp-blue</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#b35b5b' }}>$otp-red-light</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#94948b' }}>$otp-yellow-gray</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#ff9696' }}>$otp-rose-light</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#f4a600' }}>$otp-yellow</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#2c3696' }}>$otp-violet</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#a5691e' }}>$otp-yellow-red</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#d71491' }}>$otp-rose</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#646400' }}>$otp-haki</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#791d81' }}>$otp-magenta</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#00b487' }}>$otp-green-wave</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#c6c800' }}>$otp-yellow-green</div>
            </section>
            <section style={sectionStyles}>
                <div style={{ ...divStyle, backgroundColor: '#583200' }}>$otp-brown</div>
            </section>
        </React.Fragment>
    ));
