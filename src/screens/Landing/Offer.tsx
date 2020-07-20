import React from 'react';
import { H2 } from 'components/lib';
import { MoneyATM, HourglassIcon, PercentCircle, UserBoxIcon, CCOnHand, PhonespeakerIcon } from 'icons';
import { OfferContent, OfferList, LandingContent, List, ListItem } from './styles';

export function Offer() {
  return (
    <LandingContent>
      <OfferContent>
        <OfferList>
          <H2 css={{ marginBottom: 14 }}>Заполните онлайн-заявку</H2>
          <List>
            <ListItem>
              <MoneyATM />
              <span css={{ paddingLeft: 16 }}>Сумма до 1 000 000 рублей</span>
            </ListItem>
            <ListItem>
              <PercentCircle />
              <span css={{ paddingLeft: 16 }}>Ставка от 14,9%</span>
            </ListItem>
            <ListItem>
              <HourglassIcon />
              <span css={{ paddingLeft: 16 }}>Получение денег без посещения офиса</span>
            </ListItem>
          </List>
        </OfferList>
        <OfferList>
          <H2 css={{ marginBottom: 14 }}>Вам понадобятся</H2>
          <List>
            <ListItem>
              <UserBoxIcon />
              <span css={{ paddingLeft: 16 }}>Российский паспорт</span>
            </ListItem>
            <ListItem>
              <CCOnHand />
              <span css={{ paddingLeft: 16 }}>Номер вашего счета для перевода</span>
            </ListItem>
            <ListItem>
              <PhonespeakerIcon fill="#9E9E9E" />
              <span css={{ paddingLeft: 16 }}>Доступ к телефону для СМС и звонка</span>
            </ListItem>
          </List>
        </OfferList>
      </OfferContent>
    </LandingContent>
  );
}
