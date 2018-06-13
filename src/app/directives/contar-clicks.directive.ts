import { Directive, HostListener, HostBinding } from "@angular/core";
@Directive({
  selector : 'li[contar-clicks]'  
})
export class ContarClicksDirective{
    clickN = 0;
    @HostBinding('style.opacity') opacity : number = 0.1;
    @HostListener('click', ['$event.target']) onClick(btn){
        console.log('a', btn, "Número de clicks:", this.clickN++);
        this.opacity += .1;
    }
}
