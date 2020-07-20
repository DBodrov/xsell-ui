import React from 'react';
import { DaysPanel } from './DaysPanel';
import { DaysTable } from './DaysTable';
import css from './DaysCalendar.module.scss';

export const DaysCalendar = () => (
    <div className={css.DaysCalendar}>
        <DaysPanel />
        <DaysTable />
    </div>
);
