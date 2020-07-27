import React, { useEffect, useState, useCallback } from 'react';
import { BasicButton } from 'lib/components/buttons/BasicButton';
import { Forma, SimpleField, FormaButton } from 'lib/components/Forma2';
import { useCampaign } from 'utils/use-campaign';
import { useAnketa, TJobInfo } from 'context/Anketa';
import { OTP_INN } from 'utils/externals';
import css from './JobInfoForm.module.scss';

interface IJobInfoFormProps {
  onConfirmArchiving: () => void;
}

const workIndustryList = [
  { RGB_INDUSTRY_9: 'Ресторанный бизнес/Общественное питание' },
  { RGB_INDUSTRY_3: 'Нефтегазовая промышленность' },
  { RGB_INDUSTRY_3$1: 'Энергетика' },
  { RGB_INDUSTRY_7: 'Коммунальное хоз-во/Дорожные службы' },
  { RGB_INDUSTRY_18: 'Страхование' },
  { RGB_INDUSTRY_18$1: 'Банк/Финансы' },
  { RGB_INDUSTRY_18$2: 'Управляющая компания' },
  { RGB_INDUSTRY_4: 'Здравоохранение' },
  { RGB_INDUSTRY_12: 'Салоны красоты и здоровья' },
  { RGB_INDUSTRY_13: 'Сборочные производства' },
  { RGB_INDUSTRY_14: 'Сельское хозяйство' },
  { RGB_INDUSTRY_19: 'Химия/Парфюмерия/Фармацевтика' },
  { RGB_INDUSTRY_6: 'Туризм' },
  { RGB_INDUSTRY_6$1: 'Развлечения/Искусство' },
  { RGB_INDUSTRY_21: 'Юридические услуги/нотариальные услуги' },
  { RGB_INDUSTRY_16: 'Недвижимость' },
  { RGB_INDUSTRY_16$1: 'Торговля' },
  { RGB_INDUSTRY_8: 'Образование' },
  { RGB_INDUSTRY_8$1: 'Наука' },
  { RGB_INDUSTRY_20: 'ЧОП/Детективная д-ть' },
  { RGB_INDUSTRY_5: 'Информационные технологии' },
  { RGB_INDUSTRY_5$1: 'Информационные услуги' },
  { RGB_INDUSTRY_17: 'Транспорт' },
  { RGB_INDUSTRY_17$1: 'Логистика' },
  { RGB_INDUSTRY_2: 'Государственная служба' },
  { RGB_INDUSTRY_11: 'Маркетинг' },
  { RGB_INDUSTRY_11$1: 'Подбор персонала' },
  { RGB_INDUSTRY_11$2: 'СМИ/Реклама/PR-агенства' },
  { RGB_INDUSTRY_10: 'Металлургия/Промышленность/Машиностроение' },
  { RGB_INDUSTRY_15: 'Строительство' },
  { OTHER: 'Другие сферы' },
];

const getCanonicalCode = (code: string, sym = '$'): string => {
  const idx = code.indexOf(sym);
  return code.substring(0, idx >= 0 ? idx : code.length);
};

const validationSchema = {
  workPlace: {
    isRequired: { error: 'Место работы не может быть пустым' },
  },
  workInn: {
    isRequired: { error: 'ИНН обязателен к заполнению' },
    customCheck: {
      options: (value: string) => value?.length === 10 || value?.length === 12,
      error: 'ИНН должен быть длиной 10 или 12 цифр',
    },
  },
  workIndustry: {
    isRequired: { error: 'Отрасль обязательна к заполнению' },
  },
  lastWorkExperienceMonths: {
    min: { options: 3, error: 'Стаж должен быть больше 3 месяцев' },
  },
  mainMonthlyIncomeAmount: {
    min: {
      options: 1000,
      error: 'Доход не может быть менее 1 000 рублей',
    },
    max: { options: 1000000, error: 'Доход не может быть более 1 000 000 рублей' },
  },
  creditBureauConsentAgree: {
    isEqual: { options: true, error: '' },
  },
};

const fallbackLink = 'https://cash.otpbank.ru/public/bki_soglasie.docx';

