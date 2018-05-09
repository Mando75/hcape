// export const loadingActions = store => ({
//   startLoading: state => ({_loading : true}),
//   finishLoading: state => ({_loading : false})
// });
import {store} from "../store";

export const loadingActions = {
  startLoading: () => store.setState({_loading: true}),
  finishLoading: () => store.setState({_loading: false})
};