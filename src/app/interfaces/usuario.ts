export interface Usuario {
    idU:number;
    nomusuario:string;
    nombre:string;
    apellido:string;
    fechaNacimiento:Date;
    correo:string;
    region:string;
    comuna:string;
    genero:string;
    foto:Blob;
    password:string;
    direccion:string;
    fono:number;
}
