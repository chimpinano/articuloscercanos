import { Component } from '@angular/core';
import {LugaresService} from "../services/lugares.service";
//import { Subscriber } from 'rxjs/Subscriber';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { FormControl } from '@angular/Forms';
import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../interfaces/api-response.interface';
import { AutorizacionService } from '../services/autorizacion.service';
import { UploadService } from '../services/upload.service';

@Component({
    selector: 'app-crear',
    templateUrl: './crear.component.html'
})

export class CrearComponent {
    lugar:any = {};
    article:String = null;
    itemList = Array<{name: string, imgUrl: string}>();
    id :any = null;
    plan:boolean = false;
    active:boolean = true;
    msgInfo:String = "";
    // para crear 1 convesion de strings se usa $
    results$: Observable<any>;
    private searchField: FormControl;

    constructor(private lugaresService: LugaresService, 
        private uploadService: UploadService,
        private autorizacionService:AutorizacionService,
        private route : ActivatedRoute, private http: HttpClient){
        this.id = this.route.snapshot.params['id'];
        if(this.id != 'new'){
            this.lugaresService.getLugar(this.id)
            .valueChanges().subscribe((lugar)=>{
                this.lugar = lugar;
                var me = this;
                if(this.lugar.items !== undefined){
                    this.lugar.items.forEach(function(val) {
                        me.itemList.push(val);
                    });
                }
            });
        }
        const URL = 'https://maps.google.com/maps/api/geocode/json';
        this.searchField = new FormControl();
        this.results$ = this.searchField.valueChanges
            .debounceTime(500)
            .switchMap(query => this.http.get(`${URL}?address=${query != '' ? query:'Costa Rica'}`))
            //.map(response => response.json()) con Http
            .map((response:APIResponse) => response.results);
    }
    addItem(name){
        if(name != null && name.length > 1){
            let fle: File;
            for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
              fle = selectedFile;
            };
            let exist: number = -1;
            if(this.itemList.length > 0){
                this.itemList.forEach(function (element) {
                    if(exist == -1){
                        exist = element.name.indexOf(name);
                    }
                });
            }
            if (exist == -1){
                if(fle != undefined){
                this.uploadService.addProduct(fle, this.autorizacionService.getUser().currentUser.email)
                .then(path => {
                    this.itemList.push({
                        'name': name, 'imgUrl': path
                    });
                  });
                } else {
                    this.itemList.push({
                        'name': name, 'imgUrl': ""
                    });
                }
            }
            this.article = null;
        }
    }
    deleteItem(idx){
        let path = this.itemList[idx].imgUrl;
        if(path.length > 0){
            let val1 = path.split('?')[0];
            let val2 = val1.split("%2F");
            path = val2[2];
            this.itemList.splice(idx, 1);
            this.uploadService.deleteProduct(this.autorizacionService.getUser().currentUser.email,path);
        } else {
            this.itemList.splice(idx, 1);
        }
    }
    guardarLugar(){
        var direccion = this.lugar.calle +','+this.lugar.ciudad +','+this.lugar.pais;
        this.lugaresService.obtenerGeoData(direccion)
        .subscribe((result) => {
            this.lugar.lat = result.json().results[0].geometry.location.lat;
            this.lugar.lng = result.json().results[0].geometry.location.lng;
            this.lugar.plan = false;
            this.lugar.active = true;
            this.lugar.email = this.autorizacionService.getUser().currentUser.email;
            this.lugar.items = this.itemList;
            if(this.id != 'new'){
                this.lugaresService.editarLugar(this.lugar);
                this.msgInfo = 'Negocio editado con éxito!' 
            } else {
                this.lugar.id = Date.now();
                this.lugaresService.guardarLugar(this.lugar); // via sockets
                this.msgInfo = 'Negocio guadardo con éxito!' 
                }
            this.lugar = {};
            this.itemList = [];
            });
    }
    seleccionarDireccion(result) {
        let addressComponents = result.address_components
        console.log(addressComponents);
        let addressParams: any = {}
        for (let i = 0, len = addressComponents.length; i < len; i++) {
          const type = addressComponents[i].types[0].toString()
          switch (type) {
            case 'street_number':
              addressParams.street_number = addressComponents[i].long_name
              break
            case 'route':
              addressParams.route = addressComponents[i].long_name
              break
            case 'neighborhood':
              addressParams.neighborhood = addressComponents[i].long_name
              break;
            case 'administrative_area_level_1':
              addressParams.level_1 = addressComponents[i].long_name
              break;
            case 'administrative_area_level_2':
              addressParams.level_2 = addressComponents[i].long_name
              break;
            case 'locality':
              addressParams.locality = addressComponents[i].long_name
              break
            case 'country':
              addressParams.country = addressComponents[i].long_name
              break
          }
        }
        this.lugar.calle = addressParams.street_number != undefined ? addressParams.street_number : "";
        if(this.lugar.calle.length > 0)
            this.lugar.calle += addressParams.neighborhood != undefined ? ", " + addressParams.neighborhood : '';
        else
            this.lugar.calle = addressParams.neighborhood != undefined ? addressParams.neighborhood : '';
        if(this.lugar.calle.length > 0)
            this.lugar.calle += addressParams.route != undefined ? ", " + addressParams.route : '';
        else
            this.lugar.calle = addressParams.route != undefined ? addressParams.route : '';
            if(this.lugar.calle.length > 0)
            this.lugar.calle += addressParams.level_1 != undefined ? ", " + addressParams.level_1 : '';
        else
            this.lugar.calle = addressParams.level_1 != undefined ? addressParams.level_1 : '';

        this.lugar.ciudad = addressParams.locality != undefined ? addressParams.locality : '';
        
        if(this.lugar.ciudad.length == 0)
            this.lugar.ciudad = addressParams.level_2 != undefined ? addressParams.level_2 : '';
        this.lugar.pais = addressParams.country != undefined ? addressParams.country : '';
      }
}
