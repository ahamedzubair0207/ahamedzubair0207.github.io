import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-votm-cloud-login',
  templateUrl: './votm-cloud-login.component.html',
  styleUrls: ['./votm-cloud-login.component.scss']
})
export class VotmCloudLoginComponent implements OnInit {

  Token:any;

  constructor(private router: Router) { }

  ngOnInit() { }

  Login(){
    this.Token = window.location.href;
    localStorage.setItem('token',this.Token);
    this.router.navigateByUrl('/view/home');
  }

}

