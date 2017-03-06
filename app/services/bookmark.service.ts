// ====== ariel duarte ======
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import Model
import { Bookmark } from "../model/bookmark";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BookmarkService {
  // Resolve HTTP using the constructor
  constructor (private _http: Http) {}

    // private instance variable to hold base url
   private serverUrl = 'https://heroku-api-rest.herokuapp.com/bookmarks';
   // Local server
   //private serverUrl = 'http://localhost:8080/bookmarks';

   // Fetch all existing Bookmarks
   getBookmarks(){
         // ...using get request
         return this._http.get(this.serverUrl)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error to get bookmarks'));
     }

     addBookmark(body: Object): Observable<Bookmark[]>{
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option

      return this._http.post(this.serverUrl, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error to add bookmark')); //...errors if any
     }

     editBookmark(id:string, body: Object): Observable<Bookmark[]>{
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option

      return this._http.put(this.serverUrl+"/"+id, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error to edit bookmark')); //...errors if any
     }

     deleteBookmark(id:string): Observable<Bookmark[]>{
      return this._http.delete(`${this.serverUrl}/${id}`) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw('delete bookmark')); //...errors if any
     }

     getBookmarkById(id: string){
           // ...using get request
           return this._http.get(this.serverUrl +'/'+id)
                          // ...and calling .json() on the response to return data
                           .map((res:Response) => res.json())
                           //...errors if any
                           .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       }

       getBookmarkByName(name: string){
             // ...using get request
             return this._http.get(this.serverUrl +'/search/findByName?name='+name)
                            // ...and calling .json() on the response to return data
                             .map((res:Response) => res.json())
                             //...errors if any
                             .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
         }

         // Fetch all existing Bookmarks
         getAllBookmarksPageable(){
               // ...using get request
               return this._http.get(this.serverUrl +'/search/findBySearches?term=&page=0&size=10')
                              // ...and calling .json() on the response to return data
                               .map((res:Response) => res.json())
                               //...errors if any
                               .catch((error:any) => Observable.throw(error.json().error || 'Server error to get bookmarks'));
           }

         getBookmarksBySearches(term: string, page: number){
               // ...using get request
               return this._http.get(this.serverUrl +'/search/findBySearches?term='+term+'&page='+page+'&size=10')
                              // ...and calling .json() on the response to return data
                               .map((res:Response) => res.json())
                               //...errors if any
                               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        }
}
