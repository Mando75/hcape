import {store} from "../store";

export const authActions = {
  auth: () => {store.setState({_authed: true})},
  deauth: () => {store.setState({_authed: false})},
};

