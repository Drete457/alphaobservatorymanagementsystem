import { Component } from 'react';
import NotFound from 'views/notfound';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorIn: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorIn) {
    this.setState({
      hasError: true,
      error,
      errorIn,
    });
  }

  render() {
    if (this.state.hasError) {
      return <NotFound error={this.state.error} errorIn={this.state.errorIn} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
