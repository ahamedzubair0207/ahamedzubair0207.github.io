import { SortArrays } from './../../../shared/votm-sort';
import { LocationService } from 'src/app/services/locations/location.service';
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
  pageType: any;
  locationListForDropDown: any;

  constructor(
    private route: ActivatedRoute,
    private sensorsService: SensorsService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.sensorId = params.get('sensorId');
      this.getSensorDetailsById();
    });
    this.pageType = this.route.snapshot.data['type'];
    console.log('pageType===', this.pageType);

  }

  getSensorDetailsById() {
    // Get Sensor Details by Type=sensor, organization & Id=sensor id, org id
    // - v1/SensorTree/type/sensor/Id/588a6bc3-2ec3-4801-912e-0abfe9e3ef7d
    this.sensorsService.getSensorDetailsByTypeAndId('sensor', this.sensorId)
    .subscribe(response => {
      this.sensorDetailsData = response[0];
      let sensorBatteryValue = '';
      let signalStrengthValue = '';
      // Get Battery & signal Value from child node
      this.sensorDetailsData.node.forEach(sensorSignalData => {

        // Push Signal Battery Value from child battery signal
        if (sensorSignalData.signalName !== null &&
          // sensorSignalData.signalId === 'e9326142-068b-494b-bff7-421a44fa0cae' ||
          // sensorSignalData.signalName.toLowerCase() === 'battery'
          sensorSignalData.signalId === 'e9326142-068b-494b-bff7-421a44fa0cae'
          ) {
            sensorBatteryValue = sensorSignalData.signalValue;
            this.sensorDetailsData.batteryValue = sensorSignalData.signalValue + '%';
        }

        // Push sensorSignalData Battery Value from child battery signal
        if (sensorSignalData.signalName !== null &&
          // sensorSignalData.signalId === 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735' ||
          // sensorSignalData.signalName.toLowerCase() === 'signal'
          sensorSignalData.signalId === 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735'
          ) {
            signalStrengthValue = sensorSignalData.signalValue;
            this.sensorDetailsData.signalStrength = sensorSignalData.signalValue + '%';
        }
      });
      this.sensorDetailsData.sensorStatusName = this.getSensorHealthStatus(sensorBatteryValue, signalStrengthValue);
      console.log('update sensorDetailsData===', this.sensorDetailsData);
      // Get all home org location
      this.getAllLocationByOrganization(this.sensorDetailsData.parentOrganizationId);
    });


    // Get Sensor Details by Id
    // this.sensorsService.getSensorDetailsById(this.sensorId)
    //   .subscribe(response => {
    //     this.sensorDetailsData = response;
    //     console.log('sensordatadetails===', this.sensorDetailsData);

    //   });
  }

  // Get sensor status based on Admin alert Sensor subscription
  getSensorHealthStatus(batteryValue, signalValue) {
    // console.log('sensor health', batteryValue, signalValue);

    if (batteryValue <= '2.8' || signalValue <= '14') {
      return 'Critical';
    } else if (
      (batteryValue > '2.8' && batteryValue <= '2.9') ||
      (signalValue > '14' && signalValue <= '16')
      ) {
        return 'Warning';
    } else {
      return 'Good';
    }
  }

  getAllLocationByOrganization(orgId: string) {
    this.locationService.getAllLocationTree(orgId)
      .subscribe(response => {
        this.locationListForDropDown = response;
        this.locationListForDropDown.sort(SortArrays.compareValues('name'));
      });
  }

  // Get boolen value for signal row display
  checkRowDisplay(sensorObj) {
    // console.log('sensorObj===', sensorObj, sensorObj.signalId);
    // e9326142-068b-494b-bff7-421a44fa0cae == battery
    // fa7b422d-2018-4fdb-ba50-0b4be9bf2735 == signal
    if (
        sensorObj.signalName !== null &&
        // (sensorObj.signalId !== 'e9326142-068b-494b-bff7-421a44fa0cae' || sensorObj.signalName.toLowerCase() !== 'battery') &&
        // (sensorObj.signalId !== 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735' || sensorObj.signalName.toLowerCase() !== 'signal')
        (sensorObj.signalId !== 'e9326142-068b-494b-bff7-421a44fa0cae') &&
        (sensorObj.signalId !== 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735')
    ) {
      return true;
    }

    return false;
  }

}
