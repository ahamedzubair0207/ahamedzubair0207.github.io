import { DerivedSignalService } from './../../../services/signal/derived-signal.service';
import { DerivedSignal } from './../../../models/derivedSignal.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-votmcloud-derived-signal',
  templateUrl: './votmcloud-derived-signal.component.html',
  styleUrls: ['./votmcloud-derived-signal.component.scss']
})
export class VotmcloudDerivedSignalComponent implements OnInit {

  derivedSignal: DerivedSignal = new DerivedSignal();
  functionControls: any;
  functionControlKeys: any[] = [];
  constructor(
    private derivedSigService: DerivedSignalService
  ) { }

  ngOnInit() {
  }

  onChangeFunction() {
    console.log(this.derivedSignal.functionId);
    this.functionControls = {};
    this.functionControlKeys = [];
    this.derivedSigService.getControlsByFunction(this.derivedSignal.functionId).subscribe(
      response => {
        response = {
          '1': [
            {
              controlId: '2fc59999-a936-4175-8f92-a551e9f96b20',
              controlName: 'Dropdown',
              isInput: false,
              displayOrder: 4,
              defaultValue: null,
              dataLoadPath: null,
              dataType: 'Collection'
            },
            {
              controlId: '711c7bd7-fcb7-4d80-ae9e-c9787daaccfe',
              controlName: 'Label',
              isInput: true,
              displayOrder: 4,
              defaultValue: '4-20mA Sensor',
              dataLoadPath: null,
              dataType: 'String'
            }
          ],
          '2': [
            {
              controlId: '711c7bd7-fcb7-4d80-ae9e-c9787daaccfe',
              controlName: 'Label',
              isInput: true,
              displayOrder: 5,
              defaultValue: 'Singal Type',
              dataLoadPath: null,
              dataType: 'String'
            },
            {
              controlId: '2fc59999-a936-4175-8f92-a551e9f96b20',
              controlName: 'Dropdown',
              isInput: false,
              displayOrder: 5,
              defaultValue: null,
              dataLoadPath: null,
              dataType: 'Collection'
            }
          ],
          '3': [
            {
              controlId: 'f89531e3-5203-41e1-890c-cad16f1b0eee',
              controlName: 'TextBox',
              isInput: false,
              displayOrder: 6,
              defaultValue: null,
              dataLoadPath: null,
              dataType: 'Number'
            },
            {
              controlId: '711c7bd7-fcb7-4d80-ae9e-c9787daaccfe',
              controlName: 'Label',
              isInput: true,
              displayOrder: 6,
              defaultValue: '4 mA(Low)',
              dataLoadPath: null,
              dataType: 'String'
            }
          ],
          '4': [
            {
              controlId: 'f89531e3-5203-41e1-890c-cad16f1b0eee',
              controlName: 'TextBox',
              isInput: false,
              displayOrder: 7,
              defaultValue: null,
              dataLoadPath: null,
              dataType: 'Number'
            },
            {
              controlId: '711c7bd7-fcb7-4d80-ae9e-c9787daaccfe',
              controlName: 'Label',
              isInput: true,
              displayOrder: 7,
              defaultValue: '20 mA(High)',
              dataLoadPath: null,
              dataType: 'String'
            }
          ]
        };
        for (const element of (Object.keys(response))) {
          const key =  this.getLabel(response[element]);
          const value =  this.getType(response[element]);
          console.log(key, '======', value);
          this.functionControls[key] = value;
          console.log(this.functionControls);
        }
        this.functionControlKeys = Object.keys(this.functionControls);
      }
    );
  }

  getLabel(controlArr) {
    console.log(controlArr);
    for (const element of controlArr) {
      if (element.controlName.toLowerCase() === 'label') {
        return element.defaultValue;
      }
    }
  }

  getType(controlArr) {
    console.log(controlArr);
    for (const element of controlArr) {
      if (element.controlName.toLowerCase() !== 'label') {
        return element;
      }
    }
  }

}
