import React from 'react';
import cx from 'classnames';
import css from './List.module.scss';

interface IListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function List({ children, className, style }: IListProps) {
  return (
    <div className={cx(css.List, className)} style={style}>
      {children}
    </div>
  );
}

function ListItem({ children, className, style }: IListProps) {
  return (
    <div className={cx(css.ListItem, className)} style={style}>
      {children}
    </div>
  );
}

List.ListItem = ListItem;

export default List;
