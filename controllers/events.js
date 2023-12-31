import { response } from 'express';
import { Evento } from '../models/index.js';

const getEventos = async(req, res = response) => {
    try {
        const eventos = await Evento.find().populate('user', 'name');
        res.json({
            ok: true,
            msg: 'Eventos obtenidos',
            eventos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const crearEvento = async(req, res = response) => {
    const evento = new Evento(req.body);
    
    try {
        evento.user = req.uid;
        const eventoDB = await evento.save();

        res.status(201).json({
            ok: true,
            msg: 'Evento creado',
            evento: eventoDB
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarEvento = async(req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if(!evento) return res.status(404).json({ ok: false, msg: 'El evento no existe'});
        if(evento.user.toString() !== uid) return res.status(401).json({ ok: false, msg: 'No tiene privilegio para editar este evento'});

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            msg: 'Evento actualizado',
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async(req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if(!evento) return res.status(404).json({ ok: false, msg: 'El evento no existe'});
        if(evento.user.toString() !== uid) return res.status(401).json({ ok: false, msg: 'No tiene privilegio para eliminar este evento'});

        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: 'Evento eliminado'
        });
        
    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

export {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}