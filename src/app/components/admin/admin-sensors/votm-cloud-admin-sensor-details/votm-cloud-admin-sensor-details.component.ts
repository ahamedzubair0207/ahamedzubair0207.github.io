import { SensorsService } from './../../../../services/sensors/sensors.service';
import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-votm-cloud-admin-sensor-details',
  templateUrl: './votm-cloud-admin-sensor-details.component.html',
  styleUrls: ['./votm-cloud-admin-sensor-details.component.scss']
})
export class VotmCloudAdminSensorDetailsComponent implements OnInit {
  sensorId: string;
  sensorDetailsData: any;

  constructor(
    private route: ActivatedRoute,
    private sensorsService: SensorsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.sensorId = params.get('sensorId');

      this.getSensorDetailsById();
    });

  }

  getSensorDetailsById() {
    //Get Sensor Details by Id
    this.sensorsService.getSensorDetailsById(this.sensorId)
      .subscribe(response => {
        this.sensorDetailsData = response;
        console.log('sensordatadetails===', this.sensorDetailsData);

      });

    // Get Sensor Details by Type=sensor, organization & Id=sensor id, org id
    // - v1/SensorTree/type/sensor/Id/588a6bc3-2ec3-4801-912e-0abfe9e3ef7d
    // this.sensorsService.getSensorDetailsByTypeAndId('sensor', this.sensorId)
    // .subscribe(response => {
    //   this.sensorDetailsData = response;
    //   console.log('getSensorDetailsByTypeAndId===', this.sensorDetailsData);

    // });

  }

}
