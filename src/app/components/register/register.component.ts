import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { countiesModelServer, ServerResponse } from '../../../models/counties.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  counties: countiesModelServer[] = [];
  fname: string;
  lname: string;
  email: string;
  phoneNumber: string;
  password1: string;
  password2: string;
  country: string;
  county: string;
  sub_county: string;
  city: string;
  postal_address: string;
  user;

  constructor(private userService: UserService,private toast: ToastrService, private Spinner: NgxSpinnerService) { }

  ngOnInit(): void {
     // Getting counties
     this.userService.getCounties().subscribe((data: ServerResponse) => {
      this.counties = data.counties;
     // console.log(this.counties);
    });
  }

  registerAccount(form: NgForm) {
   const fname: string = this.fname;
   const lname: string = this.lname;
   const email: string = this.email;
   const phoneNumber: string = this.phoneNumber;
   const password1: string = this.password1;
   const password2: string = this.password2;
   const country: string = this.country;
   const county: string = this.county;
   const sub_county: string = this.sub_county;
   const city: string = this.city;
   const postal_address: string =this.postal_address;
   if(password1 === password2) {
     this.userService.getUserDetails(email).subscribe(res =>{
       this.user = res;
       if(this.user.id === null) {
        this.userService.registerUser(password1,email,fname,lname,phoneNumber,country,county,sub_county,city,postal_address);
       } else {
        this.toast.error(`Email account ${email} has already been taken. Please click login`, 'Error!', {
          timeOut: 8500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
       }
     })
    
   } else {
    this.toast.error(`Passwords Mismatch!!!`, 'Error!', {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });

   }
  
  }

}
