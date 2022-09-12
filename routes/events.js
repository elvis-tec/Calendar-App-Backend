/*
Events route
host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.use( validateJWT );

//Get events
router.get('/', [validateFields], getEvents);

//Create event
router.post('/', [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'start date is required').custom( isDate ),
    check('end', 'end date is required').custom( isDate ),
    validateFields
], createEvent);

//Update event
router.put('/:id', [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'start date is required').custom( isDate ),
    check('end', 'end date is required').custom( isDate ),
    validateFields
], updateEvent);

//Delete event
router.delete('/:id', [validateFields], deleteEvent);

module.exports = router;