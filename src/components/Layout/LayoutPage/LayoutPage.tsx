import React from 'react';
import cn from 'classnames/bind';
//import { useBreakpoint } from 'providers';
import { PageHeader } from '../PageHeader';
import css from './LayoutPage.module.scss';

const cx = cn.bind(css);

interface ILayoutProps {
  layoutStyles?: React.CSSProperties;
  className?: string;
  // mainStyles?: React.CSSProperties;
  children: React.ReactNode;
}

export function LayoutPage({ layoutStyles = {}, className, children }: ILayoutProps) {
  return (
    <div className={cx(css.LayoutPage, className)} style={layoutStyles}>
      <PageHeader />
      {children}
    </div>
  );
}
