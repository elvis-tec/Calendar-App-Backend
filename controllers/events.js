const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response)=> {
    try {
        const event = await Event.find().populate('user', 'name');
        res.status(200).json({
            ok: true,
            event,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator',
        });
    }
}

const createEvent = async(req, res = response)=> {
    const event = new Event( req.body );
    try {

        event.user = req.body.uid;

        const savedEvent = await event.save();

        res.status(201).json({
            ok: true,
            event: savedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator',
        });
    }
}

const updateEvent = async(req, res = response)=> {
    const eventId = req.params.id;
    const uid = req.body.uid;

    try {
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Event not found',
            })
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized',
            })
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, {new: true} );

        res.status(200).json({
            ok: true,
            event: updatedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator',
        });
    }
}

const deleteEvent = async(req, res = response)=> {
    const eventId = req.params.id;
    const uid = req.body.uid;

    try {
        const event = await Event.findById( eventId );

        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Event not found',
            })
        }

        if( event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized',
            })
        }

        const deletedEvent = await Event.findByIdAndDelete( eventId );

        res.status(204).json({
            ok: true,
            event: deletedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator',
        });
    }
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}