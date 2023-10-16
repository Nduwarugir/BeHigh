import {Injectable} from "@angular/core";
import { ConnectionStatus } from "@capacitor/network";

@Injectable({
    providedIn: 'root'
})
export class GlobalsVariables {

    isConnected!: Boolean;
    isLoading = false;
    
    status!: ConnectionStatus;

    picoIp!: string;
}
