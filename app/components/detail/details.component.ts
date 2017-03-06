// ====== ariel duarte ======
import { Component, OnInit, Pipe} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Lyric } from '../../model/lyric';
import { LyricService } from '../../services/lyric.service';


@Component({
    templateUrl: 'components/detail/details.html',
    providers: [ LyricService ]
})

export class DetailsComponent implements OnInit{
  public idParam = "";
  public title = "";
  public lyric:Lyric;
  public errorMessage:any;
  public darkLyric:string;
  public someHtml = `<a href="#" onClick="alert(document.cookie);">click to see the awesome</a>`;

  constructor(private _lyricService: LyricService,
              private _router: Router,
              private _actroute: ActivatedRoute){}

  ngOnInit(){
    this._actroute.params.forEach((params: Params) => {
      this.idParam = params['id'];
    });

    this.getBookmark(this.idParam);
  }

  getBookmark(id: string){
    this._lyricService.getLyricById(id)
    .subscribe(
        results => {
          this.lyric = results.lyric;
          if(this.lyric){
              this.title = this.lyric.name;
              var art = this.lyric.artist.toLowerCase();
              var subl = art.substring(0,1);
              var linkhtml = subl + "/" +art.replace(" ", "") + ".html";
              this.darkLyric = "http://www.darklyrics.com/"+ linkhtml;
          }else{
            this._router.navigate(["/home"]);
          }
        },
      error => {
        this.errorMessage = <any>error;
        if(this.errorMessage != null){
          console.log(error);
          alert("Error to get lyrics!");
        }
        this._router.navigate(["/home"]);
      });
  }


}
