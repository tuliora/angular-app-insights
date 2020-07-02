import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/components/shared.module';
import {EventsComponent} from './events.component';
import {EventsRoutingModule} from './events-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  declarations: [
    EventsComponent
  ]
})
export class EventsModule {

}
