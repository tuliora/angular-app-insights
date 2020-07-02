import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetricsComponent} from './metrics.component';
import {MetricsRoutingModule} from './metrics-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MetricsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  declarations: [
    MetricsComponent
  ]
})
export class MetricsModule {

}
