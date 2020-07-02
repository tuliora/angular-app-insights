import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ChartLineComponent} from './charts/line/chart-line.component';
import {ModalAlertComponent} from './modal/modal-alert.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        TranslateModule,
        FormsModule
    ],
  declarations: [
    NavbarComponent, SidebarComponent,
    ChartLineComponent, ModalAlertComponent
  ],
  exports: [
    TranslateModule, FontAwesomeModule,
    NavbarComponent, SidebarComponent, ChartLineComponent, ModalAlertComponent
  ],
  providers: []
})
export class SharedModule { }
