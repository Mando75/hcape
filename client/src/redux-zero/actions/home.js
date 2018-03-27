export const homeActions = store => ({
  showLogin: state => ({home: {loginVis: true}}),
  hideLogin: state => ({home: {loginVis: false}}),
  showCreate: state => ({home: {createVis: true}}),
  hideCreate: state => ({home: {createVis: false}}),
});