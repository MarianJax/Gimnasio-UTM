export interface Pagos {
    id: string
    monto: string
    fecha_pago: string
    metodo_pago: string
    usuario_id: string
}

interface User {
    id: string
    nombre: string
    apellido: string
    cedula: string
    rol: string
}