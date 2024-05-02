const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.get(
  '/contacts',
  (req, res, next) => {
    req.appId = 'Meu Id';
    next();
  },
  ContactController.index,
);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

module.exports = router;
