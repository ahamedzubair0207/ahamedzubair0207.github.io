import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-votm-cloud-sensors-home',
  templateUrl: './votm-cloud-sensors-home.component.html',
  styleUrls: ['./votm-cloud-sensors-home.component.scss']
})
export class VotmCloudSensorsHomeComponent implements OnInit {
  sensorList: any;
  constructor() { }

  ngOnInit() {

    this.sensorList = [
      {
        sensorId: "4820f870-2a48-4564-beb4-b33f4767597e",
        serialNumber: "001Test",
        name: "Tempsensoroo112",
        sensorTypeId: "3daa40a8-4c18-454f-bef2-7d5adc333c8c",
        modelNumber: null,
        sensorStatusId: "f68007c9-1413-4ed9-bea8-608462093d75",
        replacedMappedSensorId: null,
        active: true,
        description: "string",
        createdBy: null,
        createdOn: null,
        modifiedBy: null,
        modifiedOn: null
      },

      {
        sensorId: "4820f870-2a48-4564-beb4-b33fwew675972",
        serialNumber: "002Test",
        sensorName: "Tempsensoroo113",
        sensorTypeId: "3daa40a8-4c18-454f-bef2-7d5adc333c5c",
        modelNumber: null,
        sensorStatusId: "f68007c9-1413-4ed9-bea8-608462093d25",
        replacedMappedSensorId: null,
        active: true,
        description: "string",
        createdBy: null,
        createdOn: null,
        modifiedBy: null,
        modifiedOn: null
      },


    ]
  }

  deleteSensorById(event){}

}
