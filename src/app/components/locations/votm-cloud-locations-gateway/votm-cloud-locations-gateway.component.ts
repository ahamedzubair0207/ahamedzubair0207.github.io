import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Asset } from 'src/app/models/asset.model';
import { Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetSignalService } from 'src/app/services/assetSignal/asset-signal.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationSignalService } from '../../../services/locationSignal/location-signal.service';
declare var $: any;
@Component({
  selector: 'app-votm-cloud-locations-gateway',
  templateUrl: './votm-cloud-locations-gateway.component.html',
  styleUrls: ['./votm-cloud-locations-gateway.component.scss']
})
export class VotmCloudLocationsGatewayComponent implements OnInit {

  sensors = [
    {
      sensorId: 'Base Cooling Humidity',
      status: 'online',
      type: 'Humidity',
      lastReading: [1437943527, 49.8, '%'],
      battery: 2.99,
      signal: 19.0,
      alertLevel: 'ok',
      alertMsg: null,
      secondaryDS: [
        {
          type: 'Dew Point',
          lastReading: [1437943527, 53.03, '°F'],
          alertLevel: 'ok',
          alertMsg: null
        },
        {
          type: 'Temperature',
          lastReading: [1437943527, 72.86, '°F'],
          alertLevel: 'ok',
          alertMsg: null
        } /*,
        {"type": "Battery", "lastReading": [1437943527, 2.990, "V"],
          "alertLevel": "info", "alertMsg": "<b>Informational Alert: {{alert name}}</b><br><i>Battery voltage below 3V</i>"},
        {"type": "Signal Strength", "lastReading": [1437943527, 19.000, ""], "alertLevel": null, "alertMsg": null}*/
      ]
    },
    {
      sensorId: 'Control Center Temperature',
      status: 'online',
      type: 'Temperature',
      lastReading: [1437944351, 70.34, '°F'],
      battery: 3.01,
      signal: 13.0,
      alertLevel: 'warning',
      alertMsg:
        '<b>Warning Alert: {{alert name}} triggered</b><br>Upper threshold of 65.0°F exceeded.' /*,
      "secondaryDS": [
        {"type": "Battery", "lastReading": [1437944351, 3.010, "V"], "alertLevel": "ok", "alertMsg": null},
        {"type": "Signal Strength", "lastReading": [1437944351, 13.000, ""], "alertLevel": null, "alertMsg": null}
      ]*/
    },
    {
      sensorId: 'Office Temperature',
      status: 'online',
      type: 'Temperature',
      lastReading: [1437944789, 76.1, '°F'],
      battery: 3.01,
      signal: 33.0,
      alertLevel: 'alarm',
      alertMsg:
        '<b>Critical Alert: {{alert name}} triggered</b><br>Upper threshold of 75.0°F exceeded.' /*,
      "secondaryDS": [
        {"type": "Battery", "lastReading": [1437944789, 3.010, "V"], "alertLevel": "ok", "alertMsg": null},
        {"type": "Signal Strength", "lastReading": [1437944789, 33.000, ""], "alertLevel": null, "alertMsg": null}
      ]*/
    },
    {
      sensorId: '25mm Flow Sensor',
      status: 'online',
      type: 'Flow',
      lastReading: [1437658605, '—', ' SCFM'],
      battery: 2.57,
      signal: 21.0,
      alertLevel: 'info',
      alertMsg:
        '<b>Informational Alert: Low Flow</b><br><i>Flow rate is below acurate measurement limit.</i>',
      secondaryDS: [
        {
          type: 'Temperature',
          lastReading: [1437658605, 97.294, '°F'],
          alertLevel: 'ok',
          alertMsg: null
        },
        {
          type: 'Absolute Pressure',
          lastReading: [1437658605, 158.337, 'psi'],
          alertLevel: 'ok',
          alertMsg: null
        },
        {
          type: 'Differential Pressure',
          lastReading: [1437658605, 0.003, 'psi'],
          alertLevel: 'ok',
          alertMsg: null
        } /*,
        {"type": "Battery", "lastReading": [1437658605, 2.570, "V"], "alertLevel": "ok", "alertMsg": null},
        {"type": "Signal Strength", "lastReading": [1437658605, 21.000, ""], "alertLevel": null, "alertMsg": null}*/
      ]
    },
    {
      sensorId: 'Plant Temperature',
      status: 'offline',
      type: 'Temperature',
      lastReading: [1434356256, 76.1, '°F'],
      battery: 3.01,
      signal: 33.0,
      alertLevel: 'ok',
      alertMsg: null /*,
      "secondaryDS": [
        {"type": "Battery", "lastReading": [1434356256, 3.010, "V"], "alertLevel": "ok", "alertMsg": null},
        {"type": "Signal Strength", "lastReading": [1434356256, 33.000, ""], "alertLevel": null, "alertMsg": null}
      ]*/
    }
  ];
  sensorsCreated = null;

