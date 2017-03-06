// ====== ariel duarte ======
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import Model
import { Lyric } from "../model/lyric";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class LyricService {
  // Resolve HTTP using the constructor
  constructor (private _http: Http) {}

    // private instance variable to hold base url
   private serverUrl = 'https://deathlyric-api.herokuapp.com/api/';
   // Local server
   //private serverUrl = 'http://localhost:8080/api';

   // Fetch all existing Bookmarks
   getLyrics(){
         // ...using get request
         return this._http.get(this.serverUrl + 'lyrics')
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error to get lyrics'));
     }

     addLyric(body: Object): Observable<Lyric[]>{
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option

      return this._http.post(this.serverUrl + 'lyric/add', body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error to add lyric')); //...errors if any
     }

     editLyric(id:string, body: Object): Observable<Lyric[]>{
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option

      return this._http.put(this.serverUrl + 'lyric/edit/' + id, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error to edit lyric')); //...errors if any
     }

     deleteLyric(id:string): Observable<Lyric[]>{
      return this._http.delete(this.serverUrl + 'lyric/delete/' + id) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw('delete lyric')); //...errors if any
     }

     getLyricById(id: string){
           // ...using get request
           return this._http.get(this.serverUrl + 'lyric/' + id)
                          // ...and calling .json() on the response to return data
                           .map((res:Response) => res.json())
                           //...errors if any
                           .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       }

       getLyricByName(name: string){
             // ...using get request
             /*return this._http.get(this.serverUrl + 'lyric/search/findByName?name=' + name)
                            // ...and calling .json() on the response to return data
                             .map((res:Response) => res.json())
                             //...errors if any
                             .catch((error:any) => Observable.throw(error.json().error || 'Server error'));*/
         }

         // Fetch all existing Bookmarks
         getAllLyricsPageable(){
               // ...using get request
               /*return this._http.get(this.serverUrl + 'lyric/search/findBySearches?term=&page=0&size=10')
                              // ...and calling .json() on the response to return data
                               .map((res:Response) => res.json())
                               //...errors if any
                               .catch((error:any) => Observable.throw(error.json().error || 'Server error to get Lyrics'));*/
           }

         getLyricsByFilter(term: string, page: number){
               // ...using get request
               /*return this._http.get(this.serverUrl +'lyric/search/findByFilters?term='+term+'&page='+page+'&size=10')
                              // ...and calling .json() on the response to return data
                               .map((res:Response) => res.json())
                               //...errors if any
                               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));*/
        }
}
