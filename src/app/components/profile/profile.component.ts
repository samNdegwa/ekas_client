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
userOrders;
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.userData$
    .subscribe((data: ResponseModel): void => {
      this.myUser = data;
      this.userService.getUserDetails(data.email).subscribe(datas => {
        this.details = datas;
      });
      
    });
    
    this.userService.getUserOreders(this.myUser.id).subscribe(orders =>{
      this.userOrders = orders;
      this.userOrders = this.userOrders.orders;
    })

  }

  logout(): void {
    this.userService.logout();
  }

}