  sensorCharCode = {
    Temperature: 'E802',
    Humidity: 'E801',
    'Dew Point': 'E807',
    Battery: 'E803',
    'Signal Strength': 'E804'
  };

  constructor() { }

  ngOnInit() {


  }

  ngAfterViewInit() {
    
    $.fn.drags = function(opt) {

      opt = $.extend({
          handle: '',
          cursor: 'move',
          draggableClass: 'draggable',
          activeHandleClass: 'active-handle'
      }, opt);

      let $selected = null;
      const $elements = (opt.handle === '') ? this : this.find(opt.handle);

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
                  if (this.dropSensor) {
                    this.dropSensor($selected);
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
          $selected.css('left', parseInt($selected.css('left'), 10) / ($selected.parent().width() / 100) + '%');
          $selected.css('top', parseInt($selected.css('top'), 10) / ($selected.parent().height() / 100) + '%');
          if (this.dropSensor) {
            this.dropSensor($selected);
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
    this.configSensors('#sensor-cont-2', '#map-cont-2');
  }


  configSensors(dockCntrSel, mapCntrSel) {
    if (!this.sensorsCreated) {
      let $sensor;
      $.each(this.sensors, (sIx, sensorItem) => {
        $sensor = $(
          '<div class=\'sensor-circle docked signalicon-' +
            sensorItem.type.replace(' ', '-').toLowerCase() +
            '\'>'
        )
          .html(sensorItem.sensorId)
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
        this.sensors[sIx]['sensorEl'] = $sensor;
        if (sensorItem.secondaryDS) {
          $.each(sensorItem.secondaryDS, (dsIx, dsItem) => {
            $sensor = $(
              '<div class=\'sensor-circle secondary-ds docked signalicon-' +
                dsItem.type.replace(' ', '-').toLowerCase() +
                '\'>'
            )
              .html(dsItem.type)
              .data('sIx', sIx)
              .data('dsIx', dsIx)
              .appendTo(mapCntrSel);
            $sensor.data(
              'dockEl',
              $sensor
                .clone()
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
            this.sensors[sIx].secondaryDS[dsIx]['sensorEl'] = $sensor;
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

    if (dsIx == null) {
      if ($sensor.position().left < 0) {
        $sensor
          .addClass('docked')
          .data('dockEl')
          .addClass('docked');
        this.sensors[sIx]['mapX'] = this.sensors[sIx]['mapY'] = null;
      } else {
        this.sensors[sIx]['mapX'] =
          parseInt($sensor.css('left'), 10) / ($sensor.parent().width() / 100) + '%';
        this.sensors[sIx]['mapY'] =
          parseInt($sensor.css('top'), 10) / ($sensor.parent().height() / 100) + '%';
      }
    } else {
      if ($sensor.position().left < 0) {
        $sensor
          .addClass('docked')
          .data('dockEl')
          .addClass('docked');
        this.sensors[sIx].secondaryDS[dsIx]['mapX'] = this.sensors[sIx].secondaryDS[
          dsIx
        ]['mapY'] = null;
      } else {
        this.sensors[sIx].secondaryDS[dsIx]['mapX'] =
          parseInt($sensor.css('left'), 10) / ($sensor.parent().width() / 100) + '%';
        this.sensors[sIx].secondaryDS[dsIx]['mapY'] =
          parseInt($sensor.css('top'), 10) / ($sensor.parent().height() / 100) + '%';
      }
    }
    $('#map-cont-2 .sensor-circle').sensorPopover();
  }

  batteryPct(voltage) {
    if (voltage > 3.0) {
      return '100';
    } else if (voltage > 2.9) {
      return '75';
    } else if (voltage > 2.7) {
      return '50';
    } else if (voltage > 2.5) {
      return '25';
    } else {
      return '0';
    }
  }

  signalPct(signal) {
    if (signal > 31.0) {
      return '100';
    } else if (signal > 24.0) {
      return '75';
    } else if (signal > 17.0) {
      return '50';
    } else if (signal > 10.0) {
      return '25';
    } else {
      return '0';
    }
  }

  updateSensors(sel) {
    let reading = '';
    let sensorStatusTemplate = '';
    $(sel + ' .sensor-circle').remove();

    $.each(this.sensors, (sIx, sensorItem) => {
      sensorStatusTemplate =
        '<div class=\'sensor-status\'>' +
        (sensorItem.battery
          ? '<i class=\'signalicon-battery-' +
          this.batteryPct(sensorItem.battery) +
            '\' title=\'' +
            sensorItem.battery +
            'V\'>&nbsp;</i>'
          : '') +
        (sensorItem.signal
          ? '<i class=\'signalicon-signal-' +
          this.signalPct(sensorItem.signal) +
            '\' title=\'' +
            sensorItem.signal +
            '\'>&nbsp;</i>'
          : '') +
        '</div>';
      if (sensorItem.mapX) {
        reading =
          (isNaN(sensorItem.lastReading[1])
            ? sensorItem.lastReading[1]
            : sensorItem.lastReading[1].toFixed(2)) + sensorItem.lastReading[2];
        $(
          '<div class=\'sensor-circle signalicon-' +
            sensorItem.type.replace(' ', '-').toLowerCase() +
            '\'>'
        )
          .html(reading)
          .attr(
            'data-content',
            '<b><a href=\'#\'>' +
              sensorItem.sensorId +
              '</a></b><br>' +
              (sensorItem.status === 'offline'
                ? '<b><i>Sensor appears to be offline.</i></b><br>Last reading: '
                : '') +
              'sadfgh' +
              '<br>' +
              sensorItem.type +
              ': ' +
              reading +
              (sensorItem.alertMsg ? '<br>' + sensorItem.alertMsg : '') +
              sensorStatusTemplate
          )
          .css({ left: sensorItem.mapX, top: sensorItem.mapY })
          .addClass(sensorItem.alertLevel ? 'alert-' + sensorItem.alertLevel : '')
          .addClass(
            sensorItem.status === 'offline' ? 'sensor-' + sensorItem.status : ''
          )
          .appendTo(sel);
      }
      if (sensorItem.secondaryDS) {
        $.each(sensorItem.secondaryDS, (dsIx, dsItem) => {
          if (dsItem.mapX) {
            reading =
              (isNaN(dsItem.lastReading[1])
                ? dsItem.lastReading[1]
                : dsItem.lastReading[1].toFixed(2)) + dsItem.lastReading[2];
            $(
              '<div class=\'sensor-circle signalicon-' +
                dsItem.type.replace(' ', '-').toLowerCase() +
                '\'>'
            )
              .html(reading)
              .attr(
                'data-content',
                '<b><a href=\'#\'>' +
                  sensorItem.sensorId +
                  '</a></b><br>' +
                  (sensorItem.status === 'offline'
                    ? '<b><i>Sensor appears to be offline.</i></b><br>Last reading: '
                    : '') +
                  'asdfghjk,' +
                  '<br>' +
                  dsItem.type +
                  ': ' +
                  reading +
                  (dsItem.alertMsg ? '<br>' + dsItem.alertMsg : '') +
                  sensorStatusTemplate
              )
              .css({ left: dsItem.mapX, top: dsItem.mapY })
              .addClass(dsItem.alertLevel ? 'alert-' + dsItem.alertLevel : '')
              .addClass(
                sensorItem.status === 'offline'
                  ? 'sensor-' + sensorItem.status
                  : ''
              )
              .appendTo(sel);
          }
        });
      }
    });
    $(sel + ' .sensor-circle').sensorPopover();
  }




}
