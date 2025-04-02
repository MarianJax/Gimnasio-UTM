import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sort-icon',
  template: `
    <ng-container *ngIf="field === sortField">
        <mage-icon *ngIf="sortOrder === 1" fill="var(--primary-color)" size="16px" name="arrow-up"></mage-icon>
        <mage-icon *ngIf="sortOrder === -1" fill="var(--primary-color)" size="16px" name="arrow-down"></mage-icon>
    </ng-container>
    <mage-icon *ngIf="field !== sortField" fill="currentColor" size="16px" name="arrows-alt"></mage-icon>
  `,
  styles: [`
      mage-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 1rem;
        z-index: 1;
      }
    `]
})
export class SortIconComponent {
  @Input() field!: string;
  @Input() sortField: string | null | undefined = ''; // Permite valores nulos o indefinidos
  @Input() sortOrder: number | null | undefined = 0;
}
