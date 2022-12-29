/* ••[1]••••••••••••••••••••••••• firebase.service.ts •••••••••••••••••••••••••••••• */

import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { FirebaseCollections, FirebaseObjects } from '../types/objects';

@Injectable(
    { providedIn: 'root' }
)
export class FirebaseService {

    constructor(
        private http: HttpClient, private readonly firestore: AngularFirestore
    ) {
    }

    public async getObjectList(object: FirebaseCollections): Promise<Array<FirebaseObjects>> {
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
                    console.log(objects);
                    objectsArray = objects;
                }
            );
        return objectsArray;
    }
    public getObjectById(object: FirebaseCollections, id: string): Array<FirebaseObjects> {
        let objectsArray: Array<FirebaseObjects> = [];
        this.firestore.collection(object).snapshotChanges()
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
                    console.log(objects);
                    objectsArray = objects;
                }
            );
        return objectsArray;
    }
}