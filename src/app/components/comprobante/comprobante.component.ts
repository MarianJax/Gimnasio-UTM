import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss'],
})
export class ComprobanteComponent {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  @Input() data: {
    anio: string;
    numero: string;
    facultad: string;
    usuario: string;
    carrera: string;
    grupoMuscular: string;
    horaInicio: string;
    horaFin: string;
    fechaPago: string;
    metodoPago: string;
    monto: string;
    fechaGeneracion: string;
    hora: string;
  } | null = null; // Recibe parámetros dinámicos

  generatePDF(): void {
    const content = this.pdfContent.nativeElement;
    html2pdf()
      .set({
        filename: `comprobante_${Date.now()}.pdf`,
        image: {
          type: 'jpeg',
          quality: 0.98,
        },
        html2canvas: {
          scale: 1.5,
        },
        jsPDF: {
          unit: 'in',
          format: [13.38, 8],
          orientation: 'portrait',
        },
      })
      .from(content)
      .save();
  }
}
