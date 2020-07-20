import React from 'react';
import { render, fireEvent, act } from 'utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { ICalcData } from './types';
import { CalcAmountForm } from './CalcAmountForm';

const promise = Promise.resolve();
const onSaveFormMock = jest.fn(() => promise);
const onUpdateFormMock = jest.fn();
const sumMock = 300000;
const termMock = 21;

const expectedSaveResult: ICalcData = {
  requestedLoanAmount: 300000,
  requestedLoanTermMonths: 21,
  lifeAndHealthProtection: false,
  jobLossProtection: false,
  smsInforming: false,
  customerTimezoneOffset: new Date().getTimezoneOffset() / -60,
};

test('should render Calculator Form', async () => {
  const { getByTestId, getAllByTestId } = render(<CalcAmountForm />);
  const [sumInput, termInput] = getAllByTestId('range-input');
  const saveButton = getByTestId('submit-btn');
  fireEvent.change(sumInput, { target: { value: sumMock } });
  fireEvent.change(termInput, { target: { value: termMock } });
  fireEvent.click(saveButton);
  await act(() => promise); // Fix the "Warning: An update to CalcAmountForm inside a test was not wrapped in act(...)."
  expect(onSaveFormMock).toBeCalled();
  expect(onSaveFormMock).toHaveBeenCalledWith(expectedSaveResult);
});

(global as any).fetch = jest.fn().mockImplementation(() => {
  const p = new Promise((resolve) => {
    resolve({
      ok: true,
      json: function () {
        return { workExperienceMonths: 10 };
      },
    });
  });

  return p;
});

test('should render Calculator Form with campaign', async () => {
  const { getByTestId, getAllByTestId } = render(
    <CalcAmountForm onSaveForm={onSaveFormMock} onUpdateForm={onUpdateFormMock} payment={50000} />,
    { campaignContext: { campaignId: 'staff', hasCampaign: true } }
  );
  const [sumInput, termInput] = getAllByTestId('range-input');
  const saveButton = getByTestId('submit-btn');
  fireEvent.change(sumInput, { target: { value: sumMock } });
  fireEvent.change(termInput, { target: { value: termMock } });
  fireEvent.click(saveButton);
  await act(() => promise); // Fix the "Warning: An update to CalcAmountForm inside a test was not wrapped in act(...)."
  expect(onSaveFormMock).toBeCalled();
  expect(onSaveFormMock).toHaveBeenCalledWith(expectedSaveResult);
});
