import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-votm-cloud-header',
  templateUrl: './votm-cloud-header.component.html',
  styleUrls: ['./votm-cloud-header.component.scss']
})
export class VotmCloudHeaderComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  token:any;

  constructor() {  }
    
  ngOnInit() {
    this.token = sessionStorage.getItem('token');
 
  }
  
  openNav() {
    document.getElementById("sidebar").style.left = "0";
    document.getElementById("page-wrapper").style.marginLeft = "260px";
    document.getElementById("btn_open").style.display = "none";
    document.getElementById("btnClose").style.display ="block";
  }
  
  closeNav() {
     document.getElementById("btnClose").style.display ="none";
    document.getElementById("sidebar").style.width = "50px";
    
  }
  openNavIcon() {
    document.getElementById("sidebar1").style.width = "260px";
    document.getElementById("sidebar1").style.display= "block";
  }
  
  closeNavIcon() {
    document.getElementById("sidebar1").style.display = "none";
  }

  mouseover(){
    document.getElementById("sidebar").style.width = "260px";
    document.getElementById("btnClose").style.display ="block";
  }
  ONloadNevigation(){
    document.getElementById("btnClose").style.display ="none";
  }

  
}