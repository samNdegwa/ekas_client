import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { countiesModelServer, ServerResponse } from '../../models/counties.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailService } from './email.service';


// @ts-ignore
@Injectable({
  providedIn: 'root'
})


export class UserService {
  auth: boolean = false
  //private  SERVER_URL: string = environment.SERVER_URL;
  private  SERVER_URL2: string = environment.SERVER_URL2;
  private user;
  authState$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth);
  userData$ : BehaviorSubject<ResponseModel> = new BehaviorSubject<ResponseModel>(null);

  constructor(private http: HttpClient, private toast: ToastrService, 
            private Spinner: NgxSpinnerService, private email: EmailService) {}

  loginUser(email: string, password: string): void {
    this.http.post(`${this.SERVER_URL2}/login.php`, {email, password})
    .subscribe((data: ResponseModel): void => {
      this.auth = data.auth;
      this.authState$.next(this.auth);
      this.userData$.next(data);
      localStorage.setItem('token',data.token);
      localStorage.setItem('email',data.email);
      localStorage.setItem('user',data.fname+' '+data.lname);

    });
}

getUserDetails(userEmail: string) {
  return  this.http.get(this.SERVER_URL2 + '/read-single-user.php?email=' + userEmail)
}
 
getCounties(): Observable<ServerResponse> {
  return this.http.get<ServerResponse>(this.SERVER_URL2 + '/all-counties.php');
}

getUserOreders(userId: number) {
  return this.http.get(this.SERVER_URL2 + '/user-orders.php?user_id=' + userId);
}

logout(): void{
  this.auth = false;
  this.authState$.next(this.auth);
}
registerUser(pass: string, email: string, fname: string, lname: string, phone: string,
   country: string, county: string, sub_c: string,city:string, postal:string){
     this.http.post(`${this.SERVER_URL2}/register-user.php`,{
      password: pass, 
      email: email,
      fname: fname, 
      lname: lname,
      phoneNumber: phone,
      country: country,
      county: county,
      sub_county: sub_c,
      city: city, 
      postal_address: postal
     }).subscribe(res =>{
      this.toast.success(`Account Created Successifully`, 'Account Added', {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });

      this.email.sendAccountSuccessEmail(lname, email);

     });

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
  message: string;
  status: number;

}
