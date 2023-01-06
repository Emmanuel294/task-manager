import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDocument } from "../types/user/user.document";
import { BehaviorSubject, Observable } from 'rxjs';
import { stringLength } from "@firebase/util";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    private tokenExpirationTimer: any;

    public constructor(
        private readonly router: Router,
        private readonly afAuth: AngularFireAuth) {

    }

    public signUp(email: string, password: string): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }

    public async login(email: string, password: string): Promise<string> {
        return await this.afAuth.signInWithEmailAndPassword(email, password).then(
            (result: any): any => {
                result.user.getIdTokenResult(true).then(
                    (token: any): void => {
                        localStorage.setItem('token', token.token);
                        this.token.next(token.token);
                        this.autoLogout(new Date(token.expirationTime).getTime() - new Date().getTime());
                    }
                )
            }
        )
            .catch(
                (error: any): any => {
                    throw new Error('Error trying to Login: ' + error);
                }
            );
    }

    autoLogin() {
        const token: string | null = localStorage.getItem('token');
        if (!token) {
            return;
        }

        this.token.next(token);

    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(
            (): any => {
                this.logOut();
            },
            expirationDuration
        );
    }

    logOut() {
        this.token.next(null);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}