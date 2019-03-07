import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { MessageService } from './message.service'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
}

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService<T> {
  abstract urlPrefix = ''

  protected url: string = environment.baseUrl

  constructor(
    protected _http: HttpClient,
    protected messageService: MessageService,
    public snackBar: MatSnackBar
  ) {}

  get http(): HttpClient {
    return this._http
  }

  doGetStatic(url: string = ''): Observable<T> {
    return this.http.get<T>(url).pipe(
      tap(_ => this.log(`fetched data from server`)),
      catchError(this.handleError<T>(`error fetched data from server`))
    )
  }

  getAll(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.buildUrl(url), data, httpOptions).pipe(
      tap(_ => this.log(`GET ALL update data to server`)),
      catchError(this.handleError<T>(`error update data to server`))
    )
  }

  doGet(url: string = ''): Observable<T> {
    return this._http.get<T>(this.buildUrl(url)).pipe(
      tap(_ => this.log(`GET - ${url}`)),
      catchError(this.handleError<T>(`error GET - {url}`))
    )
  }

  doGetAll(url: string = ''): Observable<Object> {
    return this._http.get<Object>(this.buildUrl(url)).pipe(
      tap(_ => this.log(`GET - ${url}`)),
      catchError(this.handleError<T>(`error GET - {url}`))
    )
  }

  doPost(url: string = '', data: T = null) {
    return this._http.post<T>(this.buildUrl(url), data, httpOptions).pipe(
      tap(_ => this.log(`POST - ${url}`)),
      catchError(this.handleError<T>(`error POST - ${url}`))
    )
  }

  doPut(url: string, data: T): any {
    return this._http.put<T>(this.buildUrl(url), data, httpOptions).pipe(
      tap(_ => this.log(`PUT - ${url}`)),
      catchError(this.handleError<T>(`error PUT - ${url}`))
    )
  }

  doDelete(url: string): any {
    return this._http.delete<T>(this.buildUrl(url), httpOptions).pipe(
      tap(_ => this.log(`DELETE - ${url}`)),
      catchError(this.handleError<T>(`error DELETE - ${url}`))
    )
  }

  public handleError<T1>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // @ToDo: Teo -> add global error message here
      console.log(error)
      this.snackBar.open(error.error.error.message, '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }) // log to console instead
      if (error.error.error.message === 'SequelizeUniqueConstraintError') {
        alert(
          error.error.error.original.constraint + '\n' + error.error.error.original.detail
        )
      }
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)
      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

  /** Log a HeroService message with the MessageService */
  public log(message: string) {
    this.messageService.add(`${message}`)
  }

  /**
   * build server request url
   */
  public buildUrl(url: string): string {
    return this.url + url
  }
}
