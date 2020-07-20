import React from 'react';
import { Page } from './styles';

export function PageLayout(props: any) {
  const { children, ...restProps } = props;
  return <Page {...restProps}>{children}</Page>;
}
