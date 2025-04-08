export interface AgendamientoType {
    id: string
    fecha: string
    hora_inicio: string
    hora_fin: string
    asistio: boolean
    user: User
    pagos?: Pagos
    membresias?: Membresias
}

interface User {
    nombre: string
    apellido: string
    correo: string
    cedula: string
    roles: Role[]
}

interface Role {
    nombre: string
}

interface ValidacionPago {
    id: string
    fecha_validacion: Date
    estado: EstadoPago
}

interface Pagos {
    id: string
    monto: string
    fecha_pago: string
    metodo_pago: string
    validacion_pago: ValidacionPago[]
}

interface Membresias {
    id: string
    fecha_inicio: string
    costo: string
    pagos: Pagos
}

export enum EstadoPago {
    PENDIENTE = 'Pendiente',
    APROBADO = 'Aprobado',
    RECHAZADO = 'Rechazado',
}