import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { IScenario } from 'src/app/model/scenario';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { IFile } from 'src/app/model/file';
import { IAnim } from 'src/app/model/amin';
import { IFont } from 'src/app/model/font';

@Injectable({
    providedIn: 'root',
})
export class ScenarioService {

    constructor(private httpClient: HttpClient) { }

    private readonly API_URL = "http://192.168.1.117";
    // private readonly API_URL = "http://10.1.1.1";
    // private readonly API_URL = "assets/json";

    private readonly ENDPOINT_SEND = "/valid";

    private readonly ENDPOINT_READ_FILE = "/jsonFiles/";

    // Scenario's operations
    sendConfiguration(scenario: FormData): Observable<IScenario> {
        tap(scenario => console.log("Scenario: ", scenario))
        catchError(this.handleError);
        return this.httpClient.post<IScenario>(this.API_URL + this.ENDPOINT_SEND, scenario);
    }

    readScenario():Observable<IScenario[]> {
        tap(name => console.log("fileName: ", name))
        catchError(this.handleError);
        return this.httpClient.get<IScenario[]>(this.API_URL + this.ENDPOINT_READ_FILE + 'scenario.json');
    }

    readFile(fileName: string):Observable<IFile[]> {
        tap(name => console.log("fileName: ", name))
        catchError(this.handleError);
        return this.httpClient.get<IFile[]>(this.API_URL + this.ENDPOINT_READ_FILE + fileName);
    }

    readAnim():Observable<IAnim[]> {
        tap(name => console.log("fileName: ", name))
        catchError(this.handleError);
        return this.httpClient.get<IAnim[]>(this.API_URL + this.ENDPOINT_READ_FILE + 'animation.json');
    }

    readFont():Observable<IFont[]> {
        tap(name => console.log("fileName: ", name))
        catchError(this.handleError);
        return this.httpClient.get<IFont[]>(this.API_URL + this.ENDPOINT_READ_FILE + 'font.json');
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
