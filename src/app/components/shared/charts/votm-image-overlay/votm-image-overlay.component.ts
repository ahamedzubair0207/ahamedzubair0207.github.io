import { LocationSignalService } from './../../../../services/locationSignal/location-signal.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Toaster } from '../../votm-cloud-toaster/votm-cloud-toaster';

@Component({
  selector: 'app-votm-image-overlay',
  templateUrl: './votm-image-overlay.component.html',
  styleUrls: ['./votm-image-overlay.component.scss']
})
export class VotmImageOverlayComponent implements OnInit {


  customizeImageOverlay: any;
  isImageOverlayConfigured: boolean;
  toaster: Toaster = new Toaster(this.toastr);
  associatedSignals: any[];
  constructor(
    private toastr: ToastrService,
    private locationSignalService: LocationSignalService
  ) {

  }

  ngOnInit() {
    this.isImageOverlayConfigured = false;
  }

  onClickOfCustomizeImageOverlay() {
    // Open Chart configuration modal popup
    const modal = document.getElementById('configure-image-overlay-modal');
    modal.style.display = 'block';
    this.customizeImageOverlay = document.getElementById('configure-image-overlay-modal');
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  onClickOfCustomizeImageOverlayModalClose() {
    // Close modal popup
    this.customizeImageOverlay.style.display = 'none';
  }

  onChangeOverlaySource(event) {
    if (event === 'location') {
      $('#overlaySourceLocation, #locationsList').removeClass('d-none');
      $('#overlaySourceAsset, #assetsList').addClass('d-none');
    } else if (event === 'asset') {
      $('#overlaySourceAsset, #assetsList').removeClass('d-none');
      $('#overlaySourceLocation, #locationsList').addClass('d-none');
    }
  }

  getImageOverlayConfiguration() {

    // Call service to get configured image overlay data 
    // this.widgetService.getImageOverlayConfiguration().subscribe(
    //   response => {
    //     this.isImageOverlayConfigured = true;
    //   }, error => {
    //     this.isImageOverlayConfigured = false;
    //   }
    // );
    this.isImageOverlayConfigured = true;


    this.locationSignalService.getSignalAssociation('1387c6d3-cabc-41cf-a733-8ea9c9169831')
      .subscribe(
        response => {

          for (let i = 0; i < response.length; i++) {
            const signal = response[i];
            signal.imageCordinates = signal.imageCordinates[signal.associationName];
            signal.pos = {};
            signal.pos['left'] = signal.imageCordinates.x;
            signal.pos['top'] = signal.imageCordinates.y;
            signal.isClicked = false;
            signal.icon = 'icon-sig-humidity';
            signal.associated = true;
            signal.id = i;
          }
          this.associatedSignals = [...response];
        },
        error => {

        }
      );
}

getPositionStyle(signal) {
  const style = {
    left: 'calc(' + signal.pos.left + '% - 16px)',
    top: 'calc(' + signal.pos.top + '% - 16px)'
  };
  return style;
}

saveImageOverlayConfiguration() {
  this.customizeImageOverlay.style.display = 'none';
  this.toaster.onSuccess('Chart Configured Successfully', 'Success');
  // Call services to save image overlay configuration data
  // this.widgetService.addImageOverlayConfiguration(imageOvelayConfigureObj).subscribe(
  //   response => {
  //     this.toaster.onSuccess('Widget Configured Successfully', 'Success');
  //     this.onClickOfCustomizeImageOverlayModalClose();
  //     this.getChartConfiguration();
  //   }, error => {
  //     this.toaster.onFailure('Error in Widget Configuration', 'Failure');
  //     this.onClickOfCustomizeImageOverlayModalClose();
  //   }
  // );
  this.getImageOverlayConfiguration();
  setTimeout(() => {
    console.log('image overlay called');

  }, 500);
}

}
