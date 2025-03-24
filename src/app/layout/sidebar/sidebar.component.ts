import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    app-sidebar {
      height: -webkit-fill-available !important;
    }
    `]
})
export class SidebarComponent {
  constructor(public layoutService: LayoutService, public el: ElementRef) { }
}