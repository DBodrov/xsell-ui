import {server, statusHandler, anketaHandler, rest} from 'src/test/test-server';
import {
  screen,
  userEvent,
  renderApp,
  waitForLoadingFinish,
  waitForAnketaLoadingFinish,
  act,
  fireEvent,
} from 'utils/test-utils';
import {getAnketa} from 'context/__mocks__/anketa-mock';
import {PhotoFieldLabels} from 'screens/Anketa/PhotoPassportPage/PhotoUploadPage/PhotoUploadForm/types';

const Status = {
  current: null,
};

beforeEach(() => {
  Status.current = null;
});

test('render PhotoPassportPage', async () => {
  server.use(statusHandler('OK'), anketaHandler('PASSPORT_PHOTO'));
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();

  expect(screen.queryByText(/Три фотографии с документами/i)).toBeInTheDocument();
});

test('go to PhotoUploadPage', async () => {
  server.use(statusHandler('OK'), anketaHandler('PASSPORT_PHOTO'));
  global.URL.createObjectURL = jest.fn();
  renderApp();
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  const nextPageButton = screen.queryByRole('button', {name: /Да, с фото/i});
  expect(nextPageButton).toBeInTheDocument();
  fireEvent.click(nextPageButton);
  await act(() => Promise.resolve());
  expect(screen.queryByText(/Сделайте фото/i)).toBeInTheDocument();
  const submitButton = screen.queryByRole('button', {name: /Отправить фотографии/i});
  expect(submitButton).toBeDisabled();
  const primaryInput = screen.queryByLabelText(PhotoFieldLabels['PRIMARY']);
  const registrationInput = screen.queryByLabelText(PhotoFieldLabels['REGISTRATION']);
  const personInput = screen.queryByLabelText(PhotoFieldLabels['PERSON']);
  const file = new File(['hello'], 'hello.jpg', {type: 'image/jpeg'});
  userEvent.upload(primaryInput, file);
  userEvent.upload(registrationInput, file);
  userEvent.upload(personInput, file);
  expect((primaryInput as HTMLInputElement).files[0]).toStrictEqual(file);
  expect(submitButton).not.toBeDisabled();
});

test('user skip photo process', async () => {
  server.use(
    statusHandler('OK'),
    rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
      let updatedAnketa = {...getAnketa({status: 'PASSPORT_PHOTO'})};
      if (Status.current) {
        updatedAnketa = getAnketa({status: Status.current});
      }
      return res(ctx.status(200), ctx.json(updatedAnketa));
    }),
    rest.post(
      '/gateway/credit-application/update-session-app-refuse-upload-passport-photo',
      (req, res, ctx) => {
        Status.current = 'AGREEMENT_SMS_CODE'
        return res(ctx.status(200), ctx.json({code: 'OK'}));
      },
    ),
  );
  renderApp()
  await waitForLoadingFinish();
  await waitForAnketaLoadingFinish();
  const skipPhotoButton = screen.queryByRole('button', {name: /Нет, не готов/i});
  fireEvent.click(skipPhotoButton);
  await act(() => Promise.resolve());
  await waitForAnketaLoadingFinish();
  expect(screen.queryByText(/Согласие на запрос кредитной истории/i)).toBeInTheDocument();
});
