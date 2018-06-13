import {Injectable} from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Response } from "@angular/http/src/static_response";
import {Router} from "@angular/router";
import * as firebase from 'firebase/app';
// para q pueda ser inyectado en otros componentes y desde otros modulos puedan 
// ser inyectados dentro de este servicio
@Injectable()
export class AutorizacionService{

    constructor(private angularFireAuth: AngularFireAuth, private router:Router){
        // para inicializarlo desde el constructor
        this.isLogged();
    }
    public facebookLogin(){
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((result) => {
            //console.log(result);
            this.router.navigate(['lugares']);
        }).catch((error) => {
            console.log(error);
        })
    }
    public login = (email, password) => {
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then((response) => {
            //console.log(response);
            this.router.navigate(['lugares']);
        }).catch((error) => {
            //alert('Un error ha ocurrido');
            console.log(error);
        })
    }
    public registro = (email, password) => {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then((response) => {
            console.log(response);
            this.router.navigate(['lugares']);
        }).catch((error) => {
            //alert('Un error ha ocurrido');
            console.log(error);
        })
    };
    public isLogged(){
        // trae un id unico
        return this.angularFireAuth.authState;
    };
    public logout(){
        this.angularFireAuth.auth.signOut();
        this.router.navigate(['lugares']);
    }
    public getEmail(){
        return this.angularFireAuth.auth.currentUser.email;
    }
    public getUser(){
        return this.angularFireAuth.auth;
    };
    getToken() {
        return firebase.auth().currentUser.getToken(true).then(function(idToken) {
            return idToken
          }).catch(function(error) {
          });
    }    
}
