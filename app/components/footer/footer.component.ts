import {Component} from '@angular/core';


@Component({
    selector: 'footer',
    templateUrl: 'components/footer/footer.html'
})

export class FooterComponent {
  public autor:string;
  public anio:number;

   constructor(){
       this.anio = 2017;
       this.autor = "Ariel Duarte";
   }
}
