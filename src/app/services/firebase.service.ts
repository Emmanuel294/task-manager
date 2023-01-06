/* ••[1]••••••••••••••••••••••••• firebase.service.ts •••••••••••••••••••••••••••••• */

import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { FirebaseCollections, FirebaseObjects } from '../types/objects';
import { Observable } from 'rxjs';

@Injectable(
    { providedIn: 'root' }
)
export class FirebaseService {

    constructor(
        private http: HttpClient, private readonly firestore: AngularFirestore
    ) {
    }

    public getObjectList(object: FirebaseCollections): Observable<FirebaseObjects[]> {
        return this.firestore.collection(object).snapshotChanges()
            .pipe(
                map(
                    (obj: DocumentChangeAction<any>[]): Array<FirebaseObjects> => {
                        return obj.map(
                            (object): any => {
                                const data = object.payload.doc.data();
                                const id = object.payload.doc.id;

                                return {
                                    id,
                                    ...data
                                }

                            }
                        )
                    }
                )
            );
    }
    public async getObjectById(object: FirebaseCollections, id: string): Promise<Array<FirebaseObjects>> {
        let objectsArray: Array<FirebaseObjects> = [];
        await this.firestore.collection(object).snapshotChanges()
            .pipe(
                map(
                    (obj: DocumentChangeAction<any>[]): Array<FirebaseObjects> => {
                        return obj.map(
                            (object): any => {
                                const data = object.payload.doc.data();
                                const id = object.payload.doc.id;

                                return {
                                    id,
                                    ...data
                                }

                            }
                        )
                    }
                )
            )
            .subscribe(
                (objects: Array<FirebaseObjects>): void => {
                    objectsArray = objects;
                }
            );
        return objectsArray;
    }

    public async createObject(objectType: FirebaseCollections, newObject: any) {
        newObject['created'] = new Date().getTime();
        await this.firestore.collection(objectType).add({ ...newObject });
    }
}