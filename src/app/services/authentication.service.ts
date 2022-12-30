import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDocument } from "../types/user/user.document";
import { BehaviorSubject, Observable } from 'rxjs';
import { stringLength } from "@firebase/util";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    public constructor(private readonly afAuth: AngularFireAuth) {

    }

    public signUp(email: string, password: string): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }

    public async login(email: string, password: string): Promise<string> {
        return await this.afAuth.signInWithEmailAndPassword(email, password).then(
            (result: any): any => {
                result.user.getIdToken(true).then(
                    (token: string): void => {
                        localStorage.setItem('token', token);
                        this.token.next(token);
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
}