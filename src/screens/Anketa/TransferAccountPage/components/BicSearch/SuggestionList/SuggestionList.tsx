import React from 'react';
import {Suggest} from './Suggest';
import {TSuggestionListProps} from '../types';
import {List, ListItem} from './styles';

export function SuggestionList(props: TSuggestionListProps) {
  const {results, query, onSelectSuggest} = props;
  return (
    <List>
      {results?.length > 0 ? (
        results.map(({bic, description}) => (
          <Suggest
            key={bic}
            searchQuery={query}
            bic={bic}
            description={description}
            onClick={onSelectSuggest}
          />
        ))
      ) : (
        <ListItem>
          <span css={{fontSize: 14}}>БИК не найден</span>
        </ListItem>
      )}
    </List>
  );
}
