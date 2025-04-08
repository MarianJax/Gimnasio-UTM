export interface AgendamientoType {
    id: string
    fecha: string
    hora_inicio: string
    hora_fin: string
    asistio: boolean
    user: User
}

interface User {
    nombre: string
    apellido: string
    correo: string
    cedula: string
    roles: string
}

export enum EstadoPago {
    PENDIENTE = 'Pendiente',
    APROBADO = 'Aprobado',
    RECHAZADO = 'Rechazado',
}