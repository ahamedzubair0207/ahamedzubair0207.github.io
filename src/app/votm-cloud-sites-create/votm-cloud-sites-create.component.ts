import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-votm-cloud-sites-create',
  templateUrl: './votm-cloud-sites-create.component.html',
  styleUrls: ['./votm-cloud-sites-create.component.scss']
})
export class VotmCloudSitesCreateComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  closeResult: string;
  modal: any;
  UOM:any;
  constructor(private modalService: NgbModal) { this.UOM =  "SI";}

  ngOnInit() {
  }
  preview(files) {
    this.message = "";
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }


  open(content) {
    console.log(' open  ');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(' result  ', result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(' reason  ', reason);
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    debugger
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openmodal(){
    // Get the modal
var modal = document.getElementById("myModal");
modal.style.display = "block";
this.modal= document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

  }
  closemodal(){
    this.modal.style.display ="none";
  }
  onUnitChange(value){
    debugger
  console.log(value);
  this.UOM = value.target.value;
  }
}
