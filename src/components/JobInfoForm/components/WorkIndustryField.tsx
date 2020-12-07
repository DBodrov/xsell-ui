import React from 'react';
import {css} from '@emotion/react';
import {ToggleProvider, useToggle, ToggleArrowIcon, Dropdown} from 'neutrino-ui';
import {ErrorText, Label, useForma} from 'lib/components/Forma2';
import {SelectBox} from './styles';

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

const getDisplayValue = (id?: string) => workIndustryList.find(item => item?.id === id)?.title ?? '';

const FIELDNAME = 'workIndustry';

export function WorkIndustryField() {
  return (
    <ToggleProvider>
      <SelectIndustry />
    </ToggleProvider>
  );
}

function SelectIndustry() {
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputRect = inputRef?.current?.getBoundingClientRect();
  const {handleChange, errors, values, handleTouch} = useForma();
  const {isOpen, handleToggle, handleClose} = useToggle();
  const hasError = errors[FIELDNAME]?.length > 0;
  const value = values[FIELDNAME];

  const handleItemClick = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const id = event?.currentTarget?.dataset?.value;
      handleChange(FIELDNAME, id);
      inputRef.current.focus();
      handleClose();
    },
    [handleChange, handleClose],
  );

  const handleInputBlur = React.useCallback(() => {
    handleTouch(FIELDNAME);
  }, [handleTouch]);

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent | MouseEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const options = dropdownRef?.current;
        if (options?.contains(e.target)) {
          return;
        }
        handleClose();
      }
    };

    const handleScroll = (e?: Event) =>
      window.requestAnimationFrame(() => {
        if (e.target instanceof HTMLElement && isOpen) {
          const optionsList = dropdownRef?.current;
          if (optionsList?.contains(e.target)) {
            return;
          }
          handleClose();
        }
      });

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleClose, isOpen]);

  return (
    <div css={{marginBottom: '1.5rem'}}>
      <Label htmlFor="workIndustry" text="Отрасль занятости" />
      <div css={{position: 'relative'}}>
        <SelectBox
          readOnly
          ref={inputRef}
          placeholder="Выберите из списка"
          css={[css({border: `1px ${isOpen ? 'var(--color-primary)' : hasError ? 'var(--color-error)' : 'var(--color-border)'} solid`})]}
          value={getDisplayValue(value)}
          onBlur={handleInputBlur}
          onClick={handleToggle}
        />
        <div css={{position: 'absolute', top: '35%', right: 10}}>
          <ToggleArrowIcon />
        </div>

        <Dropdown isOpen={isOpen} parentBound={isOpen ? inputRect : undefined} ref={dropdownRef}>
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
        </Dropdown>
      </div>
      {hasError && <ErrorText errorMessage={errors[FIELDNAME]} />}
    </div>
  );
}
