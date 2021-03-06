import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../classes/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})

export class UpdateAccountComponent implements OnInit {
  prenom="";
  id = localStorage["id"];
  idPage:number= 0;
  idAcharger: number = 0;
  updateAccount: FormGroup;
  user: Users = {
    nom: '',
    prenom: '',
    email: '',
    motPasse: '',
    photo: '',
    id: -1
  };

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private formModule: FormsModule, private route: ActivatedRoute) {
    this.updateAccount = this.formBuilder.group({
      nom: "" as string,
      prenom: "" as string,
      email: "" as string,
      motPasse: "" as string,
      photo: "" as string
    });

    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });

    this.userService.getUser(that.idAcharger).subscribe({
      next(ret) {
        let data;
        for(let use of Object.keys(ret)){
          data = ret[use];
        }
        that.user = data;
      },
      error(err){
        console.log(err);
      }
    });
  }




  validForm() {
    let dataUpdate: Users = {
      id: this.idAcharger,
      nom: this.updateAccount.value.nom,
      prenom: this.updateAccount.value.prenom,
      email: this.updateAccount.value.email,
      motPasse: this.updateAccount.value.motPasse,
      photo: this.updateAccount.value.photo
    };
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });
    this.userService.updateAccount(that.idAcharger, dataUpdate).
    subscribe(retour => {
      let that = this;
      that.route.params.subscribe({
        next(val) {
          that.idAcharger = parseInt(val["id"])
          that.router.navigate([`/user/${that.idAcharger}`]);
        }
      });
    });
  }

  ngOnInit(): void {
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });
    this.userService.getUser(this.idAcharger).subscribe({
      next(ret) {
        console.log(ret);
        let data="";
        let that=this;
        for(let use of Object.keys(ret)){
          data = ret[use];
        }
        that.user = data;
        that.updateAccount.setValue({
          nom:that.user.nom,
          prenom:that.user.prenom,
          email:that.user.email,
          motPasse:that.user.motPasse,
          photo:that.user.photo
        })
      },
      error(err){
        console.log(err);
      }
    });
  }

  retourCompte(){
    let that = this;
    let idPage = 0;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
        idPage = that.idAcharger;
      }
    });
    this.router.navigate([`/user/${idPage}`])
  }


}




