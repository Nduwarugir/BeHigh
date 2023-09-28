import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { IScenario } from 'src/app/model/scenario';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    constructor(private httpClient: HttpClient) { }

    private readonly API_URL = "http://192.168.1.117";

    private readonly ENDPOINT_SEND = "/valid";

    private readonly ENDPOINT_READ = "/";

    // Teacher's operations
    sendConfiguration(scenario: FormData): Observable<FormData> {
        tap(scenario => console.log("Scenario: ", scenario))
        catchError(this.handleError);
        return this.httpClient.post<FormData>(this.API_URL + this.ENDPOINT_SEND, scenario);
    }

    readDatas(fileName: string) {
        tap(name => console.log("fileName: ", name))
        catchError(this.handleError);
        return this.httpClient.get(this.API_URL + this.ENDPOINT_READ + fileName);
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error("An error has occured", error.error.message);
        } else {
            console.error(
                `Back error code: ${error.status}`,
                `Error body: ${error.error}`
            );
        }
        return throwError('Try again later please');
    }
}
