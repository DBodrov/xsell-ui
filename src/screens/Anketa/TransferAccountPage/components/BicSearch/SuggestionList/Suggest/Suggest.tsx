import React from 'react';
import {TSuggestProps} from '../../types';
import {ListItem} from '../styles';

export function Suggest(props: TSuggestProps) {
  const {bic, description, searchQuery, onClick} = props;

  const handleSelectSuggest = () => {
    onClick(bic);
  };

  const displayBic = React.useCallback(() => {
    const unmatchedBicPart = bic?.split(searchQuery);
    if (unmatchedBicPart.length > 1) {
      return (
        <span data-bic={bic}>
          <strong>{searchQuery}</strong>
          {unmatchedBicPart[1]}
        </span>
      );
    }
    return <span>{bic}</span>;
  }, [bic, searchQuery]);

  return (
    <ListItem onClick={handleSelectSuggest}>
      {displayBic()}
      <span>
        {description}
      </span>
    </ListItem>
  );
}
