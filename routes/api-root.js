const express =  require('express');
const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('api-root');
  const message = {
    message: 'api root'
  };

  res.json(message);
});


export {router}

