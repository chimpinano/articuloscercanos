import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[resaltar]'
  })
export class ResaltarDirective implements OnInit{
    constructor(private elRef: ElementRef, private renderer: Renderer2){
    }
    @Input('resaltar') plan : string = '';
    ngOnInit(){
        if(this.plan){
            this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
			this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', 'bold');
        }
    }
}


  