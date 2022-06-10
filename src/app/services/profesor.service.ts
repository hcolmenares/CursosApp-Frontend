import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private myAppUrl="https://localhost:44368/";
  private myApiUrl="api/profesores/"

  constructor( private http: HttpClient ) { }

  getListProfesores(): Observable<any> {
    return this.http.get( this.myAppUrl + this.myApiUrl );
  }

  deleteProfesor(id: number): Observable<any> {
    return this.http.delete( this.myAppUrl + this.myApiUrl + id );
  }

  saveProfesor(profesor: any): Observable<any> {
    return this.http.post( this.myAppUrl + this.myApiUrl, profesor );
  }

  updateProfesor( id: number, profesor:any ): Observable<any> {
    return this.http.put( this.myAppUrl + this.myApiUrl + id, profesor )
  }

}
