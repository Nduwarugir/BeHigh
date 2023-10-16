import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { GlobalsVariables } from 'src/app/shared/globals-variables';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private param: GlobalsVariables, private httpClient: HttpClient) { }

    private readonly API_URL = "http://"+ this.param.picoIp +":80";

    // private readonly ENDPOINT_SEND = "/";

    private readonly ENDPOINT_READ = "/";

    // Admin's operations
    send(url: string, datas: any): Observable<FormData> {
        tap(data => console.log("data: ", data))
        catchError(this.handleError);
        return this.httpClient.post<FormData>(this.API_URL + url, datas);
    }

    update(file: any): Observable<any> {
        tap(data => console.log("data: ", data))
        catchError(this.handleError);
        return this.httpClient.post<any>(this.API_URL + '/update', file);
    }

    readData(url: string): Observable<any> {
        tap(data => console.log("data: ", data))
        catchError(this.handleError);
        return this.httpClient.get<any>(this.API_URL + this.ENDPOINT_READ + url);
    }

    listDirContents(dir: string): Observable<any> {
        tap(data => console.log("data: ", data))
        catchError(this.handleError);
        return this.httpClient.get<any>(this.API_URL + this.ENDPOINT_READ + "list?dir=/" + dir);
    }

    upload(formData: FormData): Observable<any> {
        tap(data => console.log("data: ", data))
        catchError(this.handleError);
        return this.httpClient.post<any>(this.API_URL + '/edit', formData); // edit/upload
    }

    delete(formData: FormData): Observable<any> {
        tap(data => console.log("data: ", data))
        catchError(this.handleError);
        return this.httpClient.post<any>(this.API_URL + '/edit/delete', formData);
    }

    rename(formData: FormData): Observable<any> {
        tap(data => console.log("data: ", data))
        catchError(this.handleError);
        return this.httpClient.post<any>(this.API_URL + '/edit/rename', formData);
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
