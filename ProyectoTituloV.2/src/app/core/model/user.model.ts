export interface User {
    _id?: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    confirmarContraseña: string;
    sexo: {
        masculino: boolean,
        femenino: boolean
    };
// updatedAt?: Date;
    // createdAt?: Date;
};
