import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortIconComponent } from './sort-icon.component';
import { IconModule } from '../icons/icons.module';

@NgModule({
  declarations: [
    SortIconComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    SortIconComponent
  ],
})
export class SortIconModule { }
