
export const authActions = store => ({
  auth: state => ({_authed: true}),
  deauth: state => ({_authed: false}),
});
