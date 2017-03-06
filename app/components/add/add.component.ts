// ====== ariel duarte ======
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Lyric } from '../../model/lyric';
import { LyricService } from '../../services/lyric.service';

import {Observable} from 'rxjs/Rx';

@Component({
    templateUrl: 'components/add/add.html',
    providers: [ LyricService ]
})

export class AddComponent implements OnInit{
  public newLyric: Lyric;
  public title = "";
  public id = "";
  public nameParam = "";
  public artistParam = "";
  public albumParam = "";
  public countryParam = "";
  public yearParam = 0;
  public lyricOrigParam = "";
  public lyricTransParam = "";
  public errorMessage:any;

  constructor(private _lyricService: LyricService,
              private _router: Router,
              private _actroute: ActivatedRoute){

  }

  onSubmit(){
    // Variable to hold a reference of addComment/updateComment
    let lyricOperation:Observable<Lyric[]>;
    if(this.id === undefined){
      lyricOperation = this._lyricService.addLyric(this.LyricDocumentBody(this.newLyric));
    }else{
      lyricOperation = this._lyricService.editLyric(this.id, this.LyricDocumentBody(this.newLyric));
    }
    // Subscribe to observable
    lyricOperation.subscribe(
      response => {
         console.log("Add lyric response: " + JSON.stringify(response.lyric));
         if(!response.lyric){
           alert("Error on Server to add lyrics");
         }else{
           // Empty model
           this.newLyric = new Lyric(this.id, this.nameParam, this.artistParam, this.albumParam,  this.yearParam, this.countryParam, this.lyricOrigParam, this.lyricTransParam);
           // Switch editing status
           this._router.navigate(["/details/"+response.lyric._id]);
         }
      },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(error);
          alert("Error on Server to add lyrics");
        }
        this._router.navigate(["/home"]);
        });
  }

LyricDocumentBody(_newLyric: Lyric): Object {
  let body = {
    "name" : _newLyric.name,
    "artist" : _newLyric.artist,
    "album" : _newLyric.album,
    "year" : _newLyric.year,
    "country" : _newLyric.country,
    "lyricOrig" : _newLyric.lyricOrig,
    "lyricTrans" : _newLyric.lyricTrans
  }
  return body;
}

ngOnInit(){
  this._actroute.params.forEach((params: Params) => {
    this.id = params['id'];
    this.newLyric = new Lyric(this.id, this.nameParam, this.artistParam, this.albumParam,  this.yearParam, this.countryParam, this.lyricOrigParam, this.lyricTransParam);
    if(this.id === undefined){
      this.title = "Add Lyric.";
    }else{
      this.title = "Edit Lyric.";
      this.getLyricById(this.id);
    }
  });
}

  getLyricById(id: string){
    this._lyricService.getLyricById(id)
    .subscribe(
        //Bind to view
        results => {
          this.newLyric = results.lyric;
        },
      error => {
        // Log errors if any
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(error);
          alert("Error on Server");
        }
        this._router.navigate(["/home"]);
      });
  }
}
