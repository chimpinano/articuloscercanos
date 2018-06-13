import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})

export class DetalleComponent {
    id = null;
    /*lugares : any = [
        {id: 1, plan: 'pay', cercania:1, distancia:1, active: true, nombre : 'Floreria la gardenia', description : 'Description de este negocio 1'},
        {id: 2, plan: 'free', cercania:2, distancia:1.8, active: true, nombre : 'Donas la pasadita', description : 'Description de este negocio 2'},
        {id: 3, plan: 'pay', cercania:2, distancia:4, active: true, nombre : 'Veterinaria huellitas felices', description : 'Description de este negocio 3'},
        {id: 4, plan: 'free', cercania:3, distancia:10, active: false, nombre : 'Suchi Suhiroll', description : 'Description de este negocio 4'}
      ];*/
    
    lugar: any = {};
    constructor(private route : ActivatedRoute, private lugaresService: LugaresService){
        //snapshot: Es un método que tiene la interface de ActivatedRoute, este permite obtener la información de la ruta (url) actual. También se puede obtener los valores del params
        /*console.log(this.route.snapshot.params['id']);
        console.log(this.route.snapshot.queryParams['action']);
        console.log(this.route.snapshot.queryParams['referer']);*/
        this.id = this.route.snapshot.params['id'];
        this.lugar = this.lugaresService.buscarLugar(this.id);
    }
    /*buscarLugar(){
        // al final nos devuelve un array y en caso de que no encuentre nada me regresa un Null esta parte es muy propio de javascript(osea no es de angular)
        return this.lugares.filter((lugar) => { return lugar.id == this.id})[0] || null;
    }*/
}
