import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-votm-cloud-validator',
  templateUrl: './votm-cloud-validator.component.html',
  styleUrls: ['./votm-cloud-validator.component.scss']
})
export class VotmCloudValidatorComponent implements OnInit {

  @Input() message: string;

  constructor() { }

  ngOnInit() {
    if (!this.message) {
      this.message = 'This is required field.';
    }
  }

}
