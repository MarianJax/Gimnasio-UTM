import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  getPagosData() {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        cedula: '5684236526',
        image: 'bamboo-watch.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-01-01',
        inventoryStatus: 'INSTOCK',
        precio: 3.50
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        cedula: '5684236526',
        image: 'black-watch.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-01-01',
        inventoryStatus: 'OUTOFSTOCK',
        precio: 4.00
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        cedula: '5684236526',
        image: 'blue-band.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-02-01',
        inventoryStatus: 'LOWSTOCK',
        precio: 2.50
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        cedula: '5684236526',
        image: 'blue-t-shirt.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-02-01',
        inventoryStatus: 'INSTOCK',
        precio: 5.00
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Running Shoes',
        cedula: '5684236526',
        image: 'running-shoes.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-03-01',
        inventoryStatus: 'INSTOCK',
        precio: 3.00
      },
      {
        id: '1005',
        code: 'av2231fwg',
        name: 'Sneakers',
        cedula: '5684236526',
        image: 'sneakers.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-03-01',
        inventoryStatus: 'OUTOFSTOCK',
        precio: 4.50
      },
      {
        id: '1006',
        code: 'bib36pfvm',
        name: 'T-Shirt',
        cedula: '5684236526',
        image: 't-shirt.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-04-01',
        inventoryStatus: 'INSTOCK',
        precio: 2.00
      },
      {
        id: '1007',
        code: 'mbvjkgip5',
        name: 'Bracelet',
        cedula: '5684236526',
        image: 'bracelet.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-04-01',
        inventoryStatus: 'INSTOCK',
        precio: 3.75
      },
      {
        id: '1008',
        code: 'vbb124btr',
        name: 'Necklace',
        cedula: '5684236526',
        image: 'necklace.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-05-01',
        inventoryStatus: 'OUTOFSTOCK',
        precio: 1.50
      },
      {
        id: '1009',
        code: 'cm230f032',
        name: 'Watch',
        cedula: '5684236526',
        image: 'watch.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-05-01',
        inventoryStatus: 'LOWSTOCK',
        precio: 4.25
      },
      {
        id: '1010',
        code: 'plb34234',
        name: 'Sunglasses',
        cedula: '5684236526',
        image: 'sunglasses.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-06-01',
        inventoryStatus: 'OUTOFSTOCK',
        precio: 2.75
      },
      {
        id: '1011',
        code: '4920nnc2',
        name: 'Laptop',
        cedula: '5684236526',
        image: 'laptop.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-06-01',
        inventoryStatus: 'LOWSTOCK',
        precio: 4.75
      },
      {
        id: '1012',
        code: '250vm23cc',
        name: 'Mobile Phone',
        cedula: '5684236526',
        image: 'mobile-phone.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-07-01',
        inventoryStatus: 'INSTOCK',
        precio: 3.25
      },
      {
        id: '1013',
        code: 'fldsmn31b',
        name: 'Keyboard',
        cedula: '5684236526',
        image: 'keyboard.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-07-01',
        inventoryStatus: 'INSTOCK',
        precio: 2.00
      },
      {
        id: '1014',
        code: 'waas1x2as',
        name: 'Mouse',
        cedula: '5684236526',
        image: 'mouse.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-08-01',
        inventoryStatus: 'INSTOCK',
        precio: 1.75
      },
      {
        id: '1015',
        code: 'vb34btbg5',
        name: 'Headphones',
        cedula: '5684236526',
        image: 'headphones.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-08-01',
        inventoryStatus: 'LOWSTOCK',
        precio: 3.00
      },
      {
        id: '1016',
        code: 'k8l6j58jl',
        name: 'Speaker',
        cedula: '5684236526',
        image: 'speaker.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-09-01',
        inventoryStatus: 'LOWSTOCK',
        precio: 2.25
      },
      {
        id: '1017',
        code: 'v435nn85n',
        name: 'Camera',
        cedula: '5684236526',
        image: 'camera.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-09-01',
        inventoryStatus: 'INSTOCK',
        precio: 4.50
      },
      {
        id: '1018',
        code: 'tb3g8j92g',
        name: 'Tablet',
        cedula: '5684236526',
        image: 'tablet.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-10-01',
        inventoryStatus: 'OUTOFSTOCK',
        precio: 3.75
      },
      {
        id: '1019',
        code: 'v54r4v44v',
        name: 'Smartwatch',
        cedula: '5684236526',
        image: 'smartwatch.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-10-01',
        inventoryStatus: 'LOWSTOCK',
        precio: 4.00
      },
      {
        id: '1020',
        code: 'agvnbvbb1',
        name: 'Gaming Console',
        cedula: '5684236526',
        image: 'gaming-console.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-11-01',
        inventoryStatus: 'INSTOCK',
        precio: 2.50
      },
      {
        id: '1021',
        code: 'bngh34h5g',
        name: 'Smart TV',
        cedula: '5684236526',
        image: 'smart-tv.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-11-01',
        inventoryStatus: 'LOWSTOCK',
        precio: 3.25
      },
      {
        id: '1022',
        code: 'jklh5h4g5',
        name: 'Smart Light',
        cedula: '5684236526',
        image: 'smart-light.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2023-12-01',
        inventoryStatus: 'INSTOCK',
        precio: 1.00
      },
      {
        id: '1023',
        code: 'mnbv5h4g5',
        name: 'Smart Thermostat',
        cedula: '5684236526',
        image: 'smart-thermostat.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2023-12-01',
        inventoryStatus: 'INSTOCK',
        precio: 2.75
      },
      {
        id: '1024',
        code: 'lkjh5h4g5',
        name: 'Smart Door Lock',
        cedula: '5684236526',
        image: 'smart-door-lock.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2024-01-01',
        inventoryStatus: 'LOWSTOCK',
        precio: 3.00
      },
      {
        id: '1025',
        code: 'qwer5h4g5',
        name: 'Smart Speaker',
        cedula: '5684236526',
        image: 'smart-speaker.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2024-01-01',
        inventoryStatus: 'LOWSTOCK',
        precio: 4.50
      },
      {
        id: '1026',
        code: 'asdf5h4g5',
        name: 'Smart Plug',
        cedula: '5684236526',
        image: 'smart-plug.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2024-02-01',
        inventoryStatus: 'INSTOCK',
        precio: 1.25
      },
      {
        id: '1027',
        code: 'zxcv5h4g5',
        name: 'Smart Camera',
        cedula: '5684236526',
        image: 'smart-camera.jpg',
        rol: 'Docente',
        tipoMembresia: 'diario',
        fecha: '2024-02-01',
        inventoryStatus: 'INSTOCK',
        precio: 2.50
      },
      {
        id: '1028',
        code: 'tyui5h4g5',
        name: 'Smart Doorbell',
        cedula: '5684236526',
        image: 'smart-doorbell.jpg',
        rol: 'Estudiante',
        tipoMembresia: 'mensual',
        fecha: '2024-03-01',
        inventoryStatus: 'INSTOCK',
        precio: 3.75
      }
    ];
  }

  getPagos() {
    return Promise.resolve(this.getPagosData());
}
}
