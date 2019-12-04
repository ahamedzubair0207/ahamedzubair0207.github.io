import { SharedService } from 'src/app/services/shared.service';
import { GatewaysService } from './../../../services/gateways/gateways.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gateway } from 'src/app/models/gateway.model';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';

@Component({
  selector: 'app-votm-cloud-locations-gateway',
  templateUrl: './votm-cloud-locations-gateway.component.html',
  styleUrls: ['./votm-cloud-locations-gateway.component.scss']
})
export class VotmCloudLocationsGatewayComponent implements OnInit {

  locationId: string; // to store selected location's id.
  organizationId: string; // to store selected organization's id
  organizationName: string; // to store selected organization's name
  curOrganizationId: string;
  curOrganizationName: string;
  associatedGateways: any[] = [];
  toaster: Toaster = new Toaster(this.toastr);
  gateways: any[] = [];
  @Input() imageURL: string;
  @Input() disable: boolean;
  @Input() showUnClaimed = false;
  @Input() showClaimed = true;
  @Output() toggleDisable: EventEmitter<any> = new EventEmitter<any>();
  isGetGatewayAPILoading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private gatewayService: GatewaysService,
    private sharedService: SharedService,
    private route: Router,
    private toastr: ToastrService,
      ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.curOrganizationId = params.get('curOrgId');
      this.curOrganizationName = params.get('curOrgName');

      this.locationId = params.get('locId');
      console.log(this.curOrganizationId, '====', this.curOrganizationName, '====', this.locationId);

      this.getLocationGatewayAssociation();
    });
  }

  getAllGateways() {
    this.isGetGatewayAPILoading = true;
    this.gateways = [];
    this.gatewayService.getGatewayDetailsByOrganizationId(this.curOrganizationId).subscribe(
      response => {
        this.gateways = this.sharedService.toSortListAlphabetically(response, 'gatewayName');
        const gatewayList = [];
        for (const gateway of this.gateways) {
          console.log(gateway);
          console.log(gateway.locationId, '===', this.locationId);
          gateway.associationName = gateway.gatewayName;
          gateway.associated = true;
          gateway.imageCordinates = {
            x: 0,
            y: 0
          };
          gateway.icon = 'icon-gateway';
          gateway.bound = true;
          gatewayList.push(gateway);
        }
        this.gateways = [...gatewayList];
        console.log(this.gateways);
        this.isGetGatewayAPILoading = false;
        this.getLocationGatewayAssociation();
      }, error => {
        this.isGetGatewayAPILoading = false;
      }
    );
  }

  getLocationGatewayAssociation() {
    this.isGetGatewayAPILoading = true;
    this.associatedGateways = [];
    this.gatewayService.getGatewayLocationAssociation(this.locationId).subscribe(
      response => {
        this.associatedGateways = response;
        for (let i = 0; i < this.associatedGateways.length; i++) {
          const gateway = this.associatedGateways[i];
          if (!gateway.associationName) {
            gateway.associationName = gateway.gatewayName;
          }
          if (!gateway.imageCordinates) {
            gateway.imageCordinates = {};
            gateway.pctPos = {};
            gateway.pctPos['left'] = 0;
            gateway.pctPos['top'] = 0;
          } else {
            gateway.imageCordinates = gateway.imageCordinates[gateway.associationName];
            gateway.pctPos = {};
            gateway.pctPos['left'] = gateway.imageCordinates.x;
            gateway.pctPos['top'] = gateway.imageCordinates.y;
          }

          gateway.isClicked = false;
          gateway.icon = 'icon-gateway';
          gateway.associated = true;
          gateway.did = i;
          gateway.bound = true;
        }
        this.gateways = [...this.associatedGateways];
        this.isGetGatewayAPILoading = false;
        // for (let i = 0; i < this.gateways.length; i++) {
        //   const gateway = this.gateways[i];
        //   const index = this.associatedGateways.findIndex(assGateway => assGateway.gatewayId === gateway.gatewayId);
        //   console.log(index);
        //   if (index !== -1) {
        //     gateway.associated = true;
        //     gateway.associationName = this.associatedGateways[index].associationName;
        //     this.associatedGateways[index].organizationId = this.curOrganizationId;
        //     this.associatedGateways[index].locationId = this.locationId;
        //   } else {
        //     gateway.pctPos = { left: 0, top: 0};
        //     gateway.isClicked = false;
        //     gateway.icon = 'icon-gateway';
        //     gateway.associated = true;
        //     gateway.did = this.associatedGateways.length;

        //     this.associatedGateways.push(gateway);
        //   }
        // }

      }, error => {
        this.isGetGatewayAPILoading = false;
      }
    );
  }

  onReturnToList() {
    this.route.navigate(['loc', 'home', this.curOrganizationId, this.curOrganizationName]);
  }

  onReset() {
    this.getAllGateways();
    this.toggleDisable.emit();
  }

  onSaveGatewayAssociation(droppedList) {
    const data = [];
    droppedList.forEach(signal => {
      if (signal.pctPos.left !== 0 ||  signal.pctPos.top !== 0) {
        const obj = {
          locationId: this.locationId,
          gatewayId: signal.gatewayId,
          imageCordinates: {},
          name: signal.associationName,
          gatewayLocationId: signal.gatewayLocationId ? signal.gatewayLocationId : null
        };
        obj.imageCordinates[signal.associationName] = {
          x: signal.pctPos['left'],
          y: signal.pctPos['top']
        };
        data.push(obj);
      }
    });
    console.log(data);
    this.gatewayService.associateGatewayLocation(data)
      .subscribe(
        response => {
          console.log(response);
          this.toaster.onSuccess('Signal associated successfully', 'Saved');
          this.getAllGateways();
          this.toggleDisable.emit();
        }, error => {
          this.toaster.onFailure('Error while saving signal assocition', 'Error');
        }
      );
  }

}
