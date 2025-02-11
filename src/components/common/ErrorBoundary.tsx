import React, { ErrorInfo } from 'react';
import { Button } from '../ui/button';

interface State {
  hasError: boolean;
  errorInfo: string;
}

export class ErrorBoundary extends React.Component<{children: React.ReactNode}, State> {
  state: State = { hasError: false, errorInfo: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary:', error, errorInfo);
  }

  handleReset = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4 font-mono text-sm text-red-600">{this.state.errorInfo}</p>
          <Button onClick={this.handleReset} variant="destructive">
            Reload Application
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}