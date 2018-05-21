import { Component, OnInit } from '@angular/core';
import { Estatus } from '../../modelo/estatus';
import { Globales } from '../../modelo/globales';
import { Plantillaexamen } from '../../modelo/plantillaexamen';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from '../../modelo/pregunta';
import { Alumno } from '../../modelo/alumno';

@Component({
  selector: 'app-examensitos',
  templateUrl: './examensitos.component.html',
  styles: []
})
export class ExamensitosComponent implements OnInit {

  oculta: boolean = true;
  noMostrarBoton:boolean=true;
  empezarEstaOculto:boolean=false;
  public alumno: Alumno={
  };
  mostrar:boolean=true;
  ocultarResultado=true;
  sinChecar:boolean=false;
  //Para el titulo del examen
  public examenesMateriaNombre:string;
  public examenesNombre:string;
  selectedValue: string;
public buenas:number=0;
public calificacion:number=0;
  plantillaexamensito:Plantillaexamen={

  }
  public preguntas:Pregunta[];
 public numeroPreguntas:number;
  public  indicePegunta:number=0;
  public contadorPregunta:number=1;
  public preguntaActual:Pregunta={

  }
  public hayIntroduccion:boolean=false;

  public introduccion:string;

  public estatus:Estatus={

  }

  constructor(public http:HttpClient) { }


  ngOnInit() {
/*
    this.alumno = Globales.alumno;
    this.http.get<Alumno>(Globales.urlBase+"/alumno/"+
    this.alumno.email+"/"+this.alumno.password).subscribe(respuesta => { this.alumno = respuesta });
    setTimeout(() => {
      console.log("Hay que miedo"+this.alumno.examenes[0].materia.nombre);
         this.examenesMateriaNombre=this.alumno.examenes[0].materia.nombre;
         this.examenesNombre=this.alumno.examenes[0].nombre;

         //Ocultamos el boton de empezar hasta que se cargue el esquema compelto de este alumno
         this.noMostrarBoton=false;

    }, 1500)

    */

  }

  empezarExamen(){
    this.examenesMateriaNombre=Globales.examenesMateriNombre;
    this.examenesNombre=Globales.examenesNombre;
    //hay 
    let x=2;

    console.log("materia a realizar examen "+this.examenesMateriaNombre);

   let  estaUrl:string=Globales.urlBase+"/plantillaexamen/"+
    this.examenesMateriaNombre+"/"+this.examenesNombre;
    console.log("La es esta  url"+estaUrl);
    this.http.get<Plantillaexamen>(estaUrl).subscribe(respuesta =>
       { this.plantillaexamensito = respuesta });
    setTimeout(() => {
     // console.log("Hay que miedosoooo"+JSON.stringify(this.plantillaexamensito));

   
        this.mostrar=false;
        if(this.plantillaexamensito.introduccion!=null) this.hayIntroduccion=true;

      this.preguntaActual=this.plantillaexamensito.preguntas[0];
      this.numeroPreguntas=this.plantillaexamensito.preguntas.length;
     this.introduccion= this.plantillaexamensito.introduccion;
     console.log("Estya es la introduccionj "+this.plantillaexamensito.introduccion);

      //Ocultamos el boton emepzar examen, ya para que lo queremos!
      this.noMostrarBoton=true;
        
    }, 1200);
  }



  checarRespuesta() {
    this.oculta = false;
  }

  siguiente(){
    //Checamos antes   si es correcta ANTES DE PASAR A LA OTRA
  if(this.plantillaexamensito.preguntas[this.indicePegunta].opciones[this.selectedValue].acierto){
    console.log("CORRECTA");
    this.buenas++;
  }
   else console.log("INCORRECTA");
//iNCREMENTAMOS LA OTRA A LA  QUE SE VA A PASAR SIGUIENTE
    this.indicePegunta++;
    console.log("Valor antes de pasar a la otra...."+this.selectedValue);

    this.contadorPregunta++;
    this.selectedValue = null; 
    if(this.indicePegunta<this.plantillaexamensito.preguntas.length){
   
    this.preguntaActual=this.plantillaexamensito.preguntas[this.indicePegunta];
    }else{

      //Ya que no hay mas preguntas!!!???
      this.mostrar=true;
      this.ocultarResultado=false;
      this.empezarEstaOculto=true;
 
      this.calificacion=(this.buenas/this.indicePegunta)*10;
      this.alumno.email=Globales.alumno.email;
      this.alumno.password=Globales.alumno.password;


      this.alumno={
   email:Globales.alumno.email,
   password:Globales.alumno.password,
   examenes:[
     {
      
        "materia": {
            "nombre":this.examenesMateriaNombre
        },
        "nombre":this.examenesNombre,
        "calificacion": this.calificacion,
     }
   ]
      }
      //Enviamos a travez de http
      this.http.post<Estatus>(Globales.urlBase+'/alumno/examen', this.alumno).subscribe(respuesta=>this.estatus=respuesta)
      setTimeout(() => { console.log("Mensaje del servidor"+this.estatus.success)},1200)

    }

  }

}
