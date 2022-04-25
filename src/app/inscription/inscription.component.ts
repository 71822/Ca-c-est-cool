import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  title = 'Inscription';

  logForm = this.formBuilder.group({
    avatar: '',
    pseudo: '',
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private formModule: FormsModule) { }

  ngOnInit(): void {
  }

  validForm() {
    // console.log(this.logForm.value)
    let data: User = {
      avatar: this.logForm.value.avatar,
      pseudo: this.logForm.value.pseudo,
      email: this.logForm.value.email,
      password: this.logForm.value.password,
    }

    let that = this
    this.userService.inscriptionUser(data).subscribe({
      next(ret) {
        that.router.navigate(["/connection"])
      },
      error(err) {
        alert(err);
      }
    })

  }

}