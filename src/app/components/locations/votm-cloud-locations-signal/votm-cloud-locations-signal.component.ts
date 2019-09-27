import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LocationService } from 'src/app/services/locations/location.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationSignalService } from '../../../services/locationSignal/location-signal.service';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-votm-cloud-locations-signal',
  templateUrl: './votm-cloud-locations-signal.component.html',
  styleUrls: ['./votm-cloud-locations-signal.component.scss']
})
export class VotmCloudLocationsSignalComponent implements OnInit, OnDestroy {

  @ViewChild('op', null) panel: OverlayPanel; // main overlay panel of sensor name refference
  @ViewChild('op2', null) panel2: OverlayPanel; // signal association modal refference
  locationId: string; // to store selected location's id.
  organizationId: string; // to store selected organization's id
  availableSignals: any[] = []; // to store list of available signals based on sensors.
  copyAvailableSignals: any[] = []; // to store list of available signals based on sensors.
  associatedSignals: any[] = [];
  selectedSignal; // selected signal to display overlay panel.
  location: Location = new Location(); // to store selected asset's data
  assetImageURL: any;
  display: string; // to store thedisplay style value of bootstrap modal pf add calculated signal
  toaster: Toaster = new Toaster(this.toastr);
  isGetAvailableSignalsAPILoading = false; // flag for loader for get available signals api
  isGetAssociatedSignalsAPILoading = false; // flag for loader for get associated signals api
  isCreateSignalAssociationAPILoading = false; // flag for loader for create signals association api
  imgURL: any; // to store the base64 of location image.

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private routerLocation: RouterLocation,
    private locationSignalService: LocationSignalService,
    private locationService: LocationService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.organizationId = this.activatedRoute.snapshot.paramMap.get('curOrgId');
    this.locationId = this.activatedRoute.snapshot.paramMap.get('locId');
    this.getLocationById();
    this.getLocationSignalAssociation();
  }

  /**
   * To get the location details by location id
   * Location id will fetch from current route.
   */
  getLocationById() {
    this.locationService.getLocationById(this.locationId)
    .subscribe(response => {
      this.location = response;
      if (this.location.logo && this.location.logo.imageName) {
        const fileExtension = this.location.logo.imageName.slice(
          (Math.max(0, this.location.logo.imageName.lastIndexOf('.')) || Infinity) + 1);
        this.imgURL = this.domSanitizer.bypassSecurityTrustUrl(`data:image/${fileExtension};base64,${this.location.logo.image}`);
      }
    });
  }
  /**
   * To get all available signals for that location and organization.
   * Location id and Organization Id will fetch from current route.
   * This function sets the sensor disable which are already associated.
   */
  getAllAvailableSignals() {
    this.isGetAvailableSignalsAPILoading = true;
    this.locationSignalService.getSignalsByLocation(this.locationId, this.organizationId)
    .subscribe(response => {
      console.log(response);
      this.availableSignals = response;

      setTimeout(() => {
        for (let i = 0; i < this.availableSignals.length; i++) {
          for (let j = 0; j < this.availableSignals[i].node.length; j++) {
            const index = this.associatedSignals.findIndex(
              signal => signal.signalId === this.availableSignals[i].node[j].id
            );
            this.availableSignals[i].node[j].sensorId = this.availableSignals[i].id;
            this.availableSignals[i].node[j].sensorName = this.availableSignals[i].name;
            this.availableSignals[i].node[j].associationName = this.availableSignals[i].node[j].name;
            this.availableSignals[i].node[j].imageCoordinates = {
              x: 0,
              y: 0
            };
            if (index !== -1) {
              const sensorDivElem =  document.getElementById('signalDiv_' + i + '_' + j);
              if (sensorDivElem) {
                sensorDivElem.classList.remove('docked');
              }
            } else {
              this.onClickOfAvailableSignals(i, j);
            }
          }
        }
        this.copyAvailableSignals = JSON.parse(JSON.stringify(this.availableSignals));
        console.log(this.copyAvailableSignals);
      }, 500);
      this.isGetAvailableSignalsAPILoading = false;
    },
    error => {
      this.isGetAvailableSignalsAPILoading = false;
    });
  }

  /**
   * To set different events for tha
   */
  onClickOfAvailableSignals(index1, index2) {
    console.log(this.panel);
    const sensorDivElem =  document.getElementById('signalDiv_' + index1 + '_' + index2);
    const elem = document.getElementById('signal_' + index1 + '_' + index2);
    console.log(elem);
    elem.onmousedown = event => {
      const obj = this.availableSignals[index1].node[index2];
      console.log('on mouse down');
      const shiftX = event.clientX - elem.getBoundingClientRect().left;
      const shiftY = event.clientY - elem.getBoundingClientRect().top;

      elem.style.position = 'absolute';
      elem.style.zIndex = '1000';
      elem.classList.add('icon-class');
      document.body.append(elem);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        elem.style.left = pageX - shiftX + 'px';
        elem.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(e) {
        console.log('on mouse move');
        moveAt(e.pageX, e.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      elem.onmouseup = (ev) => {
        console.log('on mouse up');
        document.removeEventListener('mousemove', onMouseMove);
        console.log(
          elem.getBoundingClientRect().left,
          elem.getBoundingClientRect().top
        );
        elem.onmouseup = null;
        console.log(index1, index2);
        this.onSelectSignal(
          ev,
          obj
        );

        console.log(elem.style.left, elem.style.top);
        console.log(elem.offsetLeft, elem.offsetTop);

        elem.addEventListener('mouseover', this.mouseoverEvent);
        const signalIndex = this.associatedSignals.findIndex(
          signal =>
              signal.id === this.copyAvailableSignals[index1].node[index2].id
        );
        if (signalIndex === -1) {
          console.log(elem.parentElement.offsetWidth, '=========', elem.parentElement.offsetHeight);
          console.log(parseInt(elem.style.left, 10), '-=----', parseInt(elem.style.top, 10));
          obj.imageCoordinates = {
            x: (parseInt(elem.style.left, 10) / elem.parentElement.offsetWidth) * 100,
            y: (parseInt(elem.style.top, 10) / elem.parentElement.offsetHeight) * 100
          };
          this.associatedSignals.push(obj);
          console.log(index1, '======', index2);
          console.log(JSON.stringify(this.associatedSignals));
          const index = this.availableSignals[index1].node.findIndex(
            signal =>
              signal.id === this.copyAvailableSignals[index1].node[index2].id
          );
          sensorDivElem.classList.remove('docked');

        } else {
          obj.imageCoordinates = {
            x: (parseInt(elem.style.left, 10) / elem.parentElement.offsetWidth) * 100,
            y: (parseInt(elem.style.top, 10) / elem.parentElement.offsetHeight) * 100
          };
        }
      };
    };

    elem.ondragstart = () => {
      console.log('on drag start');
      return false;
    };
  }

  getLocationSignalAssociation() {
    this.isGetAssociatedSignalsAPILoading = true;
    this.locationSignalService.getSignalAssociation(this.locationId)
    .subscribe(
      response => {
        this.associatedSignals = response;
        this.getAllAvailableSignals();
        this.isGetAssociatedSignalsAPILoading = false;
        setTimeout(() => {
          for (let i = 0; i < this.associatedSignals.length; i++) {
            this.associatedSignals[i].id = this.associatedSignals[i].signalId;
            this.associatedSignals[i].name = this.associatedSignals[i].signalName;
            this.associatedSignals[i].image = this.associatedSignals[i].signalImage;
            this.associatedSignals[i].imageCoordinates = this.associatedSignals[i].
              imageCordinates[this.associatedSignals[i].associationName];
            console.log('here');
            const img = document.createElement('img');
            img.src = this.associatedSignals[i].image;
            img.id = 'icon_' + i;
            img.classList.add('icon-class');
            img.style.position = 'absolute';
            img.style.width = '40px';
            img.style.cursor = 'pointer';
            img.addEventListener('mouseover', event => {
              console.log(this.panel);
              this.onSelectSignal(event, this.associatedSignals[i]);
            });
            img.style.top = ((this.associatedSignals[i].imageCoordinates.y * document.body.offsetHeight) / 100) + 'px';
            img.style.left = ((this.associatedSignals[i].imageCoordinates.x  * document.body.offsetWidth) / 100) + 'px';

            img.onmousedown = event => {

              console.log('on mouse down');
              const shiftX = event.clientX - img.getBoundingClientRect().left;
              const shiftY = event.clientY - img.getBoundingClientRect().top;

              img.style.position = 'absolute';
              img.style.zIndex = '1000';
              img.classList.add('icon-class');
              document.body.append(img);

              moveAt(event.pageX, event.pageY);

              function moveAt(pageX, pageY) {
                img.style.left = pageX - shiftX + 'px';
                img.style.top = pageY - shiftY + 'px';
              }

              function onMouseMove(e) {
                console.log('on mouse move');
                moveAt(e.pageX, e.pageY);
              }

              document.addEventListener('mousemove', onMouseMove);

              img.onmouseup = (ev) => {
                console.log('on mouse up');
                document.removeEventListener('mousemove', onMouseMove);
                console.log(
                  img.getBoundingClientRect().left,
                  img.getBoundingClientRect().top
                );
                img.onmouseup = null;
                this.onSelectSignal(event, this.associatedSignals[i]);
                console.log(img.style.left, img.style.top);
                console.log(img.offsetLeft, img.offsetTop);

                img.addEventListener('mouseover', e => {

                  this.panel.hide();
                  this.onSelectSignal(e, this.associatedSignals[i]);
                });
                const iconIdList = (((ev.target)as any).id).split('_');
                this.associatedSignals[iconIdList[1]].imageCoordinates = {
                  x: (parseInt(img.style.left, 10) / img.parentElement.offsetWidth) * 100,
                  y: (parseInt(img.style.top, 10) / img.parentElement.offsetHeight) * 100
                };
              };
            };

            img.ondragstart = () => {
              console.log('on drag start');
              return false;
            };
            console.log(img.style.top, '=====', img.style.left);
            document.body.appendChild(img);
            console.log(document.body.offsetWidth, '=========', document.body.offsetHeight);
          }
        }, 200);
      },
      error => {
        this.isGetAssociatedSignalsAPILoading = false;
      }
    );
  }

  onCancelClick(event) {
    this.removeImgsFromDOM();
    this.routerLocation.back();
  }

  removeImgsFromDOM() {
    const elemlist = document.querySelectorAll('.icon-class');
    elemlist.forEach(elem => {
      console.log('elem');
      document.body.removeChild(elem);
    });
  }

  onSelectSignal(event, signal) {
    console.log('here', signal);
    this.selectedSignal = signal;
    console.log(this.selectedSignal);
    this.selectedSignal.imageCoordinates.x = parseFloat(this.selectedSignal.imageCoordinates.x).toFixed(2);
    this.selectedSignal.imageCoordinates.y = parseFloat(this.selectedSignal.imageCoordinates.y).toFixed(2);
    this.panel.show(event);
  }

  onDetachSignalFromAsset() {
    console.log('here');
    if (this.selectedSignal.signalMappingId) {
      this.locationSignalService.detachSignalAssociation(this.selectedSignal.signalMappingId).subscribe(
        response => {
          this.toaster.onSuccess('Signal associated successfully', 'Saved');
          this.panel.hide();
          this.panel2.hide();
          this.getAllAvailableSignals();
          this.getLocationSignalAssociation();
        }
      );
    } else {
      const sensorIndex = this.availableSignals.findIndex(
        signal => signal.id === this.selectedSignal.sensorId
      );
      const signalIndex = this.availableSignals[sensorIndex].node.findIndex(
        signal => signal.id === this.selectedSignal.id
      );
      const index = this.associatedSignals.findIndex(
        signal => signal.id === this.selectedSignal.id
      );
      const elem = document.getElementById('signal_' + sensorIndex + '_' + signalIndex);
      this.panel.hide();
      this.panel2.hide();
      document.body.removeChild(elem);
      this.associatedSignals.splice(index, 1);
      const sensorDivElem =  document.getElementById('signalDiv_' + sensorIndex + '_' + signalIndex);
      elem.classList.remove('icon-class');
      elem.style.left = null;
      elem.style.top = null;
      elem.style.cursor = null;
      elem.style.zIndex = null;
      elem.style.position = null;
      elem.removeEventListener('mouseover', this.mouseoverEvent);
      sensorDivElem.classList.add('docked');
      sensorDivElem.insertBefore(elem, sensorDivElem.firstChild);
    }
  }

  mouseoverEvent = (event) => {
    console.log('sdfcgvh');
    const id = event.target.id.split('_');
    this.onSelectSignal(
      event,
      this.availableSignals[id[1]].node[id[2]]
    );
  }

  onClickOfCreateAssociateRule() {
    this.route.navigate(['alerts', 'home']);
  }

  onClickOfAddCalculatedSignal() {
    this.display = 'block';
  }

  closeCaluculatedSignalModal() {
    this.display = 'none';
  }

  onClickOfSaveSignalAssociationPanel() {
    console.log(this.selectedSignal);
    const index = this.associatedSignals.findIndex(
      signal => signal.id === this.selectedSignal.id
    );
    this.associatedSignals[index] = { ...this.selectedSignal };
    const sensorIndex = this.availableSignals.findIndex(
      signal => signal.id === this.selectedSignal.sensorId
    );
    const signalIndex = this.availableSignals[sensorIndex].node.findIndex(
      signal => signal.id === this.selectedSignal.id
    );
    const elem = document.getElementById('signal_' + sensorIndex + '_' + signalIndex);
    elem.style.top = ((this.selectedSignal.imageCoordinates.y * document.body.offsetHeight) / 100) + 'px';
    elem.style.left = ((this.selectedSignal.imageCoordinates.x  * document.body.offsetWidth) / 100) + 'px';
    this.panel2.hide();
    this.panel.hide();
  }

  onSaveSignalAssociation() {
    console.log(this.associatedSignals);
    const data = this.associatedSignals.map(signal => {
      const obj = {
        locationId: this.locationId,
        signalId: signal.id,
        sensorId: signal.sensorId,
        imageCordinates: {
        },
        name: signal.associationName,
        signalMappingId: signal.signalMappingId ? signal.signalMappingId : undefined
      };
      obj.imageCordinates[signal.associationName] = signal.imageCoordinates;
      return obj;
    });
    this.removeImgsFromDOM();
    this.locationSignalService.createSignalAssociation(data)
    .subscribe(
      response => {
        console.log(response);
        this.toaster.onSuccess('Signal associated successfully', 'Saved');
        this.panel.hide();
        this.panel2.hide();
        this.getAllAvailableSignals();
        this.getLocationSignalAssociation();
      }
    );
  }

  ngOnDestroy() {
    this.removeImgsFromDOM();
  }

}
