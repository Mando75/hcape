import store from '../store';

export const startLoading = () => {
  store.setState({_loading: true});
};

export const finishLoading = () => {
  store.setState({_loading: false})
};