import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-votm-cloud-confim-dialog',
  templateUrl: './votm-cloud-confim-dialog.component.html',
  styleUrls: ['./votm-cloud-confim-dialog.component.scss']
})
export class VotmCloudConfimDialogComponent implements OnInit {

  closeResult: string;

  @Input() message: string;
  @Input() headerMessage: string;
  @Input() confirmName: string;
  @Input() cancelName: string;

  @ViewChild('content', null) content: any
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  // @ViewChild('modal')

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!this.confirmName){
      this.confirmName = 'Yes';
    }
    if (!this.cancelName){
      this.cancelName = 'No';
    }
  }

  open() {
    this.modalService
    .open(this.content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false })
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    console.log('AHAMED ', reason);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  close(event) {
    this.onClose.next(event);
    this.modalService.dismissAll();
  }

}
