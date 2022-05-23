import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfilComponent } from './profil/profil.component';
import { MurComponent } from './mur/mur.component';
import { ArticleComponent } from './article/article.component';
import { UserComponent } from './user/user.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { AddPostComponent } from './add-post/add-post.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    InscriptionComponent,
    ProfilComponent,
    MurComponent,
    ArticleComponent,
    UserComponent,
    UpdateAccountComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],//ProfilComponent
  bootstrap: [AppComponent]

})
export class AppModule { }
