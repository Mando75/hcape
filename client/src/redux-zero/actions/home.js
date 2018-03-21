export const homeActions = store => ({
  showLogin: state => ({home: {loginVis: true}}),
  hideLogin: state => ({home: {loginVis: false}})
});