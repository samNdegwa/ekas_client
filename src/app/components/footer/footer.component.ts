import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  authState: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

}
