/* ••[1]••••••••••••••••••••••••• auth.guard.ts •••••••••••••••••••••••••••••• */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.token.pipe(
            take(1),
            map(
                (token): any => {
                    const isAuth = !!token;
                    if (isAuth) {
                        return true;
                    }

                    return this.router.createUrlTree(['/login']);
                }
            )
        );
    }

}