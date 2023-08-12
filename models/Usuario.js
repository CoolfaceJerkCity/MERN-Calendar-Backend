import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

UsuarioSchema.method('toJSON', function() {
    const { ...object } = this.toObject();
    object.uid = _id;
    return object;
})

export const Usuario = model('Usuario', UsuarioSchema);
