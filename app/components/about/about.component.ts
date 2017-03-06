import {Component} from '@angular/core';


@Component({
    templateUrl: 'components/about/about.html'
})

export class AboutComponent {
  public autor:string;
  public anio:number;

   constructor(){
       this.anio = 2016;
       this.autor = "Ariel Duarte";
   }
}
