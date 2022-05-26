import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments?: Array<Comment> = [];
  id?;
  idItem?;
  constructor(private userService: UserService) {
    let that = this;
    let id=localStorage['idPostClic'];
    let idItem = parseInt(id);
    console.log('id comment : '+idItem);

      this.userService.getComment(idItem).subscribe({
      next(ret) {
        let data;
        for(let comments of Object.keys(ret)){
          data = ret[comments];
          console.log('data comments :' + data);
        }
        that.comments = data;
        that.id = idItem;
        console.log('that.id :' + that.id);

      },
      error(err) {
        console.log(err);
      }
    });
   }

  ngOnInit(): void {
  }

}
