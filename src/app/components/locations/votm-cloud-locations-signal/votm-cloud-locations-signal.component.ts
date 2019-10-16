import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LocationService } from 'src/app/services/locations/location.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationSignalService } from '../../../services/locationSignal/location-signal.service';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../shared/votm-cloud-toaster/votm-cloud-toaster';
import { Location } from 'src/app/models/location.model';
declare var $: any;
@Component({
  selector: 'app-votm-cloud-locations-signal',
  templateUrl: './votm-cloud-locations-signal.component.html',
  styleUrls: ['./votm-cloud-locations-signal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VotmCloudLocationsSignalComponent implements OnInit, AfterViewInit {

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
  curOrganizationId: string;
  curOrganizationName: string;
  @ViewChild('editOP', null) editOPanel: OverlayPanel; // signal association modal refference
  sensors = [
  ];
  sensorsCreated = null;
  sensorCharCode = {
    Temperature: 'E802',
    Humidity: 'E801',
    'Dew Point': 'E807',
    Battery: 'E803',
    'Signal Strength': 'E804'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private routerLocation: RouterLocation,
    private locationSignalService: LocationSignalService,
    private locationService: LocationService,
    private domSanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.locationId = this.activatedRoute.snapshot.paramMap.get('locId');
    this.getLocationById();
    this.getLocationSignalAssociation();
    this.activatedRoute.paramMap.subscribe(params => {
      this.curOrganizationId = params.get('curOrgId');
      this.curOrganizationName = params.get('curOrgName');
      this.organizationId = params.get('orgId');
    });
  }

  ngAfterViewInit() {
    console.log(this.editOPanel);

    const self = this;
    $.fn.drags = function(opt) {

      opt = $.extend({
          handle: '',
          cursor: 'move',
          draggableClass: 'draggable',
          activeHandleClass: 'active-handle'
      }, opt);

      let $selected = null;
      const $elements = (opt.handle === '') ? this : this.find(opt.handle);

      $elements.css(  'cursor', opt.cursor).on('mousedown', function(e) {
          if ( e.target !== this) {
            return;
          }
          if (opt.handle === '') {
              $selected = $(this);
              $selected.addClass(opt.draggableClass);
          } else {
              $selected = $(this).parent();
              $selected.addClass(opt.draggableClass).find(opt.handle).addClass(opt.activeHandleClass);
          }
          const drg_h = $selected.outerHeight();
          const drg_w = $selected.outerWidth();
          const pos_y = $selected.offset().top + drg_h - e.pageY;
          const pos_x = $selected.offset().left + drg_w - e.pageX;
          $(document).on('mousemove', (e) => {
              $selected.offset({
                  top: e.pageY + pos_y - drg_h,
                  left: e.pageX + pos_x - drg_w
              });
          }).on('mouseup', function(e) {
              console.log($(this));
              $(this).off('mousemove'); // Unbind events from document
              if ($selected !== null) {
                  $selected.removeClass(opt.draggableClass);
                  $selected.css('left', parseInt($selected.css('left'), 10) / ($selected.parent().width() / 100) + '%');
                  $selected.css('top', parseInt($selected.css('top'), 10) / ($selected.parent().height() / 100) + '%');
                  console.log('herer' , self.dropSensor);
                  if (self.dropSensor) { self.dropSensor($selected); }
                  $selected = null;
                  $selected.addClass('pad-18');
              }
          });
          e.preventDefault();
          e.stopPropagation();
          e.cancelBubble = true;
          return false;
      }).on('mouseup', function(e) {
          if ( e.target !== this) {
            return;
          }
          if (opt.handle === '') {
              $selected.removeClass(opt.draggableClass);
          } else {
              $selected.removeClass(opt.draggableClass)
                  .find(opt.handle).removeClass(opt.activeHandleClass);
          }
          $selected.css('left', parseInt($selected.css('left'), 10) / ($selected.parent().width() / 100) + '%');
          $selected.css('top', parseInt($selected.css('top'), 10) / ($selected.parent().height() / 100) + '%');
          console.log(self.dropSensor);
          if (self.dropSensor)  {
            self.dropSensor($selected);
          }
          $selected.addClass('pad-18');

          $selected = null;
      });

      return this;

    };
   // this.configSensors('#sensor-cont', '#map-cont-1');
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
      this.sensors = response;
      for (let i = 0; i < this.sensors.length; i++) {
        for (let j = 0; j < this.sensors[i].node.length; j++) {
          const index = this.associatedSignals.findIndex(
            signal => signal.signalId === this.sensors[i].node[j].id
          );
          this.sensors[i].node[j].sensorId = this.sensors[i].id;
          this.sensors[i].node[j].sensorName = this.sensors[i].name;
          this.sensors[i].node[j].associationName = this.sensors[i].node[j].name;
          this.sensors[i].node[j].imageCoordinates = {
            x: 0,
            y: 0
          };
        }
      }
      this.copyAvailableSignals = JSON.parse(JSON.stringify(this.sensors));
      console.log(this.copyAvailableSignals);
      this.configSensors('#sensor-cont', '#map-cont-1');
      this.setAssociatedSensors('map-cont-1');
      this.isGetAvailableSignalsAPILoading = false;
    },
    error => {
      this.isGetAvailableSignalsAPILoading = false;
    });
  }


  getLocationSignalAssociation() {
    this.isGetAssociatedSignalsAPILoading = true;
    this.locationSignalService.getSignalAssociation(this.locationId)
    .subscribe(
      response => {

        this.getAllAvailableSignals();
        this.isGetAssociatedSignalsAPILoading = false;
        for (const signal of response) {
          signal.imageCoordinates = signal.imageCordinates[signal.associationName];
          signal.imageCoordinates.x =  (parseFloat(signal.imageCoordinates.x.replace('%', ''))).toFixed(2) + '%';
          signal.imageCoordinates.y =  (parseFloat(signal.imageCoordinates.y.replace('%', ''))).toFixed(2) + '%';
          signal.name = signal.signalName;
          signal.id = signal.signalId;
        }
        this.associatedSignals = [...response];
      },
      error => {
        this.isGetAssociatedSignalsAPILoading = false;
      }
    );
  }
  setAssociatedSensors(mapCntrSel) {
    for (const signal of this.associatedSignals) {
      let dsIx;
      const sIx = this.sensors.findIndex(sensor => {
        dsIx = sensor.node.findIndex(signalObj => signalObj.id === signal.signalId);
        return signal.sensorId === sensor.id;
      });
      const $sensor = $(
        '<div class="sensor-circle secondary-ds docked signalicon-temperature" >'
      )
      .data('sIx', sIx)
      .data('dsIx', dsIx)
      .appendTo(mapCntrSel);
    }

  }

  configSensors(dockCntrSel, mapCntrSel) {
    if (!this.sensorsCreated) {
      let $sensor;
      $.each(this.sensors, (sIx, sensorItem) => {
        $sensor = $(
          '<div class="sensor-circle docked signalicon-humidity">'
        )
          .html(sensorItem.name)
          .data('sIx', sIx)
          .data('dsIx', null)
          .appendTo(mapCntrSel);
        $sensor.data(
          'dockEl',
          $sensor
            .clone()
            .addClass('list-bkg')
            .appendTo(dockCntrSel)
            .data('dragEl', $sensor)
        );
        this.sensors[sIx]['sensorEl'] = $sensor;
        if (sensorItem.node) {
          $.each(sensorItem.node, (dsIx, dsItem) => {
            console.log(dsItem);
            const index = this.associatedSignals.findIndex(signal => {
              return signal.signalId === dsItem.id;
            });
            console.log(index);
            if (index === -1) {
              const self = this;
              $sensor = $(
                '<div class=\'sensor-circle secondary-ds docked signalicon-temperature\' id="' + dsItem.id + '">'
              )
                .data('sIx', sIx)
                .data('dsIx', dsIx)
                .appendTo(mapCntrSel)
                .on('click', function(ev) {
                  console.log('fghhjkhkl');
                  $(this).removeClass('pad-18');
                  $(this).children().show();
                  ev.stopPropagation();
                });
                // .on('mouseleave', function(ev) {
                //   $(this).children().hide();
                //   $(this).addClass('pad-18');
                //   ev.stopPropagation();
                // });
              $sensor.data(
                'dockEl',
                $sensor
                  .clone()
                  .html(dsItem.name)
                  .addClass('list-bkg')
                  .appendTo(dockCntrSel)
                  .data('dragEl', $sensor)
                  .on('mousedown', function(e) {
                    $(this)
                      .removeClass('docked')
                      .data('dragEl')
                      .removeClass('docked')
                      .offset({
                        left: $(this).offset().left,
                        top: $(this).offset().top
                      })
                      .trigger(
                        $.Event('mousedown', { pageX: e.pageX, pageY: e.pageY })
                      );
                    return false;
                  })
              );
              $sensor.append('<span id="signal-name-' + sIx + '-' + dsIx + '">' + dsItem.name + '</span>' )
                .append('<a id="signal-edit-btn-' + sIx + '-' + dsIx + '" style="width: 30px; height:30px;cursor:ponter;" ' +
                'class="icon-edit"></a>')
                .append('<a id="signal-alert-btn-' + sIx + '-' + dsIx + '" style="width: 30px; height:30px;cursor:ponter;"' +
                'class="icon-warn"></a>')
                .append('<a id="signal-detach-btn-' + sIx + '-' + dsIx + '" style="width: 30px; height:30px;cursor:ponter;" ' +
                'class="icon-unlink"></a>');
              $(document).on('mousedown', '#signal-edit-btn-' + sIx + '-' + dsIx, (evt) => {
                console.log('button clicked');
                const idsSplitList = evt.target.id.split('-');
                this.selectedSignal = this.sensors[idsSplitList[idsSplitList.length - 2]].node[idsSplitList[idsSplitList.length - 1]];
                console.log(this.selectedSignal.imageCoordinates.x);
                console.log(this.selectedSignal.imageCoordinates.y);
                $sensor.removeClass('pad-18');
                $sensor.children().show();
                this.editOPanel.toggle(evt);
                evt.preventDefault();

              });
              $sensor.removeClass('pad-18');
              $sensor.children().hide();
            } else {
              console.log(dsItem);
              $sensor = $(
                '<div class=\'sensor-circle secondary-ds signalicon-temperature pad-18\' id="' + dsItem.id + '">'
              )
                .data('sIx', sIx)
                .data('dsIx', dsIx)
                .appendTo(mapCntrSel)
                .on('click', function(ev) {
                  console.log('fghhjkhkl');
                  $(this).removeClass('pad-18');
                  $(this).children().show();
                  ev.stopPropagation();
                });
                // .on('mouseleave', function(ev) {
                //   $(this).children().hide();
                //   $(this).addClass('pad-18');
                //   ev.stopPropagation();
                // });
              $sensor.data(
                'dockEl',
                $sensor
                  .clone()
                  .removeClass('docked')
                  .html(dsItem.name)
                  .addClass('list-bkg')
                  .appendTo(dockCntrSel)
                  .data('dragEl', $sensor)
                  .on('mousedown', function(e) {
                    $(this)
                      .removeClass('docked')
                      .data('dragEl')
                      .removeClass('docked')
                      .offset({
                        left: $(this).offset().left,
                        top: $(this).offset().top
                      })
                      .trigger(
                        $.Event('mousedown', { pageX: e.pageX, pageY: e.pageY })
                      );
                    return false;
                  })
              );
              $sensor.css({
                left: this.associatedSignals[index].imageCoordinates.x,
                top: this.associatedSignals[index].imageCoordinates.y
              });
              $sensor.append('<span id="signal-name-' + sIx + '-' + dsIx + '-' + index + '">' + dsItem.name + '</span>' )
              .append('<a id="signal-edit-btn-' + sIx + '-' + dsIx + '-' + index + '" style="width: 30px; height:30px;cursor:ponter;" ' +
                'class="icon-edit"></a>')
                .append('<a id="signal-alert-btn-' + sIx + '-' + dsIx + '-' + index + '" style="width: 30px; height:30px;cursor:ponter;"' +
                'class="icon-warn"></a>')
                .append('<a id="signal-detach-btn-' + sIx + '-' + dsIx + '-' + index + '" style="width: 30px; height:30px;cursor:ponter;" ' +
                'class="icon-unlink"></a>');
              $  (document).on('mousedown', '#signal-edit-btn-' + sIx + '-' + dsIx + '-' + index , (evt) => {
                console.log('button clicked', evt.target.id);
                const idsSplitList = evt.target.id.split('-');
                this.selectedSignal = this.associatedSignals[idsSplitList[idsSplitList.length - 1]];
                console.log(this.selectedSignal.imageCoordinates.x);
                console.log(this.selectedSignal.imageCoordinates.y);
                evt.preventDefault();
                this.editOPanel.toggle(evt);
					      evt.stopPropagation();
                evt.cancelBubble = true;

              });
            //  $sensor.removeClass('pad-18');
              $sensor.children().hide();
            }
            this.sensors[sIx].node[dsIx]['sensorEl'] = $sensor;
          });
        }
      });
      $(mapCntrSel + ' .sensor-circle').drags();
      this.sensorsCreated = true;
    }
  }

  dropSensor($sensor) {
    const sIx = $sensor.data('sIx');
    const dsIx = $sensor.data('dsIx');
    console.log(sIx, '========', dsIx);
    let signalMappingIdFlag = false;
    const index = this.associatedSignals.findIndex(signal => {
      console.log('sixxxx     ', this.sensors[sIx].node[dsIx].id);
      console.log('sixxxx     ',  signal.signalId);
      return signal.signalId === this.sensors[sIx].node[dsIx].id;
    });
    console.log(index);
    if (index === -1) {
      if ($sensor.position().left < 0 || $sensor.position().top < 0) {
        $sensor
          .addClass('docked')
          .data('dockEl')
          .addClass('docked');
        this.sensors[sIx].node[dsIx].imageCoordinates.x = this.sensors[sIx].node[
          dsIx
        ].imageCoordinates.y = null;
      } else {
        this.sensors[sIx].node[dsIx].imageCoordinates.x =
          (parseInt($sensor.css('left'), 10) / ($sensor.parent().width() / 100)).toFixed(2) + '%';
        this.sensors[sIx].node[dsIx].imageCoordinates.y =
          (parseInt($sensor.css('top'), 10) / ($sensor.parent().height() / 100)).toFixed(2) + '%';
      }
      const sensorObj = { ...this.sensors[sIx].node[dsIx]};
      this.associatedSignals.push(sensorObj);
      // $('#map-cont-1 .sensor-circle').sensorPopover();
      console.log(this.sensors);
    } else {
      if ($sensor.position().left < 0 || $sensor.position().top < 0) {
        $sensor
          .addClass('docked')
          .data('dockEl')
          .addClass('docked');
        this.associatedSignals[index].imageCoordinates.x = this.associatedSignals[index].imageCoordinates.y = null;
        delete this.associatedSignals[index];
      } else {
        this.associatedSignals[index].imageCoordinates.x =
          (parseInt($sensor.css('left'), 10) / ($sensor.parent().width() / 100)).toFixed(2) + '%';
        this.associatedSignals[index].imageCoordinates.y =
          (parseInt($sensor.css('top'), 10) / ($sensor.parent().height() / 100)).toFixed(2) + '%';
      }
    }
    // this.updateSensors('#map-cont-1');
  }

  batteryPct(voltage) {
    // tslint:disable-next-line: max-line-length
    if (voltage > 3.0) { return '100'; } else if (voltage > 2.9) { return '75'; } else if (voltage > 2.7) { return '50'; } else if (voltage > 2.5) { return '25'; } else { return '0'; }
  }
  signalPct(signal) {
    // tslint:disable-next-line: max-line-length
    if (signal > 31.0) { return '100'; } else if (signal > 24.0) { return '75'; } else if (signal > 17.0) { return '50'; } else if (signal > 10.0) { return '25'; } else { return '0'; }
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
        name: signal.signalName,
        associationName: signal.associationName,
        signalMappingId: signal.signalMappingId ? signal.signalMappingId : undefined
      };
      obj.imageCordinates[signal.associationName] = signal.imageCoordinates;
      return obj;
    });
    this.locationSignalService.createSignalAssociation(data)
    .subscribe(
      response => {
        console.log(response);
        this.toaster.onSuccess('Signal associated successfully', 'Saved');
        this.getAllAvailableSignals();
        this.getLocationSignalAssociation();
      }, error => {
        this.toaster.onFailure('Error while saving signal assocition', 'Error');
      }
    );
  }

  onClickOfSaveSignalAssociationPanel() {
    console.log(this.selectedSignal);
    const index = this.associatedSignals.findIndex(
      signal => signal.id === this.selectedSignal.id
    );
    console.log(JSON.stringify(this.associatedSignals));
    if (index !== -1) {
      delete this.associatedSignals[index];
    }
    this.associatedSignals.push(this.selectedSignal);
    console.log(JSON.stringify(this.associatedSignals));
    const elem = $('#' + this.selectedSignal.id);
    elem.css({
      left: this.selectedSignal.imageCoordinates.x,
      top: this.selectedSignal.imageCoordinates.y
    });
    this.editOPanel.hide();
  }


  onCancelClick(event) {
    this.routerLocation.back();
  }

}
