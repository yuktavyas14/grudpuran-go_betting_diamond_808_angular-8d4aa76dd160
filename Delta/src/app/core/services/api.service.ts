import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment as env } from './../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import { User } from './models';

const BASE_URL = env.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class ApiService implements ErrorHandler {

  constructor(private httpClient:HttpClient,) { }

  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };
  setHeader() {
    let localStore:any= localStorage.getItem('token')
    let reqHeader = new HttpHeaders().set('Content-Type', 'application/json');
    reqHeader = reqHeader.set('token',localStore);
    return reqHeader;
}
  /**
   * @param path takes api url
   * @param body takes optional json data.
   */
  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL +'/api/'+ path, JSON.stringify(body), this.options)
      .pipe(
        retry(1),
        catchError(this.handleError)
        );
  }

  public get(path:string):Observable<any>{
    return this.httpClient
    .get(BASE_URL + '/api/' +path,this.options)
    .pipe(
       retry(1),
      catchError(this.handleError)
      );
  }

  public fawrk(path: string, body: object = {}): Observable<any> {
    return this.httpClient
    // alert()
      .post(BASE_URL + path, JSON.stringify(body), {headers: this.setHeader()})
      .pipe(catchError(this.formatErrors));
  }



  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }

  handleError(error : any) {
    // console.log("eroror")
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
}
}
