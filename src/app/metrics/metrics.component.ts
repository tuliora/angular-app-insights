import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../core/services/data.service';
import {MetricsService} from '../core/services/metrics.service';
import {DateUtil} from '../core/utils/date-util';
import {FormUtil} from '../core/utils/form-util';
import {ModalService} from '../core/services/modal.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html'
})
export class MetricsComponent implements OnInit {

  filterForm: FormGroup;
  showResult = false;
  metadataMetrics: any = null;
  result: any = {value: null, start: null, end: null};

  constructor(private fb: FormBuilder, private dataService: DataService,
              private metricsService: MetricsService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      metric: this.fb.control(null, [Validators.required]),
      timespan: this.fb.control(''),
      interval: this.fb.control(''),
      aggregation: this.fb.control('')
    });
    this.metadata();
  }

  metadata(): void{
    this.metadataMetrics = this.dataService.get('metadataMetrics');
    if (this.metadataMetrics == null || this.metadataMetrics.length === 0){
      this.metricsService.metadata().subscribe(retorno => {
        this.metadataMetrics = retorno;
        this.dataService.set('metadataMetrics', this.metadataMetrics);
      }, error => {
        this.modalService.openModalAlert('', error, 'danger');
      });
    }
  }

  onSubmit(): void{
    if (this.filterForm.valid) {
      this.showResult = true;
      this.result = {start: null, end: null, value: null, segments: null};
      const defaultAggregation = this.metadataMetrics[this.filterForm.value.metric].defaultAggregation;

      this.metricsService.search(this.filterForm.value.metric, this.filterForm.value.timespan,
        this.filterForm.value.interval).subscribe(retorno => {
        this.result.start = DateUtil.format(retorno.start);
        this.result.end = DateUtil.format(retorno.end);

        if (retorno.segments){
          this.result.segments = {
            title: this.result.start + ' - ' + this.result.end,
            labels: [],
            data: []
          };

          retorno.segments.forEach(item => {
            this.result.segments.labels.push(DateUtil.format(item.start));
            this.result.segments.data.push(item[this.filterForm.value.metric][defaultAggregation]);
          });
        }else{
          this.result.value = retorno[this.filterForm.value.metric][defaultAggregation];
        }
      }, error => {
        this.modalService.openModalAlert('', error, 'danger');
      });
    }else{
      FormUtil.validForm(this.filterForm);
      this.showResult = false;
    }
  }

  get f(): any {
    return this.filterForm.controls;
  }
}
