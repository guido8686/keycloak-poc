import {Injectable} from '@angular/core';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, mergeMap, Observable} from 'rxjs';
import {KeycloakService} from "./keycloak.service";

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldAddAuthorizationHeader(request)) {
      return next.handle(request);
    }
    return from(this.keycloakService.getToken()).pipe(mergeMap(tok => next.handle(this.addAuthorizationHeader(request, tok))));
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ` + token
      }
    });
  }

  private shouldAddAuthorizationHeader(request: HttpRequest<any>): boolean {
    return true;
  }

}
