import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QueryService} from '../core/services/query.service';
import {FormUtil} from '../core/utils/form-util';
import {ModalService} from '../core/services/modal.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  filterForm: FormGroup;
  result = null;

  constructor(private fb: FormBuilder, private queryService: QueryService,
              private modalService: ModalService) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      query: this.fb.control(null, [Validators.required]),
      timespan: this.fb.control('')
    });
  }

  onSubmit(): void {
    this.result = null;

    if (this.filterForm.valid) {
      this.queryService.search(this.filterForm.value.query, null).subscribe(retorno => {
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
