export const navActions = store => ({
  toggleNav: state => ({_collapsed: !state._collapsed})
});

import {store} from "../store";
//
// export const navActions = {
//   toggleNav: (state) => {
//     store.setState({_collapsed: !state});
//   }
// };