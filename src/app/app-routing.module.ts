import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnectionComponent } from './connection/connection.component';
import { UserComponent } from './user/user.component';
import { AuthentificationGuard } from './authentification.guard';


const routes: Routes = [
  
  { path: "", component: Component },
  { path: "inscription", component: InscriptionComponent },
  { path: "connection", component: ConnectionComponent },
  { path: "user", component: UserComponent, canActivate:[AuthentificationGuard] },

  // {path:'home', component:HomeComponent, canActivate:[AuthGuardService]},
  // {path:'detail/:id', component:DetailComponent},
  // {path: 'register', component: RegisterComponent},
  // {path:'login', component: LoginComponent},
  // {path:'', redirectTo:'login', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
