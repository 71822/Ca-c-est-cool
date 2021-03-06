import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Users } from '../classes/user';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  //id:number = localStorage["id"];
  idAcharger: number = 0;
  users: Array<User> = [];
  user: Array<User> = [];
  unUser:User;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, public auth: AuthentificationService) {
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

  ngOnInit(): void {
  }

  delete(){
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
        console.log(that.idAcharger);

        that.userService.deleteCompte(that.idAcharger).subscribe(retour => {that.router.navigate(["/inscription"]);});
      }
    });
  }

  updateAccount(){
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });
    this.router.navigate([`/user/updateAccount/${that.idAcharger}`]);
  }

  addPost(){
    let that = this;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
      }
    });
    this.router.navigate([`/user/addPost/${that.idAcharger}`]);
  }

  logout(){
    this.auth.seDeconnecter();
  }



}
