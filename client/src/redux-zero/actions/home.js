import {store} from "../store";

export const homeActions = {
  showLogin: () => {store.setState({home: {loginVis: true}})},
  hideLogin: () => {store.setState({home: {loginVis: false}})},
  showCreate: () => {store.setState({home: {createVis: true}})},
  hideCreate: () => {store.setState({home: {createVis: false}})},
};