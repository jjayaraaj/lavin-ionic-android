import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log('ongoing request');
    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          // console.log('Incoming request');
          // console.log(event.body);
        }
      })
    );
  }
}
