import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Asset } from 'src/app/models/asset.model';
import { Location as RouterLocation } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetSignalService } from 'src/app/services/assetSignal/asset-signal.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-votm-cloud-locations-gateway',
  templateUrl: './votm-cloud-locations-gateway.component.html',
  styleUrls: ['./votm-cloud-locations-gateway.component.scss']
})
export class VotmCloudLocationsGatewayComponent implements OnInit, OnDestroy {

  @ViewChild('op', null) panel: OverlayPanel;
  locationId: string; // to store selected asset's id.
  availableSignals: any[] = []; // to store list of available signals based on sensors.
  copyAvailableSignals: any[] = []; // to store list of available signals based on sensors.
  associatedSignals: any[] = [];
  draggedSignal: any; // to store dragged signal
  selectedSignal: any; // selected signal to display overlay panel.
  asset: Asset = new Asset(); // to store selected asset's data
  assetImageURL: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private routerLocation: RouterLocation,
    private assetSignalService: AssetSignalService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.locationId = this.activatedRoute.snapshot.params.locationId;
    this.getAllAvailableSignals();
    this.getAssetSignalAssociation();

  }

  getAllAvailableSignals() {
    this.assetSignalService.getAvailableSignals().subscribe(response => {
      console.log(response);
      this.availableSignals = [

        {
          id: '3fa85f64-5717-4562-b3fc-q2wergf',
          name: 'AA-BB-CC-DD',
          entityType: 'Sensor',

          image:
            '../assets/images/gateway.svg',

        }
      ];
      this.copyAvailableSignals = [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'ZZ-XX-FF-DD',
          entityType: 'Sensor',
          image:
            '../assets/images/gateway.svg',

        },
        {
          id: '3fa85f64-5717-4562-b3fc-q2wergf',
          name: 'AA-BB-CC-DD',
          entityType: 'Sensor',

          image:
            '../assets/images/gateway.svg',

        }
      ];
      setTimeout(() => {
        for (let i = 0; i < this.availableSignals.length; i++) {
            this.onClickOfAvailableSignals(i);
        }
      }, 200);
    });
  }

  onClickOfAvailableSignals(index1) {
    const li1 = document.getElementById('signal_' + index1);
    console.log(li1);
    li1.onmousedown = event => {
      this.panel.hide();
      console.log('on mouse down');
      const shiftX = event.clientX - li1.getBoundingClientRect().left;
      const shiftY = event.clientY - li1.getBoundingClientRect().top;

      li1.style.position = 'absolute';
      li1.style.zIndex = '1000';
      li1.classList.add('icon-class');
      document.body.append(li1);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        li1.style.left = pageX - shiftX + 'px';
        li1.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(e) {
        console.log('on mouse move');
        moveAt(e.pageX, e.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      li1.onmouseup = (ev) => {
        console.log('on mouse up');
        document.removeEventListener('mousemove', onMouseMove);
        console.log(
          li1.getBoundingClientRect().left,
          li1.getBoundingClientRect().top
        );
        li1.onmouseup = null;
        this.onSelectSignal(
          ev,
          this.availableSignals[index1]
        );
        console.log(li1.style.left, li1.style.top);
        console.log(li1.offsetLeft, li1.offsetTop);

        li1.addEventListener('mouseover', e => {
          console.log(index1);
          console.log(this.copyAvailableSignals);
          this.onSelectSignal(
            e,
            this.availableSignals[index1]
          );
        });

        const obj = { ...this.copyAvailableSignals[index1] };
        console.log(li1.parentElement.offsetWidth, '=========', li1.parentElement.offsetHeight);
        console.log(parseInt(li1.style.left, 10), '-=----', parseInt(li1.style.top, 10));
        obj.imageCoordinates = {
          x: (parseInt(li1.style.left, 10) / li1.parentElement.offsetWidth) * 100,
          y: (parseInt(li1.style.top, 10) / li1.parentElement.offsetHeight) * 100
        };
        this.associatedSignals.push(obj);
        console.log(JSON.stringify(this.associatedSignals));
        const index = this.availableSignals[index1].findIndex(
          signal =>
            signal.id === this.copyAvailableSignals[index1].id
        );
        this.availableSignals[index1].splice(index, 1);
        li1.removeAttribute('id');
      };
    };

    li1.ondragstart = () => {
      console.log('on drag start');
      return false;
    };
  }

  isSignalDisabled(signal) {
    const index = this.associatedSignals.findIndex(
      signalObj => signalObj.id === signal.id
    );
    return index !== -1 ? true : false;
  }

  getAssetSignalAssociation() {
    this.associatedSignals = [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          name: 'ZZ-XX-FF-DD',
          entityType: 'Sensor',
          image:
            '../assets/images/gateway.svg',

        imageCoordinates: {
          x: 65.88,
          y: 44.87
        }
      }
    ];

    setTimeout(() => {
      for (let i = 0; i < this.associatedSignals.length; i++) {
        console.log('here');
        const img = document.createElement('img');
        img.src = this.associatedSignals[i].image;
        img.id = 'icon_' + i;
        img.classList.add('icon-class');


        img.style.position = 'absolute';
        img.style.width = '40px';
        img.style.cursor = 'pointer';
        img.addEventListener('mouseover', event => {
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


            const iconIdList = (ev.target['id']).split('_');
            this.associatedSignals[iconIdList[1]].imageCoordinates = {
              x: (parseInt(img.style.left, 10) / img.parentElement.offsetWidth) * 100,
              y: (parseInt(img.style.top, 10) / img.parentElement.offsetHeight) * 100
            };
            // console.log(img.parentElement.offsetWidth, '=========', img.parentElement.offsetHeight);
            // console.log(parseInt(img.style.left, 10), '-=----', parseInt(img.style.top, 10));
            // obj.imageCoordinates = {
            //   x: (parseInt(img.style.left, 10) / img.parentElement.offsetWidth) * 100,
            //   y: (parseInt(img.style.top, 10) / img.parentElement.offsetHeight) * 100
            // };
            // this.associatedSignals.push(obj);
            // console.log(JSON.stringify(this.associatedSignals));
            // const index = this.availableSignals[index1].node.findIndex(
            //   signal =>
            //     signal.id === this.copyAvailableSignals[index1].node[index2].id
            // );
            // this.availableSignals[index1].node.splice(index, 1);
            // img.removeAttribute('id');
          };
        };

        img.ondragstart = () => {
          console.log('on drag start');
          return false;
        };
        // img.style.top = this.associatedSignals[i].imageCoordinates.y + '%';
        // img.style.left = this.associatedSignals[i].imageCoordinates.x + '%';
        console.log(img.style.top, '=====', img.style.left);
        document.body.appendChild(img);
        console.log(document.body.offsetWidth, '=========', document.body.offsetHeight);


        // img.parent().css({position: 'relative'});
      }
    }, 200);
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
    this.panel.show(event);
  }

  onDetachSignalFromAsset() {
    console.log('here');
    const index = this.associatedSignals.findIndex(
      signal => signal.id === this.selectedSignal.id
    );
    document.body.removeChild(document.getElementById('icon_' + index));
    this.associatedSignals.splice(index, 1);
    let index1;
    for (let i = 0; i < this.copyAvailableSignals.length; i++) {
      for (let j = 0; j < this.copyAvailableSignals[i].node.length; j++) {
        if (
          this.copyAvailableSignals[i].node[j].id === this.selectedSignal.id
        ) {
          index1 = i;
          const obj = { ...this.copyAvailableSignals[i].node[j] };
          delete obj.imageCoordinates;
          console.log('heere');
          this.availableSignals[i].node.push(obj);
        }
      }
    }
    setTimeout(() => {
      const index2 = this.availableSignals.findIndex(sensor =>
        sensor.node.findIndex(signal => signal.id === this.selectedSignal.id)
      );
      console.log(this.availableSignals);
      console.log(index1, index2);
      this.onClickOfAvailableSignals(index1);
      this.panel.hide();
      this.selectedSignal = undefined;
    }, 200);
  }

  onClickOfCreateAssociateRule() {
    this.route.navigate(['alerts', 'home']);
  }

  ngOnDestroy() {
    this.removeImgsFromDOM();
  }

}
