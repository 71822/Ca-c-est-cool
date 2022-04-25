import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Login } from '../login';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})

export class ConnectionComponent implements OnInit {

  title = 'Connexion';

  logForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private authentificationService: AuthentificationService) { }


  ngOnInit(): void {
    
  }

  validForm() {
    let data: Login = {
      email: this.logForm.value.email,
      password: this.logForm.value.password,
    }

    let that = this
    this.userService.connection(data).subscribe({
      next(ret: any) {

        that.router.navigate(['/user']);
        for (const property in ret) {
          if (property == 'token') {
            localStorage.setItem('ACCESS_TOKEN', ret[property]);
            console.log(ret[property])
          }
        };
      },
      error(err) {
        alert(err);
      }
    })
  }

}