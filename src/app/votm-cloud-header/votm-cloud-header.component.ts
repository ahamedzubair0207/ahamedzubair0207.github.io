import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-votm-cloud-header',
  templateUrl: './votm-cloud-header.component.html',
  styleUrls: ['./votm-cloud-header.component.scss']
})
export class VotmCloudHeaderComponent implements OnInit {

  token:any;

  constructor() {  }
    
  ngOnInit() {
    this.token = sessionStorage.getItem('token');
 
  }

  
}