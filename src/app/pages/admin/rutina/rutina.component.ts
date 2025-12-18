import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../../../components/rutina/table/table.component';
import { TableComponent as TableGroup } from '../../../components/grupo-muscular/table/table.component';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.scss'],
})
export class RutinaComponent implements OnInit {
  @ViewChild(TableComponent)
  tblRutina!: TableComponent;

  @ViewChild(TableGroup)
  tblGrupo!: TableGroup;

  constructor() {}

  ngOnInit(): void {}

  loadRutinas() {
    if (this.tblRutina) {
      this.tblRutina.loadRutinas();
    }
  }
  loadGrupos() {
    if (this.tblGrupo) {
      this.tblGrupo.loadGruposMusculares();
    }
  }
}
