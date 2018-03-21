export const loadingActions = store => ({
  startLoading: state => ({_loading : true}),
  finishLoading: state => ({_loading : false})
});
