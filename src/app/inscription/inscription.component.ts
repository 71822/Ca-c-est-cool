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
  logForm = this.formBuilder.group({
    id:1,
    nom: '',
    prenom: '',
    email: '',
    motPasse: '',
    photo:''
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private formModule: FormsModule) { }

  ngOnInit(): void {
  }

  validForm() {
    let data: User = {
      id: -1,
      nom: this.logForm.value.nom,
      prenom: this.logForm.value.prenom,
      email: this.logForm.value.email,
      motPasse: this.logForm.value.motPasse,
      photo: this.logForm.value.photo,
    }
    console.log(data);


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
