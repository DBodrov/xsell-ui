import React from 'react';
import {useLocation} from 'react-router-dom';
import {Step} from './styles';


export function Stepper(props: React.HTMLAttributes<HTMLDivElement>) {
  const {state: {step = 1} = {}} = useLocation<{step: number}>();

  return (
    <div css={{'@media (max-width: 575px)': {padding: '0 10px'}}} {...props}>
      <div
        css={{
          display: 'grid',
          gridTemplate: '4px / repeat(5, 1fr)',
          columnGap: 10,
        }}
      >
        <Step isActive={step >= 1} />
        <Step isActive={step >= 2} />
        <Step isActive={step >= 3} />
        <Step isActive={step >= 4} />
        <Step isActive={step >= 5} />
      </div>
      <span>{`Шаг ${step} из 5`}</span>
    </div>
  );
}
