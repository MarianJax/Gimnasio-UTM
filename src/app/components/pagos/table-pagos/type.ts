export interface Pagos {
    id: string
    monto: string
    fecha_pago: string
    metodo_pago: string
    user: User | null
}

interface User {
    id: string
    nombre: string
    apellido: string
    cedula: string
    rol: string
}