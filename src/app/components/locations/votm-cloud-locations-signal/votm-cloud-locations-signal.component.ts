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
      console.log($elements);
      $elements.css('cursor', opt.cursor).on('mousedown', function(e) {
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
          }).on('mouseup', function() {
              $(this).off('mousemove'); // Unbind events from document
              if ($selected !== null) {
                  $selected.removeClass(opt.draggableClass);
                  $selected.css('left', parseInt($selected.css('left'), 10) / ($selected.parent().width() / 100) + '%');
                  $selected.css('top', parseInt($selected.css('top'), 10) / ($selected.parent().height() / 100) + '%');
                  console.log('doucment mouse up');
                  if (self.dropSensor) {
                    console.log($selected);
                    console.log($selected.data('sIx'));
                    console.log($selected.data('dsIx'));
                    self.dropSensor($selected);
                  }
                  $selected = null;
              }
          });
          e.preventDefault(); // disable selection
      }).on('mouseup', () => {
          if (opt.handle === '') {
              $selected.removeClass(opt.draggableClass);
          } else {
              $selected.removeClass(opt.draggableClass)
                  .find(opt.handle).removeClass(opt.activeHandleClass);
          }
          console.log('element mouse up');
          console.log($selected);
          console.log($selected.data('sIx'));
          console.log($selected.data('dsIx'));
          $selected.css('left', parseInt($selected.css('left'), 10) / ($selected.parent().width() / 100) + '%');
          $selected.css('top', parseInt($selected.css('top'), 10) / ($selected.parent().height() / 100) + '%');
          console.log(self.dropSensor);
          if (self.dropSensor) {
            console.log('in drop sensor if');
            self.dropSensor($selected);
          }
          $selected = null;
      });

      return this;

  };
    $.fn.sensorPopover = function(options) {
      return this.each(function() {
        $(this).on('mouseenter', function() {
          if (!$(this).hasClass('popover-showing')) {
            const classes = $(this)
              .attr('class')
              .match(/[\w-]*(alert-|signalicon-|-offline)[\w-]*\b/g);
            const $sensor = $(this);
            const $popover = $('<div class=\'sensor-popover\'></div>')
              .html($sensor.attr('data-content'))
              .css({ left: 0, top: 0, visibility: 'hidden' })
              .addClass(classes ? classes.join(' ') : '')
              .on('mouseleave', function() {
                $(this).remove();
                $sensor.show().removeClass('popover-showing');
              })
              .appendTo($('body'));
            if (
              $sensor.offset().top + $popover.outerHeight() >
              $popover.parent().offset().top + $popover.parent().outerHeight()
            ) {
              $popover.css({
                top:
                  $sensor.offset().top +
                  $sensor.outerHeight() -
                  $popover.outerHeight()
              });
            } else {
              $popover.css({ top: $sensor.offset().top });
            }
            if (
              $sensor.offset().left + $popover.outerWidth() >
              $popover.parent().offset().left + $popover.parent().outerWidth()
            ) {
              $popover.css({
                left:
                  $sensor.offset().left +
                  parseFloat(
                    window.getComputedStyle($sensor[0], ':after').width
                  ) -
                  $popover.outerWidth()
              });
            } else {
              $popover.css({ left: $sensor.offset().left });
            }
            $popover.css({ visibility: 'visible' });
            $sensor.hide();
          }
        });
      });
    };

    $(document).on('mousedown', '#signal-edit-btn', (e) => {
      console.log('hello world');
      e.stopPropagation();
    });
    $(document).on('mouseup', '#signal-edit-btn', (e) => {
      console.log('hello world mouse up');
      e.stopPropagation();
    });
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
          if (index !== -1) {
            const sensorDivElem =  document.getElementById('signalDiv_' + i + '_' + j);
            if (sensorDivElem) {
              sensorDivElem.classList.remove('docked');
            }
          } else {
            // this.onClickOfAvailableSignals(i, j);
          }
        }
      }
      this.copyAvailableSignals = JSON.parse(JSON.stringify(this.sensors));
      console.log(this.copyAvailableSignals);
      this.configSensors('#sensor-cont', '#map-cont-1');
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
        this.associatedSignals = response;
        this.getAllAvailableSignals();
        this.isGetAssociatedSignalsAPILoading = false;
        setTimeout(() => {

        }, 200);
      },
      error => {
        this.isGetAssociatedSignalsAPILoading = false;
      }
    );
  }



  configSensors(dockCntrSel, mapCntrSel) {
    console.log(this.sensors);
    if (!this.sensorsCreated) {
      let $sensor;
      $.each(this.sensors, (sIx, sensorItem) => {
        $sensor = $(
          '<div class=\'sensor-circle docked signalicon-temperature\'>'
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
            // .on('mousedown', function(e) {
            //   $(this)
            //     .removeClass('docked')
            //     .data('dragEl')
            //     .removeClass('docked')
            //     .offset({
            //       left: $(this).offset().left,
            //       top: $(this).offset().top
            //     })
            //     .trigger(
            //       $.Event('mousedown', { pageX: e.pageX, pageY: e.pageY })
            //     );
            //   return false;
            // })
        );
        this.sensors[sIx].sensorEl = $sensor;
        if (sensorItem.node.length > 0) {
          $.each(sensorItem.node, (dsIx, dsItem) => {
            const index = this.associatedSignals.findIndex(
              signal => signal.signalId === this.sensors[sIx].node[dsIx].id
            );
            console.log(index);
            $sensor = $(
              '<div class=\'sensor-circle secondary-ds signalicon-humidity\'>'
            )
              .data('sIx', sIx)
              .data('dsIx', dsIx)
              .appendTo(mapCntrSel)
              .on('mouseover', function(ev) {
                $('#signal-name').show();
                $('#signal-edit-btn').show();
                $('#signal-alert-btn').show();
                $('#signal-detach-btn').show();
                $(this).removeClass('pad-18');
                ev.stopPropagation();
              }).on('mouseleave', function(ev) {
                $('#signal-name').hide();
                $('#signal-edit-btn').hide();
                $('#signal-alert-btn').hide();
                $('#signal-detach-btn').hide();
                $(this).addClass('pad-18');
                ev.stopPropagation();
              });
            
            $sensor.data(
              'dockEl',
              $sensor
                .clone()
                .html(dsItem.name)
                .addClass('list-bkg docked')
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
            $sensor.append('<span id="signal-name">' + dsItem.name + '</span>' 
            + '<a id="signal-edit-btn" style="width: 30px; height:30px;" class="icon-edit"></a>'
            + '<a id="signal-alert-btn" style="width: 30px; height:30px;" class="icon-warn"></a>'
            + '<a id="signal-detach-btn" style="width: 30px; height:30px;" class="icon-unlink"></a>')
            .append();
            $('#signal-name').hide();
            $('#signal-edit-btn').hide();
            $('#signal-alert-btn').hide();
            $('#signal-detach-btn').hide();
            $sensor.addClass('pad-18');
            if (index !== -1) {
              $sensor.clone()
              .css({
                left: this.associatedSignals[index].imageCoordinates.x,
                top: this.associatedSignals[index].imageCoordinates.y
              })
              .data('sIx', sIx)
              .data('dsIx', dsIx)
              .appendTo(mapCntrSel);
             // $sensor.removeClass('docked');
              console.log($sensor.data('sIx'));
              console.log($sensor.data('dsIx'));
            }
            this.sensors[sIx].node[dsIx].sensorEl = $sensor;
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
    console.log('sixxxx     ', this.sensors[sIx]);
    const index = this.associatedSignals.findIndex(signal =>
      signal.signalId === this.sensors[sIx].node[dsIx].id);
    if (index === -1) {
      if ($sensor.position().left < 0) {
        $sensor
          .addClass('docked')
          .data('dockEl')
          .addClass('docked');
        this.sensors[sIx].node[dsIx].imageCoordinates.x = this.sensors[sIx].node[
          dsIx
        ].imageCoordinates.y = null;
      } else {
        this.sensors[sIx].node[dsIx].imageCoordinates.x =
          parseInt($sensor.css('left'), 10) / ($sensor.parent().width() / 100) + '%';
        this.sensors[sIx].node[dsIx].imageCoordinates.y =
          parseInt($sensor.css('top'), 10) / ($sensor.parent().height() / 100) + '%';
      }
      const sensorObj = { ...this.sensors[sIx].node[dsIx]};
      this.associatedSignals.push(sensorObj);
      // $('#map-cont-1 .sensor-circle').sensorPopover();
      console.log(this.sensors);
    } else {
      if ($sensor.position().left < 0) {
        $sensor
          .addClass('docked')
          .data('dockEl')
          .addClass('docked');
        this.associatedSignals[index].imageCoordinates.x = this.associatedSignals[index].imageCoordinates.y = null;
      } else {
        this.associatedSignals[index].imageCoordinates.x =
          parseInt($sensor.css('left'), 10) / ($sensor.parent().width() / 100) + '%';
        this.associatedSignals[index].imageCoordinates.y =
          parseInt($sensor.css('top'), 10) / ($sensor.parent().height() / 100) + '%';
      }
    }
    // this.updateSensors('#map-cont-1');
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


}
