import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-votm-cloud-char-validator',
  templateUrl: './votm-cloud-char-validator.component.html',
  styleUrls: ['./votm-cloud-char-validator.component.scss']
})
export class VotmCloudCharValidatorComponent implements OnInit {
  @Input() style: any;
  @Input() condition: boolean;
  @Input() message: string;
  constructor() { }

  ngOnInit() {
    if (!this.style) {
      this.style = {
        'color': 'red',
        'margin-top': '-15px'
      };
    }
    if (!this.message) {
      this.message = 'Max characters exceeded';
    }
  }

}
