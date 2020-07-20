import React from 'react';
import classNames from 'classnames/bind';
import { Stepper } from 'lib/components/Stepper';
import { TAnketaStep } from 'context/Anketa';
import css from './AutoStepper.module.scss';

const cx = classNames.bind(css);

interface IStepperProps {
    className?: string;
    status: TAnketaStep;
}

const getCurretByAnketaStatus = (status: TAnketaStep) => {
    switch (status) {
        case 'LOAN_PARAMS':
        case 'PASSPORT':
        case 'PASSPORT_PHOTO':
        case 'REGISTRATION_ADDRESS':
        case 'CHANGED_REGISTRATION_ADDRESS':
        case 'DETAILS':
            // case 'PROCESSING_AGREEMENT':
            return 2;

        case 'TRANSFER_DETAILS':
        case 'PENDING_SCORING':
        case 'PENDING_ADVANCE_SCORING':
        case 'ADVANCE_SCORING_REFUSAL':
        case 'SCORING':
            return 3;

        case 'APPROVED':
        case 'REJECTED':
        case 'SIGNATURE_SMS_CODE':
        case 'PENDING_DOCUMENTS':
        case 'EXECUTION':
            return 4;

        case 'EXECUTION_FAILED':
        case 'COMPLETED':
            return 5;

        default:
            return 1;
    }
};

export const AutoStepper = ({ status, className }: IStepperProps) => (
    <Stepper className={cx(css.Root, className)} total={5} current={getCurretByAnketaStatus(status)} />
);
