import React from 'react';
import {Select, SelectOptions, SelectChangeTypes, ISelectState} from 'neutrino-ui';
import {ErrorText, Label, useForma} from 'lib/components/Forma2';

const workIndustryList = [
  {id: 'RGB_INDUSTRY_9', title: 'Ресторанный бизнес/Общественное питание'},
  {id: 'RGB_INDUSTRY_3', title: 'Нефтегазовая промышленность'},
  {id: 'RGB_INDUSTRY_3$1', title: 'Энергетика'},
  {id: 'RGB_INDUSTRY_7', title: 'Коммунальное хоз-во/Дорожные службы'},
  {id: 'RGB_INDUSTRY_18', title: 'Страхование'},
  {id: 'RGB_INDUSTRY_18$1', title: 'Банк/Финансы'},
  {id: 'RGB_INDUSTRY_18$2', title: 'Управляющая компания'},
  {id: 'RGB_INDUSTRY_4', title: 'Здравоохранение'},
  {id: 'RGB_INDUSTRY_12', title: 'Салоны красоты и здоровья'},
  {id: 'RGB_INDUSTRY_13', title: 'Сборочные производства'},
  {id: 'RGB_INDUSTRY_14', title: 'Сельское хозяйство'},
  {id: 'RGB_INDUSTRY_19', title: 'Химия/Парфюмерия/Фармацевтика'},
  {id: 'RGB_INDUSTRY_6', title: 'Туризм'},
  {id: 'RGB_INDUSTRY_6$1', title: 'Развлечения/Искусство'},
  {id: 'RGB_INDUSTRY_21', title: 'Юридические услуги/нотариальные услуги'},
  {id: 'RGB_INDUSTRY_16', title: 'Недвижимость'},
  {id: 'RGB_INDUSTRY_16$1', title: 'Торговля'},
  {id: 'RGB_INDUSTRY_8', title: 'Образование'},
  {id: 'RGB_INDUSTRY_8$1', title: 'Наука'},
  {id: 'RGB_INDUSTRY_20', title: 'ЧОП/Детективная д-ть'},
  {id: 'RGB_INDUSTRY_5', title: 'Информационные технологии'},
  {id: 'RGB_INDUSTRY_5$1', title: 'Информационные услуги'},
  {id: 'RGB_INDUSTRY_17', title: 'Транспорт'},
  {id: 'RGB_INDUSTRY_17$1', title: 'Логистика'},
  {id: 'RGB_INDUSTRY_2', title: 'Государственная служба'},
  {id: 'RGB_INDUSTRY_11', title: 'Маркетинг'},
  {id: 'RGB_INDUSTRY_11$1', title: 'Подбор персонала'},
  {id: 'RGB_INDUSTRY_11$2', title: 'СМИ/Реклама/PR-агенства'},
  {id: 'RGB_INDUSTRY_10', title: 'Металлургия/Промышленность/Машиностроение'},
  {id: 'RGB_INDUSTRY_15', title: 'Строительство'},
  {id: 'OTHER', title: 'Другие сферы'},
];

const selectReducer = (state: ISelectState, changes: ISelectState) => {
  // console.log('===reducer===', state, changes);
  switch (changes.type) {
    case SelectChangeTypes.selectClick:
      return {
        ...state,
        ...changes,
        isOpen: !state.isOpen,
      };
    case SelectChangeTypes.scroll:
      return {
        ...state,
        ...changes,
        isOpen: state.isOpen,
      };
    case SelectChangeTypes.clickOutside:
      return {
        ...state,
        ...changes,
        isOpen: false,
      };
    default:
      return {
        ...state,
        ...changes,
      };
  }
};

const getDisplayValue = (id?: string) => workIndustryList.find(item => item?.id === id)?.title ?? '';

type Props = {};
const fieldName = 'workIndustry';

export function WorkIndustryField() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {handleChange, errors, touched, values, handleTouch} = useForma();
  const hasError = errors[fieldName]?.length > 0;
  const hasTouched = touched[fieldName];
  const value = values[fieldName];

  const handleItemClick = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const id = event?.currentTarget?.dataset?.value;
      handleChange(fieldName, id);
      inputRef.current.focus();
    },
    [handleChange],
  );

  const handleInputBlur = React.useCallback(() => {
    handleTouch(fieldName);
  }, [handleTouch]);

  return (
    <div css={{marginBottom: '1.5rem'}}>
      <Label htmlFor="workIndustry" text="Отрасль занятости" />
      <Select
        stateReducer={selectReducer}
        width="100%"
        height="2.5rem"
        css={{
          padding: '0 8px',
          border: `1px ${
            hasError ? 'var(--color-error)' : hasTouched ? 'var(--color-primary)' : 'var(--color-border)'
          } solid`,
          borderRadius: 4,
          marginBottom: 4,
          '&:hover': {
            borderColor: hasError ? 'var(--color-error)' : 'var(--color-primary)',
          },
        }}
      >
        <input
          readOnly
          ref={inputRef}
          placeholder="Выберите из списка"
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'pre',
            width: '100%',
            height: '100%',
            border: 0,
            outline: 0,
            cursor: 'pointer',
          }}
          value={getDisplayValue(value)}
          onBlur={handleInputBlur}
        />

        <SelectOptions>
          <ul
            css={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              overflow: 'auto',
              height: 250,
              border: '1px var(--color-border) solid',
              borderRadius: 4,
            }}
          >
            {workIndustryList.map(item => {
              return (
                <li
                  key={item.id}
                  data-value={item.id}
                  onClick={handleItemClick}
                  css={{
                    padding: '8px 16px',
                    borderBottom: '1px #ccc solid',
                    margin: 0,
                    fontSize: 14,
                    cursor: 'pointer',
                    backgroundColor: item.id === value ? 'var(--color-border)' : '#fff',
                    '&:hover': {
                      backgroundColor: 'var(--color-border)',
                    },
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        </SelectOptions>
      </Select>
      {hasError && <ErrorText errorMessage={errors[fieldName]} />}
    </div>
  );
}
