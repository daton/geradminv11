import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() progreso: number = 50;
  @Input("nombre") leyenda: string = "leyenda";

  @ViewChild('txtProgress') txtProgress: ElementRef

  @Output("actualizaValor")
  cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log("Leyenda " + this.leyenda);
    console.log("progreso " + this.progreso);
  }

  ngOnInit() {}

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

  onChange(newValue: number) {

    //let elementHTML:any=document.getElementsByName("progreso")[0];

    console.log(newValue);
    if(newValue>=100){
     this.progreso=100;
    }else if(newValue>=0){
      this.progreso=0;
    }else{
       this.progreso=newValue;
    }
   //elementHTML.value=this.progreso;
   this.txtProgress.nativeElement.value=this.progreso;
    this.cambioValor.emit(this.progreso);
  }
}
