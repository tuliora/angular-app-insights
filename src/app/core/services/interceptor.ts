import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from '../../../environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();

    request = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json;charset=UTF-8')
        .set('x-api-key', environment.apiKey)
    });

    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse)
            this.spinner.hide();
        }, error => {
          this.spinner.hide();
        })
      );
  }
}
