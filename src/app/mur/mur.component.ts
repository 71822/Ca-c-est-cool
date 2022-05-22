import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Posts } from '../classes/post';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mur',
  templateUrl: './mur.component.html',
  styleUrls: ['./mur.component.css']
})
export class MurComponent implements OnInit {
  idAcharger: number = 0;
  posts: Array<Posts> = [];

  constructor(private userService: UserService, private route: ActivatedRoute, public auth: AuthentificationService) {
    let that = this;
    let idPage = 0;
    this.route.params.subscribe({
      next(val) {
        that.idAcharger = parseInt(val["id"])
        idPage = that.idAcharger;
      }
    });

    this.userService.getPosts().subscribe({
      next(ret) {
        let data;
        for(let posts of Object.keys(ret)){
          data = ret[posts];
        }
        that.posts = data;
      },
      error(err) {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
  }

  changementDePage = function () {
    this.router.navigate(['/user/']);
 };
}
