export const userActions = store => ({
  setUser: (state, value) => ({user: value}),
  delUser: state => ({user: {_id: '', type: 'student', email: '', inumber: '', name:'User' }}),
  setType: (state, value) => ({user:{type: value}}),
  setId: (state, value) => ({user:{_id: value}}),
  setEmail: (state, value) => ({user:{email: value}}),
  setINum:(state, value) => ({user:{inumber: value}}),
  setName:(state, value) => ({user:{name: value}})
});






