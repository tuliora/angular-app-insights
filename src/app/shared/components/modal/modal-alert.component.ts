import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-alert',
    templateUrl: './modal-alert.component.html',
    styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent {

  private _title = 'Alert';
  private _message = '';
  private _type = '';

  constructor(public modal: NgbActiveModal) {}

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string){
    switch (value) {
      case 'danger':
        this._type = 'modal-alert-danger';
        break;
      case 'warning':
        this._type = 'modal-alert-warning';
        break;
      case 'success':
        this._type = 'modal-alert-success';
        break;
    }
  }
}
