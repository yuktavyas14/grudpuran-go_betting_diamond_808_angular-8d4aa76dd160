import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from './../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { User } from './models';

const BASE_URL = env.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient,) { }

  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  /**
   * @param path takes api url
   * @param body takes optional json data.
   */
  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public get(path:string):Observable<any>{
    return this.httpClient
    .get(BASE_URL + path,this.options)
    .pipe(catchError(this.formatErrors));
  }

  public imageupload(path: string, body): Observable<any> {
    return this.httpClient
      .post(BASE_URL + path, body)
      .pipe(catchError(this.formatErrors));
  }



  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}
