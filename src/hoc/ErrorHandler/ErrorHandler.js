import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import { existsTypeAnnotation } from '@babel/types';

const ErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      }
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null, });
        return request;
      })
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
        return Promise.reject(error);
      });
    }

    componentWillUnmount() {
      existsTypeAnnotation.interceptors.request.eject(this.requestInterceptor);
      existsTypeAnnotation.interceptors.response.eject(this.responseInterceptor);
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