import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {BasicService} from './basic.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QueryService extends BasicService {

  constructor(http: HttpClient, router: Router) {
    super(http, router);
  }

  search(query: string = null, timespan: string = null): any{
    timespan = (timespan == null || timespan === '') ? 'PT12H' : timespan;

    return this.http.get<any>(`${environment.api}/query?query=${query}&timespan=${timespan}`).pipe(
      map(retornoApi => {
        return retornoApi;
      }),
      catchError(e => super.getError(e))
    );
  }
}
