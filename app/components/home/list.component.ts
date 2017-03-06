// ====== ariel duarte ======
import { Component, OnInit } from '@angular/core';
import { Lyric } from '../../model/lyric';
import { LyricService } from '../../services/lyric.service';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'list',
    templateUrl: 'components/home/list.html',
    providers: [ LyricService ]
})

export class ListComponent implements OnInit{
  public lyric:Lyric;
  public lyrics:Lyric[];
  public loading:string;
  public box:string;
  public navPages:string;
  public searchTerm:string;
  public currentPage: number;
  public totalPages: number;
  public totalRealPages: number;
  public pages:number[] = [];
  public errorMessage:any;
  public someHtml = `<a href="#" onClick="alert(document.cookie);">click to see the awesome</a>`;
  

   constructor(private _lyricService: LyricService, private _router: Router){
     this.searchTerm = "";
     this.box = 'show';
     this.navPages = 'hide';
     this.currentPage = 0;
   }

  getLyrics(){
    this.loading = 'show';
    this._lyricService.getLyrics()
    .subscribe(
        //Bind to view
        results => {
          if(results.lyrics.length > 0){
            this.lyrics = results.lyrics;
            this.loading = 'hide';
            //console.log("Data mierda: " + JSON.stringify(this.lyrics));
          }


        },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(error);
          alert("Error to get lyrics!");
        }

      });
  }

  ngOnInit(){
    this.getLyrics();
  }

  deleteLyric(id:string){
    this._lyricService.deleteLyric(id)
    .subscribe(
        response => {
          this._router.navigate(["/home"]);
          this.getLyrics();
        },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          this._router.navigate(["/home"]);
          this.getLyrics();
          alert("Error to get lyrics!");
        }
      });
  }

  /*Pageable control*/
  previous(){
    if(this.currentPage+1 > 1){
      this.currentPage--;
    }
  }

  next(){
    if(this.currentPage+1 < this.totalPages){
      this.currentPage++;
    }
  }
}
