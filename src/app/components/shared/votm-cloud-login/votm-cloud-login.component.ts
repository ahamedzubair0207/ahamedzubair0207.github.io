import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as OktaSignIn from '@okta/okta-signin-widget';
import sampleConfig from '../../../pcm.configuration';


@Component({
  selector: 'app-votm-cloud-login',
  templateUrl: './votm-cloud-login.component.html',
  styleUrls: ['./votm-cloud-login.component.scss']
})
export class VotmCloudLoginComponent implements OnInit {

  signIn: any;
  Token:any;

  constructor(private router: Router)
  {
    this.signIn = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an ODIC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: sampleConfig.oidc.issuer.split('/oauth2')[0],
      clientId: sampleConfig.oidc.clientId,
      redirectUri: sampleConfig.oidc.redirectUri,
      logo: '', // /assets/VOTM_login_logo.png
      i18n: {
        en: {
       
        },
      },
      authParams: {
        responseType: ['id_token', 'token'],
        issuer: sampleConfig.oidc.issuer,
        display: 'page',
        scopes: sampleConfig.oidc.scope.split(' '),
      },
    });

   }

   ngOnInit() {
    this.signIn.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      (err) => {
        throw err;
      },
    );
  }

  // Login(){
  //   this.Token = window.location.href;
  //   localStorage.setItem('token',this.Token);
  //   this.router.navigateByUrl('/view/home');
  // }

}