export function JobInfoForm({ onConfirmArchiving }: IJobInfoFormProps) {
  const {
    updateAnketa,
    anketa: { agreementFormLink = fallbackLink, registrationAddress },
    step,
  } = useAnketa();
  const { campaignParams, STAFF_CAMPAIGN } = useCampaign();
  const [workExperience, setWorkExperience] = useState(0);
  const isStaff = campaignParams?.campaignName === STAFF_CAMPAIGN;

  const initFormData = {
    workPlace: isStaff ? 'ОТП Банк' : '',
    workIndustry: isStaff ? 'RGB_INDUSTRY_18$1' : undefined,
    workInn: isStaff ? OTP_INN : undefined,
    lastWorkExperienceMonths: isStaff ? workExperience : undefined,
    mainMonthlyIncomeAmount: undefined,
    creditBureauConsentAgree: false,
  };

  useEffect(() => {
    const getWorkExperience = async () => {
      try {
        const response = await window.fetch('/gateway/customer-profile/get-work-experience', {
          method: 'post',
        });
        const { workExperienceMonths } = await response.json();
        setWorkExperience(workExperienceMonths);
      } catch (error) {
        console.error(error);
      }
    };

    isStaff && getWorkExperience();
  }, [isStaff]);

  const handleChangeAddress = useCallback(() => {
    updateAnketa(step, { registrationAddressChanged: true });
  }, [step, updateAnketa]);

  const handleUpdateAnketa = useCallback(
    (formData: TJobInfo) => {
      updateAnketa('DETAILS', {
        ...formData,
        workInn: Number(formData.workInn),
        workIndustry: getCanonicalCode(formData.workIndustry),
      });
    },
    [updateAnketa]
  );

  return (
    <Forma
      initialValues={initFormData}
      onSubmit={handleUpdateAnketa}
      validateOnBlur
      validationSchema={validationSchema}>
      <div className={css.FormContent}>
        <SimpleField
          type="textarea"
          name="regAddress"
          label="Текущий адрес"
          disabled
          controls={
            <BasicButton
              className={css.ChangeButton}
              onClick={handleChangeAddress}
              flat
              type="button"
              theme="secondary"
              value="изменить"
            />
          }
          description="подтвердите актуальность адреса регистрации"
          value={registrationAddress}
          placeholder="Адрес регистрации"
        />
        <SimpleField
          type="text"
          name="workPlace"
          label="Место работы"
          placeholder="Наименование организации"
        />
        <SimpleField
          type="number"
          name="lastWorkExperienceMonths"
          label="Стаж на последнем месте (месяцев)"
          placeholder="Количество месяцев"
        />
        <SimpleField
          type="number"
          name="mainMonthlyIncomeAmount"
          label="Весь ежемесячный доход (руб)"
          description="ваш постоянный + дополнительный доход до вычета налогов"
          placeholder="Рублей в месяц"
        />
        <SimpleField
          type="select"
          options={workIndustryList}
          name="workIndustry"
          label="Отрасль занятости"
          placeholder="выберите из списка"
        />
        <SimpleField
          type="mask"
          mask="999999999999"
          name="workInn"
          label="ИНН РАБОТОДАТЕЛЯ"
          placeholder="ИНН вашего работодателя"
        />
        <SimpleField name="creditBureauConsentAgree" type="checkbox" tabIndex={0}>
          <div>
            Я даю согласие Банку на запрос информации в{' '}
            <a
              className="as-link"
              href={`/gateway/doc${agreementFormLink}`}
              type="download"
              rel="noopener noreferrer">
              Бюро кредитных историй
            </a>{' '}
            для оценки моей платежеспособности
          </div>
        </SimpleField>
      </div>
      <div className={css.FormFooter}>
        <BasicButton
          type="button"
          onClick={onConfirmArchiving}
          value="Переоформить заявку"
          theme="secondary"
          style={{ padding: 0, marginBottom: '1rem' }}
        />
        <FormaButton type="submit" value="Все данные верны" disabledMode="alwaysEnabled" />
      </div>
    </Forma>
  );
}
