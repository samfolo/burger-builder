import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const ErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      }
    }

    componentDidMount() {
      axios.interceptors.request.use(request => {
        this.setState({ error: null, });
        return request;
      })
      axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
        return Promise.reject(error);
      });
    }

    removeModal = () => {
      this.setState({ error: null, })
    }

    render() {
      return (
        <Aux>
          <Modal 
            show={this.state.error}
            onAbort={this.removeModal}>
            <p>Something went wrong..</p>
            <p>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default ErrorHandler;