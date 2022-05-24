import { Injectable } from '@angular/core';
import { User } from './user';
import { catchError, Observable, tap, map, throwError, of, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { AuthentificationService } from './authentification.service';
import { Users } from './classes/user';
import { Post } from './post';
import { Posts } from './classes/post';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  users: Users[];
  posts: Posts[];
  token:string ="";
  // currentUserId:number = -1;

  urlBase = "http://localhost:3000/api"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient, private authentificationService: AuthentificationService) { }

  // isCurrentUserId(id:number):boolean{
  //   return this.currentUserId == id;
  // }


  connection(data: User) {
    return this.http.post(this.urlBase + "/signin", data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  inscriptionUser(data: User) {
    return this.http.post(this.urlBase + '/signup', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  addPost(data: Posts) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authentificationService.tokenValue()}`
    })
    return this.http.post(this.urlBase + '/createPost', data, {headers:headers})
      .pipe(
        catchError(this.handleError)
      )
  }

  updatePost(id, updatePostData:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.put(this.urlBase + "/updatePost/" + id, updatePostData.pouce, {headers:headers});
  }

  deleteCompte(id:number):Observable<any>{
    console.log('deleteCompte id : ' + id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.delete(this.urlBase + "/membreDelete/" + id, {headers:headers});
  }

  updateAccount(id:any, data:any):Observable<any>{
    console.log('USER-SERVICE updateAccount - upUser : '+id);
    console.log('USER-SERVICE updateAccount - upUser.id : '+data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.put(this.urlBase + "/membreUpdate/" + id, data, {headers:headers});
  }

  getArticle(id:number):Observable<any>{
    console.log('FONCTION GETARTICLE : ' + id);
      return this.http.get(this.urlBase + "/article/"+id);
  }


  getPosts(): Observable<Array<Posts>>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authentificationService.tokenValue()}`
    })
    return this.http.get<Array<Posts>>(this.urlBase + '/multiplePosts', {headers:headers});
  }

  getPost(id:number):Observable<any>{
    console.log('FONCTION GETPOST : ' + id);
      return this.http.get(this.urlBase + "/post/"+id);
  }


  getUsers(): Observable<Array<User>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authentificationService.tokenValue()}`
    })
    return this.http.get<Array<User>>(this.urlBase + '/multipleMembre', {headers:headers});
  }

  getUser(id:number):Observable<any>{
  console.log('FONCTION GETUSER : ' + id);
    return this.http.get(this.urlBase + "/membre/"+id);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => {
      error.error.mess || error.error;

    })
  }

}
