import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private myAppUrl="https://localhost:44368/";
  private myApiUrl="api/estudiantes/"

  constructor( private http: HttpClient ) { }

  getListEstudiantes(): Observable<any> {
    return this.http.get( this.myAppUrl + this.myApiUrl );
  }

  
  deleteEstudiante(id: number): Observable<any> {
    return this.http.delete( this.myAppUrl + this.myApiUrl + id );
  }

  saveEstudiante(profesor: any): Observable<any> {
    return this.http.post( this.myAppUrl + this.myApiUrl, profesor );
  }

  updateEstudiante( id: number, profesor:any ): Observable<any> {
    return this.http.put( this.myAppUrl + this.myApiUrl + id, profesor )
  }

}
