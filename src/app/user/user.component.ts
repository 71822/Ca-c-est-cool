import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { catchError, Observable, of, tap, map } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userListe: User[] = [];
  email: any = "";
  pseudo: any = "";

  urlBase = "https://reseau.jdedev.fr/api/user"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `bearer ${this.authentificationService.tokenValue()}`
    })
  };

  constructor(private http: HttpClient, private authentificationService: AuthentificationService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  getUsers() {
    let userListe: User[] = [];
    this.userService.getUserList().subscribe({
      next(ret: any) {
        for (const property in ret) {
          userListe = ret[property];
          console.log(userListe)
        };
      },
      error(err) {
        alert(err);
      }
    })
  }


  seDeconnecter() {
    this.authentificationService.seDeconnecter();
    this.router.navigateByUrl('/connection');
  }

}
