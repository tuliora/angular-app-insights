import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/components/shared.module';
import {QueryComponent} from './query.component';
import {QueryRoutingModule} from './query-routing.module';

@NgModule({
  imports: [
    CommonModule,
    QueryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  declarations: [
    QueryComponent
  ]
})
export class QueryModule {

}
