import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as SignalR from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  signalData: Subject<string> = new Subject();
  private hubConnection: SignalR.HubConnection;
  signalRURL = environment.protocol + '://' + environment.signalRURL + '/api/negotiate';

  constructor(private http: HttpClient) { }

  getSignalRConnection(connectionString) {
    // console.log(connectionString);
    this.http.get<any>(this.signalRURL)
    .subscribe(con => {
      const options = {
        accessTokenFactory: () => con.accessToken
      };

      this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(con.url, options)
      .configureLogging(SignalR.LogLevel.Information)
      .build();
      // connectionString = '7a59bdd8-6e1d-48f9-a961-aa60b2918dde*1387c6d3-cabc-41cf-a733-8ea9c9169831';
      this.hubConnection.on(connectionString, data => {
        this.signalData.next(data);
      });

      this.hubConnection.start()
        .then(success => console.log('connected successfully'))
        .catch(error => console.error(error));

      this.hubConnection.serverTimeoutInMilliseconds = 300000;
      this.hubConnection.keepAliveIntervalInMilliseconds = 300000;
    });
  }

  closeSignalRConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop()
      .then(success => console.log('disconnected successfully'))
          .catch(error => console.error(error));
    }
  }
}
