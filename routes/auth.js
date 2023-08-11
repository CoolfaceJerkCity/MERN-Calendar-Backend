import { Router } from 'express';
import { check } from 'express-validator';

import { loginUsuario, crearUsuario, revalidarToken } from '../controllers/index.js'
import { validarCampos, validarJWT } from '../middlewares/index.js';

const router = Router();

router.post("/new", 
            [
                check('name', 'El nombre es obligatorio').notEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6}),
                validarCampos
            ], 
            crearUsuario);


router.post("/", 
            [
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6}),
                validarCampos
            ],
            loginUsuario);

router.get("/renew", [ validarJWT ], revalidarToken);

export { router as authRouter }