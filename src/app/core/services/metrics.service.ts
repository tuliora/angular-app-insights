import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {BasicService} from './basic.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MetricsService extends BasicService {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  metadata(): any{
    return this.http.get<any>(`${environment.api}/metrics/metadata`).pipe(
      map(retornoApi => {
        return retornoApi.metrics;
      }),
      catchError(e => super.getError(e))
    );
  }

  search(id: string, timespan: string = 'PT12H', interval: string = null): any {
    const intervalFinal = interval != null ? '&interval=' + interval : '';
    timespan = (timespan == null || timespan === '') ? 'PT12H' : timespan;

    return this.http.get<any>(`${environment.api}/metrics/${id}?timespan=${timespan}${intervalFinal}`).pipe(
      map(retornoApi => {
        return super.getResponse(retornoApi);
      }),
      catchError(e => super.getError(e))
    );
  }
}
