import React from 'react';
import ErrorMessage from './ErrorMessage';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          errorMessage={
            this.state.error?.message ||
            "Something went wrong, we don't know what"
          }
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
