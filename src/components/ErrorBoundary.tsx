'use client';
import React, { ReactNode } from 'react';

import ErrorFallback from './ErrorFallback';

interface IProps {
  children?: ReactNode;
  errorFallback?: any;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError (_error: any) {
    return { hasError: true };
  }

  render () {
    if (this.state.hasError) {
      return this.props.errorFallback || <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
