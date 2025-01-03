import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mage-icon',
  template: `
    <i *ngIf="isPrimeIcon" 
       [class]="'pi pi-' + name"
       [ngStyle]="{'font-size': size, 'color': color}">
    </i>
    <span *ngIf="!isPrimeIcon" 
          [innerHTML]="svgContent"
          [ngStyle]="{
            'width': size,
            'height': size,
            'stroke-width': strokeWidth,
            'display': 'inline-flex',
            'color': color
          }">
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    :host ::ng-deep svg {
      width: 100% !important;
      height: 100% !important;
      min-width: unset !important;
      min-height: unset !important;
    }
    :host ::ng-deep path {
      stroke-width: inherit;
    }
  `]
})
export class IconComponent implements OnInit {
  @Input() name: string = '';
  @Input() size: string = '24px'; // Cambiado el valor por defecto
  @Input() color: string = 'currentColor';
  @Input() strokeWidth: string = '1.5';
  @Input() fill: string = 'none'; // Nuevo input para controlar el fill

  isPrimeIcon: boolean = false;
  svgContent: SafeHtml | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.isPrimeIcon = this.name.startsWith('pi-');
    if (!this.isPrimeIcon) {
      this.loadSvgIcon();
    }
  }

  private loadSvgIcon() {
    this.http.get(`assets/icons/${this.name}.svg`, { responseType: 'text' })
      .subscribe(
        (svg: string) => {
          const processedSvg = this.processSvg(svg);
          const svgElement = this.sanitizer.bypassSecurityTrustHtml(processedSvg);
          this.svgContent = svgElement;
        },
        (error) => {
          console.error(`Error loading SVG icon: ${this.name}`, error);
        }
      );
  }

  private processSvg(svgContent: string): string {
    return svgContent
      .replace(/fill="[^"]*"/g, `fill="${this.fill}"`)
      .replace(/stroke-width="[^"]*"/g, `stroke-width="${this.strokeWidth}"`)
      .replace('<svg', `<svg style="width: 100%; height: 100%;"`)
      .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
      .replace(/width="[^"]*"/g, '')
      .replace(/height="[^"]*"/g, '')
      .replace(/path/g, `path fill="${this.fill}"`);
  }
}