const router = require('express').Router();

const {
  createList,
  allList,
  updateList,
} = require('../controllers/list.controller');

router.post('/list/create', createList);
router.get('/list/all', allList);
router.put('/list/update/:id', updateList);

module.exports = router;
