import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/Forms';

import { AgmCoreModule } from '@agm/core';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contar-clicks.directive';

import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalleComponent } from './detalle/detalle.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LugaresService } from './services/lugares.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { CrearComponent } from './crear/crear.component';
import { HttpModule } from '@angular/http';
import { LinkifystrPipe } from './pipes/linkifystr.pipe';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AutorizacionService } from './services/autorizacion.service';
import { MyGuard } from './services/my-guard.service';

import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { GeolocationService } from './services/geolocation.service';

import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UploadService } from './services/upload.service';

const AppRutes: Routes = [
  // para q sepa angular que hacer cuando no haya ningun segmento(/) despues del nombre del dominio
  { path:'', component: LugaresComponent },
  { path:'lugares', component: LugaresComponent },
  { path:'detalle/:id', component: DetalleComponent },
  { path:'contacto', component: ContactoComponent },
  { path:'crear/:id', component: CrearComponent, canActivate:[MyGuard] },
  { path:'login', component: LoginComponent },
  { path:'registro', component: RegistroComponent }
];

export const firebaseConfig = {
  apiKey: "AIzaSyDoYbSJPommWgFooOpqsIRs9f9JX6RM3Rg",
  authDomain: "donde-lo-venden.firebaseapp.com",
  databaseURL: "https://donde-lo-venden.firebaseio.com",
  projectId: "donde-lo-venden",
  storageBucket: "donde-lo-venden.appspot.com",
  messagingSenderId: "256227776032"  
};

@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-SQPOg7epsoCUeGOzw6M78GBsqUpv8D4'
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [
    LugaresService,
    AutorizacionService,
    MyGuard,
    GeolocationService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
