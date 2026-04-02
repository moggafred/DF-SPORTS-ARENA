const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { matchValidators, idValidator, paginationValidator } = require('../middleware/validators');

router.get('/upcoming', matchController.getUpcomingMatches);

router.get('/stats', protect, adminOnly, matchController.getMatchStats);

router.get('/', paginationValidator, validate, matchController.getAllMatches);

router.get('/:id', idValidator, validate, matchController.getMatch);

router.post('/', protect, adminOnly, matchValidators.create, validate, matchController.createMatch);

router.put('/:id', protect, adminOnly, idValidator, matchValidators.update, validate, matchController.updateMatch);

router.delete('/:id', protect, adminOnly, idValidator, validate, matchController.deleteMatch);

module.exports = router;
