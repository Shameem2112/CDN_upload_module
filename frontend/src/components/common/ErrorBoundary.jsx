import { Component } from "react";
import Button from "./Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error(error);
    console.error(info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
          <div className="max-w-md rounded-xl bg-white p-8 shadow-lg text-center">
            <h1 className="text-3xl font-bold text-red-600">
              Something went wrong
            </h1>

            <p className="mt-3 text-gray-600">
              An unexpected error occurred.
            </p>

            <Button
              onClick={this.handleReload}
              className="mt-6"
            >
              Reload
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;