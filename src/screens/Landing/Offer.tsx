import React from 'react';
import {H2} from 'components/lib';
import {MoneyATM, HourglassIcon, PercentCircle, UserBoxIcon, CCOnHand, PhonespeakerIcon} from 'icons';
import {OfferContent, OfferList, LandingContent, List, ListItem} from './styles';

export function Offer() {

  return (
    <LandingContent>
      <OfferContent>
        <OfferList>
          <H2 css={{marginBottom: 14}}>Заполните онлайн-заявку</H2>
          <List>
            <ListItem>
              <MoneyATM />
              <span css={{paddingLeft: 16}}>Сумма до 1 000 000 рублей</span>
            </ListItem>
            <ListItem>
              <PercentCircle css={{minWidth: 24}} />
              <span css={{paddingLeft: 16}}>
                Ставка 8,5% при участии в акции “Разница есть” и при соблюдении{' '}
                <a
                  href="https://cash.otpbank.ru/public/rule.pdf"
                  css={{color: 'var(--color-primary)'}}
                  type="download"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  условий
                </a>
              </span>
            </ListItem>
            <ListItem>
              <HourglassIcon />
              <span css={{paddingLeft: 16}}>Получение денег без посещения офиса</span>
            </ListItem>
          </List>
        </OfferList>
        <OfferList>
          <H2 css={{marginBottom: 14}}>Вам понадобятся</H2>
          <List>
            <ListItem>
              <CCOnHand />
              <span css={{paddingLeft: 16}}>Номер вашего счета для перевода</span>
            </ListItem>
            <ListItem>
              <UserBoxIcon />
              <span css={{paddingLeft: 16}}>Российский паспорт</span>
            </ListItem>
            <ListItem>
              <PhonespeakerIcon fill="#9E9E9E" />
              <span css={{paddingLeft: 16}}>Доступ к телефону для СМС и звонка</span>
            </ListItem>
          </List>
        </OfferList>
      </OfferContent>
    </LandingContent>
  );
}
