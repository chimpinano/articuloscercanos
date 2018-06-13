import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state, style, transition,animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { AutorizacionService } from '../services/autorizacion.service';
import { GeolocationService } from '../services/geolocation.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
})

export class LugaresComponent {
  title = 'Donde lo venden';
  lat:number = 0;
  lng:number = 0;
  lugares = null;
  lugares2 = null;
  article:String = null;
  loggedIn = false;
 
  constructor(private autorizacionService: AutorizacionService, 
    private lugaresService: LugaresService, 
    private geolocationService: GeolocationService){
      this.autorizacionService.isLogged()
      .subscribe((result)=>{
        if(result && result.uid){
            this.loggedIn = true;
            this.lugaresService.getLugares()
            .subscribe(lugares => {
                this.lugares2 = lugares;
                var me = this;
                this.lugares = Object.keys(me.lugares2).map((key) => { 
                    if(me.lugares2[key].email == this.autorizacionService.getEmail()){
                      return me.lugares2[key];
                    }
                    else
                      return {};
                  });
                }, error => {
                  console.log(error);
                  this.lugares = null;
            });
        }else{
              this.loggedIn = false;
              lugaresService.getLugares()
                .subscribe(lugares => {
                  this.lugares = lugares;//.json()
                  var me = this;
                  this.lugares = Object.keys(me.lugares).map((key) => {
                    return me.lugares[key]
                  }); // opt#2
                }, error => {
                  console.log(error);
                  this.lugares = null;
              });
          }
      }, (error)=>{
          this.loggedIn = false;
      });
      this.geolocationService.getLocation().subscribe((data)=>{
        this.lat = +data.latitude;
        this.lng = +data.longitude;
      });
  }
  public getLugares(){
      if(!this.loggedIn){
        this.lugaresService.getLugares()
        .subscribe(lugares => {
          this.lugares = lugares;//.json()
          var me = this;
          this.lugares = Object.keys(me.lugares).map((key) => me.lugares[key]); // opt#2
        }, error => {
          console.log(error);
          this.lugares = null;
        });
      }else{
        this.lugaresService.getLugares()
        .subscribe(lugares => {
            this.lugares2 = lugares;
            var me = this;
            this.lugares = Object.keys(me.lugares2).map((key) => { 
                if(me.lugares2[key].email == this.autorizacionService.getEmail())
                  return me.lugares2[key];
                else
                  return {};
              });
            }, error => {
              console.log(error);
              this.lugares = null;
            });
      }
  }
  public searchArticles(pArcticle){
    if(pArcticle.length > 0){
      this.lugaresService.getLugares()
      .subscribe(lugares => {
        this.lugares2 = lugares;
        var me = this;
        this.lugares = Object.keys(me.lugares2).map((key) => { 
          var exist = false;
          if (me.lugares2[key].items !== undefined){
              me.lugares2[key].items.forEach(function(data){
              if(data.name.toLowerCase() == pArcticle.toLowerCase() || (data.name.toLowerCase().indexOf(pArcticle.toLowerCase()) > -1)){
                exist = true;
              }
            });
          }
          if (exist)
            return me.lugares2[key];
          else
            return {};
        });
      }, error => {
        console.log(error);
        this.lugares = null;
      });
    }
  }
  public pinLocation(arcticle){
    let lat2 = arcticle.split('|')[0];
    let lng2 = arcticle.split('|')[1];
    this.lugaresService.getLugares()
    .subscribe(lugares => {
      this.lugares2 = lugares;
      var me = this;
      this.lugares = Object.keys(me.lugares2).map((key) => { 
      if(me.lugares2[key].lat == lat2 && me.lugares2[key].lng == lng2)
        return me.lugares2[key];
      else
        return {};
      });
    }, error => {
      console.log(error);
      this.lugares = null;
    });
  }
}
