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
  logForm = this.formBuilder.group({
    email: '',
    motPasse: ''
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private authentificationService: AuthentificationService) { }

  ret?: any;

  ngOnInit(): void {

  }

  validForm() {
    let data: Login = {
      email: this.logForm.value.email,
      motPasse: this.logForm.value.motPasse,
    }

    let that = this
    this.userService.connection(data).subscribe({
      next(ret: any) {

          if (ret.message.pass == true) {
            localStorage.removeItem('ID');
            localStorage.setItem('ACCESS_TOKEN', ret.message.token);
            localStorage.setItem('id', ret.message.id);
            console.log(localStorage);
            that.router.navigate([`/user/${ret.message.id}`]);


          }else if(ret.message.pass == false){
            console.log(ret.message);
          }
      },
      error(err) {
        alert(err);
      }
    })
  }


}
