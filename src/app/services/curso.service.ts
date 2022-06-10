import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private myAppUrl="https://localhost:44368/";
  private myApiUrl="api/cursos/"

  constructor( private http: HttpClient ) { }

  getListCursos(): Observable<any> {
    return this.http.get( this.myAppUrl + this.myApiUrl );
  }

  deleteCurso(id: number): Observable<any> {
    return this.http.delete( this.myAppUrl + this.myApiUrl + id );
  }

  saveCurso(curso: any): Observable<any> {
    return this.http.post( this.myAppUrl + this.myApiUrl, curso );
  }

  updateCurso( id: number, curso:any ): Observable<any> {
    return this.http.put( this.myAppUrl + this.myApiUrl + id, curso )
  }

}
