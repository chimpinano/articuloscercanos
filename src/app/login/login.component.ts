import { Component } from '@angular/core';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  loginArr:any = {};
  
  constructor(private autorizacionService: AutorizacionService){
  }

  login(email,password){
    this.autorizacionService.login(this.loginArr.email,this.loginArr.password);
  }
  
  facebookLogin(){
    this.autorizacionService.facebookLogin();
  }

}
