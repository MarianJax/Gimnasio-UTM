import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconComponent } from './icons.component';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [IconComponent]
})
export class IconModule { }

