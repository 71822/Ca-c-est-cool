import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { catchError, Observable, of, tap, map } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../user';
import { Users } from '../classes/user';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: Array<User> = [];

  constructor(private userService: UserService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
  }


  // seDeconnecter() {
  //   this.authentificationService.seDeconnecter();
  //   this.router.navigateByUrl('/connection');
  // }

}
