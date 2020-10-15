import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { SocialUser } from 'angularx-social-login'

// @ts-ignore
@Injectable({
  providedIn: 'root'
})


export class UserService {
  auth: boolean = false
  private  SERVER_URL: string = environment.SERVER_URL;
  private user;
  authState$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth);
  userData$ : BehaviorSubject<SocialUser | ResponseModel> = new BehaviorSubject<SocialUser | ResponseModel>(null);

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): void {
    this.http.post(`${this.SERVER_URL}/auth/login`, {email, password})
    .subscribe((data: ResponseModel): void => {
      this.auth = data.auth;
      this.authState$.next(this.auth);
      this.userData$.next(data);
    });
}

getUserDetails(userEmail: string) {
  return  this.http.get(this.SERVER_URL + '/auth/' + userEmail);
}

logout(): void{
  this.auth = false;
  this.authState$.next(this.auth);
}
}

export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
}
