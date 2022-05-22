import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnectionComponent } from './connection/connection.component';
import { UserComponent } from './user/user.component';
import { AuthentificationGuard } from './authentification.guard';
import { UpdateAccountComponent } from './update-account/update-account.component';

const routes: Routes = [

  { path: "", component: Component },
  { path: "inscription", component: InscriptionComponent },
  { path: "connection", component: ConnectionComponent },
  { path: "user/:id", component: UserComponent, canActivate:[AuthentificationGuard]},
  { path: "user/updateAccount/:id", component: UpdateAccountComponent, canActivate:[AuthentificationGuard]}

  // {path:'home', component:HomeComponent, canActivate:[AuthGuardService]},
  // {path:'', redirectTo:'login', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
