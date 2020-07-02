import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class BasicService {

  constructor(public http: HttpClient, public router: Router){}

  protected getResponse(response: any): any{
    if (response && response.status && response.status.code === 1)
      throw(response.status.message);

    return response.value;
  }

  protected getError(response): any{
    if (response.error && response.error && response.error && response.error.error &&
      response.error.error.innererror)
      return throwError(response.error.error.innererror.message);
    else
      return throwError(response);
  }
}
