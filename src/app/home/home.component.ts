import {Component, OnInit} from '@angular/core';
import {MetricsService} from '../core/services/metrics.service';
import {DateUtil} from '../core/utils/date-util';
import {ModalService} from '../core/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  requestCount = {start: null, end: null, sum: 0};
  requestFailed = {start: null, end: null, sum: 0};
  avgServerResp = {start: null, end: null, avg: 0};
  usersCountData: any = null;

  constructor(private metricsService: MetricsService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.requestsCount();
    this.requestsFailed();
    this.averageServerResponse();
    this.usersCount();
  }

  requestsCount(): void {
    const id = 'requests/count';
    this.metricsService.search(id, 'PT12H', null).subscribe(retorno => {
      this.requestCount.sum = retorno[id].sum;
      this.requestCount.start = DateUtil.format(retorno.start);
      this.requestCount.end = DateUtil.format(retorno.end);
    }, error => {
      this.modalService.openModalAlert('', error, 'danger');
    });
  }

  requestsFailed(): void {
    const id = 'requests/failed';
    this.metricsService.search(id, 'PT12H', null).subscribe(retorno => {
      this.requestFailed.sum = retorno[id].sum;
      this.requestFailed.start = DateUtil.format(retorno.start);
      this.requestFailed.end = DateUtil.format(retorno.end);
    }, error => {
      this.modalService.openModalAlert('', error, 'danger');
    });
  }

  averageServerResponse(): void {
    const id = 'requests/duration';
    this.metricsService.search(id, 'PT12H', null).subscribe(retorno => {
      this.avgServerResp.avg = retorno[id].avg;
      this.avgServerResp.start = DateUtil.format(retorno.start);
      this.avgServerResp.end = DateUtil.format(retorno.end);
    }, error => {
      this.modalService.openModalAlert('', error, 'danger');
    });
  }

  usersCount(): void {
    this.metricsService.search('users/count', 'P7D', 'PT30M').subscribe(retorno => {
      const obj = {
        title: 'Users - ' + DateUtil.format(retorno.start) + ' - ' + DateUtil.format(retorno.end),
        labels: [],
        data: []
      };

      retorno.segments.forEach(item => {
        obj.labels.push(DateUtil.format(item.start));
        obj.data.push(item['users/count'].unique);
      });

      this.usersCountData = obj;
    }, error => {
      this.modalService.openModalAlert('', error, 'danger');
    });
  }
}
