import { response } from 'express';
import bcrypt from 'bcryptjs';
import { Usuario } from '../models/index.js';
import { generarJWT } from '../helpers/index.js';

//REGISTRO DE USUARIO
const crearUsuario = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        let usuario = await Usuario.findOne({email});
        if(usuario) return res.status(500).json({ok: false, msg: 'Usuario ya registrado'});

        usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        console.log('usuario registrado');

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            msg: 'Registrado',
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//LOGIN DE USUARIO
const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        //Buscar usuario
        let usuario = await Usuario.findOne({email});
        if(!usuario) return res.status(500).json({ok: false, msg: 'Correo no registrado'});
        
        //Confirmar la password
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword) return res.status(400).json({ok: false, msg: 'Contraseña incorrecta'});

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            msg: 'Iniciando sesion',
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//REGENERANDO TOKEN DE USUARIO
const revalidarToken = async(req, res = response) => {
    const { uid, name } = req;

    //Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        msg: 'Token renovado',
        token
    });
}

export {
    loginUsuario,
    crearUsuario,
    revalidarToken
}