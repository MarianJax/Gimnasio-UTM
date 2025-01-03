import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rutina-detail',
  templateUrl: './rutina-detail.component.html',
  styleUrls: ['./rutina-detail.component.scss']
})
export class RutinaDetailComponent implements OnInit {
  rutinaSlug: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.rutinaSlug = this.route.snapshot.paramMap.get('slug') ?? '';
    // Aquí puedes cargar los detalles de la rutina usando el slug
  }

  goToPagos() {
    this.router.navigate(['/rutina', this.rutinaSlug, 'pago']);
  }

}
