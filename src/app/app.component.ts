import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isIn = false;   // store state
  loggedIn = false;
  //email :String = '';
  loggedUser:any = null;
  constructor(private autorizacionService:AutorizacionService){
    this.autorizacionService.isLogged()
        .subscribe((result)=>{
          if(result && result.uid){
            this.loggedIn = true;
            setTimeout(()=>{
              //this.email = autorizacionService.getEmail();
              this.loggedUser = autorizacionService.getUser().currentUser.email;
            }, 500);
          }else{
            this.loggedIn = false;
          }
        }, (error)=>{
          this.loggedIn = false;
        })
  }
  logout(){
    this.autorizacionService.logout();
  }
  toggleState() {
    let bool = this.isIn;
    this.isIn = bool === false ? true : false; 
  }
}
