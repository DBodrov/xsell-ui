import React from 'react';
import cx from 'classnames';
import { PageHeader } from 'src/components/Layout/PageHeader';
import css from './Layout.module.scss';

type LayoutType = 'default' | 'gray';

interface ILayoutProps {
  type?: LayoutType;
  className?: string;
  styles?: React.CSSProperties;
  children: React.ReactNode;
}

export function Layout(props: ILayoutProps) {
  const { type = 'default', className, styles, children } = props;

  const classNames = cx(
    css.Layout,
    {
      [css.TypeGray]: type === 'gray',
    },
    className
  );

  return (
    <div className={classNames} style={styles}>
      <PageHeader />
      {children}
    </div>
  );
}
