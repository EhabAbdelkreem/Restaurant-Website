import { Injectable, NgZone, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrderModel } from '../ViewModels/iorder-model';


@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    public data: BehaviorSubject<IOrderModel>;
    public hasRemoteConnection: boolean;
    private hubConnection!: signalR.HubConnection;
    public successSend:boolean=false;
    public successRecive:boolean=false;
    public notification = false;
    

    constructor() {
        this.data = new BehaviorSubject({} as IOrderModel);
        this.startConnection();
    }


    public startConnection = (): void => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Trace)
            .withUrl(`http://localhost:24637/hubOrder`,{
              skipNegotiation: true,
              transport: signalR.HttpTransportType.WebSockets
            })
            .build();
            

        this.hubConnection
            .start()
            .then(() => {
                this.hasRemoteConnection = true;
                this.registerSignalEvents();
            })
            .catch(() => {
               this.hubConnection.start();
            });
    };

    public broadcastParams = (order:IOrderModel): void => {
        this.hubConnection.invoke<IOrderModel>('SendOrder',order)
            .then((res) =>{
                this.successSend = true
            })
            .catch(err => {
                this.successSend = false;
            });
    };

    // Register signalR events
    private registerSignalEvents(): void {
        this.hubConnection.onclose(() => {
            this.hasRemoteConnection = false;
            this.hubConnection.start();
        });
        this.hubConnection.on('ReceiveOrder', (order:IOrderModel) => {
            
                this.notification = true;
                this.data.next(order);
        });
    }
}

// //#region 
// export class SignalrService {
//     public data: ChartModel[];
//     public connectionId: string;
//     public bradcastedData: ChartModel[];
  
//     private hubConnection: signalR.HubConnection
//       public startConnection = () => {
//         this.hubConnection = new signalR.HubConnectionBuilder()
//                                 .withUrl('https://localhost:5001/chart')
//                                 .build();
//         this.hubConnection
//           .start()
//           .then(() => console.log('Connection started'))
//           .then(() => this.getConnectionId())
//           .catch(err => console.log('Error while starting connection: ' + err))
//       }
  
//       ...
  
//       private getConnectionId = () => {
//         this.hubConnection.invoke('getconnectionid')
//         .then((data) => {
//           console.log(data);
//           this.connectionId = data;
//         });
//       }
  
//       public broadcastChartData = () => {
//         const data = this.data.map(m => {
//           const temp = {
//             data: m.data,
//             label: m.label
//           }
//           return temp;
//         });
  
//         this.hubConnection.invoke('broadcastchartdata', data, this.connectionId)
//         .catch(err => console.error(err));
//       }
  
//   }
// //#endregion


