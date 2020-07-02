import {Component, OnInit} from '@angular/core';
import {ModalService} from '../core/services/modal.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormUtil} from '../core/utils/form-util';
import {EventsService} from '../core/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  filterForm: FormGroup;
  result = null;
  typeEvents = ['$all', 'traces', 'customEvents', 'pageViews', 'browserTimings',
    'requests', 'dependencies', 'exceptions', 'availabilityResults'];

  constructor(private fb: FormBuilder, private eventsService: EventsService,
              private modalService: ModalService) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      event: this.fb.control(null, [Validators.required]),
      timespan: this.fb.control('')
    });
  }

  onSubmit(): void {
    this.result = null;

    if (this.filterForm.valid) {
      this.eventsService.search(this.filterForm.value.event,
        this.filterForm.value.timespan).subscribe(retorno => {
        this.result = JSON.stringify(retorno, undefined, 4);
      }, error => {
        this.modalService.openModalAlert('', error, 'danger');
      });
    }else{
      FormUtil.validForm(this.filterForm);
    }
  }

  get f(): any {
    return this.filterForm.controls;
  }
}
