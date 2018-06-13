import { Injectable, Inject } from '@angular/core';
//import { Product } from './product.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import * as firebase from 'firebase/app';

@Injectable()
export class UploadService {

    private firebasestorage: any;

    constructor(private afAuth: AngularFireAuth, private afd: AngularFireDatabase, 
        fbApp: FirebaseApp) {
        this.firebasestorage = fbApp.storage();
    }

    public addProduct(file: File, email: String) {
        return this.firebasestorage.ref(`lugares` + `/` + email + `/` + Date.now() + file.name.toLocaleLowerCase())
        .put(file).then(
            snapshot => {
                return snapshot.downloadURL;
            });
    }

    public deleteProduct(email, path) {
        this.firebasestorage.ref(`lugares` + `/` + email + `/` + path).delete().then(
            snapshot => {
        });
    }
}