import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votm-cloud-header',
  templateUrl: './votm-cloud-header.component.html',
  styleUrls: ['./votm-cloud-header.component.scss']
})
export class VotmCloudHeaderComponent implements OnInit {

  token:any;
  menuOpen: boolean;

  constructor( private sharedService: SharedService, private router: Router) { 
    this.sharedService.getMenuOpen().subscribe(newVal => this.menuOpen = newVal);
   }
    
  ngOnInit() {
    this.token = sessionStorage.getItem('token');
  }

  toggleMenu(){
    this.sharedService.setMenuOpen(!this.menuOpen);
  }
  
}