/* ••[1]••••••••••••••••••••••••• user.service.ts •••••••••••••••••••••••••••••• */

import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { FirebaseCollections } from '../types/objects';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private firebaseService: FirebaseService) { }

    public async createUser(userDocument: any) {
        await this.firebaseService.createObject(FirebaseCollections.user, userDocument);
    }

}