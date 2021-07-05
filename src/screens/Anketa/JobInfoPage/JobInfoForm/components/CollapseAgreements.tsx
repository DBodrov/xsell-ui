import React from 'react';
import {Checkbox} from 'neutrino-ui';
import styled from '@emotion/styled';
import {ArrowIcon} from 'icons';

const CollapseList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const CollapseListTitle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const CollapseButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: 0;
  outline: 0;
  width: 24px;
  height: 24px;
  margin-left: auto;
`;

type TAgreementsProps = {
  collectionSetted: boolean;
  setCollection: (isChecked: boolean) => void;
  notarialSetted: boolean;
  setNotarial: (isChecked: boolean) => void;
};

export function CollapseAgreements(props: TAgreementsProps) {
  const {collectionSetted, notarialSetted, setCollection, setNotarial} = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const handleSetNotarialAndCollectionAgreement = (isAgree: boolean) => {
    setCollection(isAgree);
    setNotarial(isAgree);
  };

  return (
    <CollapseList>
      <CollapseListTitle>
        <Checkbox
          onChangeHandler={handleSetNotarialAndCollectionAgreement}
          checked={collectionSetted && notarialSetted}
          boxStyles={{borderRadius: 4, alignSelf: 'flex-start'}}
        >
          Я согласен с условиями подачи заявки и обслуживания
        </Checkbox>
        <CollapseButton type="button" onClick={() => setIsOpen(!isOpen)}>
          <ArrowIcon isOpen={isOpen} />
        </CollapseButton>
      </CollapseListTitle>

      {isOpen ? (
        <div css={{padding: '20px 0 0 1.5rem'}}>
          <Checkbox
            onChangeHandler={setCollection}
            id="collection"
            checked={collectionSetted}
            boxStyles={{borderRadius: 4, alignSelf: 'flex-start'}}
          >
            Я даю согласие на обработку любых моих персональных данных в целях осуществления действий,
            направленных на возврат моей просроченной задолженности
          </Checkbox>
          <Checkbox
            id="notarial"
            checked={notarialSetted}
            onChangeHandler={setNotarial}
            boxStyles={{borderRadius: 4, alignSelf: 'flex-start'}}
          >
            Я даю согласие с на уступку прав требования на основании нотариальной записи, в целях возврата
            задолженности по кредитному договору
          </Checkbox>
        </div>
      ) : null}
    </CollapseList>
  );
}
