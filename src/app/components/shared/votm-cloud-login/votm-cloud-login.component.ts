import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votm-cloud-login',
  templateUrl: './votm-cloud-login.component.html',
  styleUrls: ['./votm-cloud-login.component.scss']
})
export class VotmCloudLoginComponent implements OnInit {

  Token: any;
  user: any = { userName: '', password: '' };

  constructor(private router: Router) { }

  ngOnInit() { }

  Login() {

    this.Token = window.location.href;
    localStorage.setItem('token', this.Token);
    this.router.navigateByUrl('/org/home');
    // if (this.user && this.user.userName && this.user.password) {
    //   // call login service here
    //   this.validateUser();
    // }

  }

  // service
  validateUser() {
    // call http service with user email id and pwd
    // If user is validated then in the response we should get user id
    // We can keep userid in session/in a variable in service so it can be accessible to everywhere
    // When we subscribe the response then in the response of the service check for authorized user (and auth token) then check for userid and set user id
    // After validating inside subscription you will write the below code
    // this.Token = window.location.href;
    // localStorage.setItem('token', this.Token);
    // this.router.navigateByUrl('/org/home/7a59bdd8-6e1d-48f9-a961-aa60b2918dde/VOTM');
  }

}

