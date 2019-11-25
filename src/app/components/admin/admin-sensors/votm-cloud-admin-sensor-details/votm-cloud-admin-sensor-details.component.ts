import { SortArrays } from './../../../shared/votm-sort';
import { LocationService } from 'src/app/services/locations/location.service';
import { SensorsService } from './../../../../services/sensors/sensors.service';
import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from 'src/app/components/shared/votm-cloud-toaster/votm-cloud-toaster';
import { Sensor } from 'src/app/models/sensor.model';
import { DatePipe, Location as RouterLocation } from '@angular/common';

import * as moment from 'moment';
import { VotmCommon } from 'src/app/components/shared/votm-common';

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
  toaster: Toaster = new Toaster(this.toastr);
  sensorDetailsDataObj: Sensor;
  sensorDetailsDataObj1: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sensorsService: SensorsService,
    private locationService: LocationService,
    private toastr: ToastrService,
    private router: Router,
    private routerLocation: RouterLocation,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.sensorId = params.get('sensorId');
      this.getSensorDetailsById();
    });

    this.pageType = this.activatedRoute.snapshot.data['type'];
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
      this.sensorDetailsData.node.forEach((sensorSignalData, index) => {

        // Push Signal Battery Value from child battery signal
        if (sensorSignalData.signalName !== null &&
          // sensorSignalData.signalId === 'e9326142-068b-494b-bff7-421a44fa0cae' ||
          // sensorSignalData.signalName.toLowerCase() === 'battery'
          sensorSignalData.signalId === 'e9326142-068b-494b-bff7-421a44fa0cae'
          ) {
            sensorBatteryValue = sensorSignalData.signalValue;
            this.sensorDetailsData.batteryValue = '0%';
            if (sensorSignalData.signalValue) {
              this.sensorDetailsData.batteryValue = sensorSignalData.signalValue + '%';
            }
            this.sensorDetailsData.batteryIcon = this.getBatterySignalTypeIconValue('battery', sensorSignalData.signalValue);
        }

        // Push sensorSignalData Battery Value from child battery signal
        if (sensorSignalData.signalName !== null &&
          // sensorSignalData.signalId === 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735' ||
          // sensorSignalData.signalName.toLowerCase() === 'signal'
          sensorSignalData.signalId === 'fa7b422d-2018-4fdb-ba50-0b4be9bf2735'
          ) {
            signalStrengthValue = sensorSignalData.signalValue;
            this.sensorDetailsData.signalStrength = '0%';
            if (sensorSignalData.signalValue) {
              this.sensorDetailsData.signalStrength = sensorSignalData.signalValue + '%';
            }
            this.sensorDetailsData.signalStrengthIcon = this.getBatterySignalTypeIconValue('signalStrength', sensorSignalData.signalValue);
        }

        console.log('sensorSignalData.modifiedOn===index===', this.sensorDetailsData.node[index], index);

        if (sensorSignalData.modifiedOn) {
          console.log('sensorSignalData.modifiedOn===', sensorSignalData.modifiedOn);
          this.sensorDetailsData.node[index].modifiedOn = moment(sensorSignalData.modifiedOn).format(VotmCommon.dateFormat) +' '+ moment(sensorSignalData.modifiedOn).format(VotmCommon.timeFormat);

          console.log('moment====', moment(sensorSignalData.modifiedOn).format(VotmCommon.dateFormat) , moment(sensorSignalData.modifiedOn).format(VotmCommon.timeFormat));

          //this.sensorDetailsData.node[index].push('ReportTime', moment(this.sensorDetailsData.modifiedOn).format(VotmCommon.dateFormat) + ' ' + moment(this.sensorDetailsData.modifiedOn).format(VotmCommon.timeFormat));

        }

      });
      this.sensorDetailsData.sensorStatusName = this.getSensorHealthStatus(sensorBatteryValue, signalStrengthValue);
      console.log('updated sensorDetailsData===', this.sensorDetailsData);
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

  getBatterySignalTypeIconValue(signalType, signalValue) {
    if (signalType === 'battery') {
      if (signalValue > '0' && signalValue <= '2.8') {
        return 'icon-battery-25';
      } else if (signalValue > '2.8' && signalValue <= '2.9') {
        return 'icon-battery-50';
      } else if (signalValue > '2.9' && signalValue <= '3.4') {
        return 'icon-battery-75';
      } else if (signalValue > '3.4') {
        return 'icon-battery-100';
      } else {
        return 'icon-battery-0';
      }
    } // Bettery

    if (signalType === 'signalStrength') {
      if (signalValue <= '14') {
        return 'icon-signal-25';
      } else if (signalValue > '14' && signalValue <= '16') {
        return 'icon-signal-50';
      } else if (signalValue > '16' && signalValue <= '45') {
        return 'icon-signal-75';
      } else if (signalValue > '45') {
        return 'icon-signal-100';
      }
    } // Signal Strength
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

  updateSensorDetail(sensorDetailForm: any) {
    // this.isCreateUserAPILoading = true;

    if (sensorDetailForm && !sensorDetailForm.invalid) {
      console.log('this.sensorDetailForm==', sensorDetailForm);
      console.log('this.sensorDetailsData==', this.sensorDetailsData);
    }
    this.sensorDetailsData = {};
    // console.log('this.sensorDetailsDataObj==', this.sensorDetailsDataObj);
    this.sensorDetailsData.sensorName = sensorDetailForm.sensorName;
    this.sensorDetailsData.description = sensorDetailForm.description;
    this.sensorDetailsData.locationId = sensorDetailForm.s_ins_loc;
    this.sensorDetailsData.modelNumber = sensorDetailForm.sensorModelNumber;
    console.log('this.sensorDetailsData updated==', this.sensorDetailsData);
    this.sensorsService.updateSensorDetail(this.sensorId, this.sensorDetailsData)
      .subscribe(response => {
        this.toaster.onSuccess('Sensor updated successfully ', 'Updated');
        this.getSensorDetailsById();
      }, error => {
        this.toaster.onFailure('Something went wrong. Please fill the form correctly', 'Fail');
      });

  }

  onLockClick() {
    if (this.pageType.toLowerCase() === 'view') {
      if (this.router.url.includes('org')) {
        this.router.navigate([`org/sensorDetails/edit/${this.sensorId}`]);
      } else {
        this.router.navigate([`admin/networkmanagement/sensorDetails/edit/${this.sensorId}`]);
      }
    } else {
      if (this.router.url.includes('org')) {
        this.router.navigate([`org/sensorDetails/view/${this.sensorId}`]);
      } else {
        this.router.navigate([`admin/networkmanagement/sensorDetails/view/${this.sensorId}`]);
      }
    }
  }

  onCancelClick(event) {
    this.routerLocation.back();
  }

}
