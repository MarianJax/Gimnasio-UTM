import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { EventosService } from './services/eventos.service';
import { ApiService } from './services/api.service';
import { AuthGuard } from './guards/auth.guard';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { IconService } from './demo/service/icon.service';
import { EventService } from './demo/service/event.service';
import { CustomerService } from './demo/service/customer.service';
import { CountryService } from './demo/service/country.service';
import { ProductService } from './demo/service/product.service';
import { AgendamientoComponent } from './demo/components/home/agendamiento/agendamiento.component';
import { EjerciciosComponent } from './demo/components/home/ejercicios/ejercicios.component';
import { MaquinasComponent } from './demo/components/inventario/maquinas/maquinas.component';
import { RutinasComponent } from './demo/components/home/rutinas/rutinas.component';


@NgModule({
  declarations: [
    AppComponent,
    RutinasComponent,
    NotfoundComponent,
    AgendamientoComponent,
    EjerciciosComponent,
    MaquinasComponent,
  ],
  imports: [
    AppLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule,
    NgbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        MenuModule,
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        EventosService,
        ApiService,
        AuthGuard,
        MessageService,
        ConfirmationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
