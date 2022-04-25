import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() { }

  public tokenValue() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  public estConnecter() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public seDeconnecter() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

}
