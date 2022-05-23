import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { Posts } from '../classes/post';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  idAcharger = 0;
  postForm = this.formBuilder.group({
    id:1,
    title: '',
    contenu: '',
    pouce: '',
    imagePost: '',
    createdAt:'',
    id_1:''
  });
  constructor(private idVal: AuthentificationService, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private router: Router, private formModule: FormsModule) { }

  ngOnInit(): void {
  }

  validForm() {
    let idPage = 0;
    this.route.params.subscribe({
      next(val) {
        this.idAcharger = parseInt(val["id"])
        idPage = this.idAcharger;
      }
    });
    let data: Posts = {
      title: this.postForm.value.title,
      contenu: this.postForm.value.contenu,
      imagePost: this.postForm.value.imagePost,
      id_1: idPage
    }
    let that = this
    this.userService.addPost(data).subscribe({
      next(ret) {
        that.retourCompte();
      },
      error(err) {
        alert(err);
      }
    })
    console.log(data);
    //this.retourCompte();
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
