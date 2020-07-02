import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalAlertComponent} from '../../shared/components/modal/modal-alert.component';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) {}

  openModalAlert(title: string, message: string, type: string = '',
                 closeOnClick: boolean = false, closeOnEsc: boolean = false): NgbModalRef {
    const modalRef = this.ngbModal.open(ModalAlertComponent, {backdrop: closeOnClick ? closeOnClick : 'static', keyboard: closeOnEsc});

    if (title)
      modalRef.componentInstance.title = title;
    if (message)
      modalRef.componentInstance.message = message;
    if (type)
      modalRef.componentInstance.type = type;
    return  modalRef;
  }

  openModal(content: any, options: any): NgbModalRef {
    const modalRef = this.ngbModal.open(content, options);
    return modalRef;
  }
}
