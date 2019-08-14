import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-votm-cloud-assets-create',
  templateUrl: './votm-cloud-assets-create.component.html',
  styleUrls: ['./votm-cloud-assets-create.component.scss']
})
export class VotmCloudAssetsCreateComponent implements OnInit {

  modal: any;
  constructor() { }

  ngOnInit() {
  }

  openmodal() {
    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    this.modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";

      }
    }

  }

  closemodal(event: string) {
    this.modal.style.display = "none";
  }

}
