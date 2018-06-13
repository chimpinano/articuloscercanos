import {Injectable} from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import {Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AutorizacionService } from "./autorizacion.service";
import { query } from "@angular/animations/src/animation_metadata";

//import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

// para q pueda ser inyectado en otros componentes y desde otros modulos puedan 
// ser inyectados dentro de este servicio
@Injectable()
export class LugaresService{
    //[x: string]: any;
    // Esta variable es para hacer el trabajo con http en lugar de lo q se vania haciendo Socket ej:this.afDB.database
    API_ENDPOINT = 'https://donde-lo-venden.firebaseio.com';

    lugares : any = [];
    lugares2 : any = [];
    
    public postsRef: AngularFireList<any[]>
    public posts: Observable<any> = null
      
    constructor(private afDB: AngularFireDatabase, private http: Http){}
                   
    public getLugares(){
        return this.afDB.list('lugares').valueChanges(); // via sockets
    }
    public buscarLugar(id){
        return this.lugares.filter((lugar) => { return lugar.id == id})[0] || null;
    }
    public findMyBusiness(email){
        return this.lugares.filter((lugar) => { return lugar.email == email})[0] || null;
    }
    public guardarLugar(lugar){
       lugar.id = Date.now();
       this.lugares.push(lugar);
       this.afDB.database.ref('lugares/' + lugar.id).set(lugar); // via sockets
       //const headers = new Headers({"Content-Type":"application/json"});
       //return this.http.post(this.API_ENDPOINT+'/lugares.json', lugar, {headers:headers}); // via http post
    }
    public editarLugar(lugar){
        this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    }
    public obtenerGeoData(direccion){
        //http://maps.google.com/maps/api/geocode/json?address=9-55+calle+72,+Bogota,Colombia
        return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
    }
    public getLugar(id){
        return this.afDB.object('lugares/'+id);
    }    
}
