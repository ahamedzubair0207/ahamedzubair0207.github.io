import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-votm-image-overlay',
  templateUrl: './votm-image-overlay.component.html',
  styleUrls: ['./votm-image-overlay.component.scss']
})
export class VotmImageOverlayComponent implements OnInit {


  customizeImageOverlay: any;
  constructor() { }

  ngOnInit() {
  }

  onClickOfCustomizeImageOverlay(){
     // Open Chart configuration modal popup
     const modal = document.getElementById('configure-image-overlay-modal');
     modal.style.display = 'block';
     this.customizeImageOverlay = document.getElementById('configure-image-overlay-modal');
     window.onclick = (event) => {
       if (event.target === modal) {
         modal.style.display = 'none';
       }
     };
  }

  onClickOfCustomizeImageOverlayModalClose() {
    // Close modal popup
    this.customizeImageOverlay.style.display = 'none';
  }

}
