import React from 'react';

const STYLE_NAMESPACE = 'vcp-story-builder';

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
        <div className={`${STYLE_NAMESPACE}__error-message`}>
          <div className="error-message-container">
            <div className="error-message-text">
              <div>X</div>
              <div className="error-message-details">
                {this.state.error?.message || "Something went wrong, we don't know what"}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
