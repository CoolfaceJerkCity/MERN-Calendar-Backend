import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos, validarJWT } from '../middlewares/index.js';
import { getEventos, crearEvento, actualizarEvento, eliminarEvento } from '../controllers/index.js';
import { isDate } from '../helpers/index.js';

const router = Router();

//Todas las peticiones heredan este middleware
router.use(validarJWT);

router.get("/", getEventos);
router.post("/", [
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de termino es obligatorio').custom(isDate),
    validarCampos
],crearEvento);

router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);

export { router as eventRouter }