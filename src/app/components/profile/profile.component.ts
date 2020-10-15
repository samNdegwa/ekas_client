import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { map } from 'rxjs/operators';
import { ResponseModel, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
myUser: any;
details;
email: string;
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.userData$
    .pipe(
      map(user => {
        if(user instanceof SocialUser) {
          return {
            email: 'test@testrrr.com',
            ...user
          };
        } else {
          return user;
        }
      })
    )
    .subscribe((data: ResponseModel | SocialUser): void => {
      this.myUser = data;
      this.userService.getUserDetails(data.email).subscribe(datas => {
        this.details = datas;
  
      });
    });

   
  }

}
