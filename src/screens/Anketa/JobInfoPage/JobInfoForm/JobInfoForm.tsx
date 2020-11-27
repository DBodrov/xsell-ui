import React from 'react';
import {Input, InputMask, InputNumber, Span, Checkbox, Button} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {useCampaign} from 'utils/use-campaign';
import {SecuritySign} from 'components/lib';
import {CustomerAddress, WorkIndustryField} from './components';
import {fallbackAgreementLink} from './utils';
import {useJobinfoForm} from './use-jobinfo-form';
import {Form, innFieldStyles, fieldStyles, Label, FormField} from './styles';

export function JobInfoForm(props: any) {
  const {campaignParams, STAFF_CAMPAIGN} = useCampaign();
  const {anketa} = useAnketa();

  const {agreementFormLink, registrationAddress} = anketa;
  const agreementLink = agreementFormLink ? `/gateway/doc${agreementFormLink}` : fallbackAgreementLink;

  const isStaff = campaignParams?.campaignName === STAFF_CAMPAIGN;
  const {formData, dispatch, handleChangeAddress} = useJobinfoForm(isStaff);

  //const [formState, setState] = React.useState(getInitFormData());

  //console.log('isStaff', isStaff, workExperience, getInitFormData());
  const handleChangeTextField = React.useCallback(
    (value: string, e?: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName = e?.currentTarget?.name;
      dispatch({[fieldName]: value});
    },
    [dispatch],
  );

  const handleChangeAgreement = React.useCallback((isAgree: boolean) => {
    dispatch({creditBureauConsentAgree: isAgree});
  }, [dispatch]);

  const handleChangeInn = React.useCallback((inn: string) => dispatch({workInn: inn}), [dispatch]);

  const handleChangeIndustry = React.useCallback((id: string) => dispatch({workIndustry: id}), [dispatch]);



  return (
    <Form {...props}>
      <CustomerAddress address={registrationAddress} onChangeAddress={handleChangeAddress}/>
      <FormField>
        <Label htmlFor="workInn">ИНН работодателя</Label>
        <InputMask
          name="workInn"
          mask="999999999999"
          maskPlaceholder="_"
          onChangeHandler={handleChangeInn}
          value={formData.workInn}
          css={[fieldStyles, innFieldStyles]}
        />
      </FormField>
      <FormField>
        <Label htmlFor="workPlace">Место работы</Label>
        <Input
          type="text"
          name="workPlace"
          onChangeHandler={handleChangeTextField}
          value={formData.workPlace}
          css={fieldStyles}
        />
      </FormField>
      <FormField>
        <Label>Весь ежемесячный доход (руб)</Label>
        <InputNumber
          name="mainMonthlyIncomeAmount"
          onChangeHandler={handleChangeTextField}
          value={formData.mainMonthlyIncomeAmount}
          css={fieldStyles}
        />
        <Span css={{fontSize: 14, color: 'var(--color-text-label)', paddingTop: 8}}>
          Ваш постоянный + дополнительный доход до вычета налогов
        </Span>
      </FormField>
      <FormField>
        <Label>Стаж на последнем месте (месяцев)</Label>
        <InputNumber
          name="lastWorkExperienceMonths"
          onChangeHandler={handleChangeTextField}
          value={formData.lastWorkExperienceMonths}
          css={fieldStyles}
        />
      </FormField>
      <WorkIndustryField industryId={formData.workIndustry} onChangeIndustry={handleChangeIndustry}/>
      <FormField css={{gridColumn: '1/3', '@media (min-width: 768px)': {maxWidth: 608}}}>
        <Checkbox
          variant="primary"
          onChangeHandler={handleChangeAgreement}
          checked={formData.creditBureauConsentAgree}
          boxStyles={{borderRadius: 4, alignSelf: 'flex-start'}}
        >
          <Span>
            Я даю{' '}
            <a
              css={{color: 'var(--color-primary)'}}
              href={agreementLink}
              type="download"
              rel="noopener noreferrer"
            >
              согласие Банку на запрос информации
            </a>{' '}
            в Бюро кредитных историй для оценки моей платежеспособности
          </Span>
        </Checkbox>
      </FormField>
      <FormField>
        <Button variant="primary" flat css={{width: 288, height: 48, borderRadius: 28}} disabled>
          Все данные верны
        </Button>
      </FormField>
      <FormField css={{height: 48, justifyContent: 'center'}}>
        <SecuritySign />
      </FormField>
    </Form>
  );
}
