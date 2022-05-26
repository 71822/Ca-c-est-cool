import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Post } from '../post';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mur',
  templateUrl: './mur.component.html',
  styleUrls: ['./mur.component.css']
})


export class MurComponent implements OnInit {
  id:string;
  idAcharger: number = 0;
  posts: Array<Post> = [];
  comments: Array<Comment> = [];
  postById: Array<Post> = [];
  userId?:number;
  idItem:number;
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
        that.userId = idPage;
      },
      error(err) {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
  }

  postByIb(id){
    this.idItem=id;
    console.log(id);
    localStorage.removeItem('idPostClic');
    localStorage.setItem('idPostClic', id);
    console.log(localStorage);
  }


 /////////////////A FINIR
 functionClick(){
//   let that = this;
//   this.userService.updatePost(id, data).subscribe({
//     next(ret) {
//       let data;
//       for(let posts of Object.keys(ret)){
//         data = ret[posts];
//       }
//       that.posts = data;
//     },
//     error(err) {
//       console.log(err);
//     }
//   });
 }
}
