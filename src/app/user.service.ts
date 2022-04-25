import { Injectable } from '@angular/core';
import { User } from './user';
import { catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Login } from './login';
import { AuthentificationService } from './authentification.service';
import { FormsModule } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    urlBase = "https://reseau.jdedev.fr/api/user"
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    httpOptionsToken = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `bearer ${this.authentificationService.tokenValue()}`
        })
    };

    constructor(private http: HttpClient, private authentificationService: AuthentificationService) { }

    connection(login: Login) {
        return this.http.post(this.urlBase + "/connect", login, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }

    inscriptionUser(inscription: User) {
        return this.http.post(this.urlBase, inscription, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            )
    }


    getUserList() {
        let that = this
        return this.http.get(this.urlBase, this.httpOptionsToken).pipe(
            //tap((userList) => console.table(userList)),
            catchError(error => this.handleError(error))
        );
    }


    // private log(response: any) {
    //     console.table(response);
    // }


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