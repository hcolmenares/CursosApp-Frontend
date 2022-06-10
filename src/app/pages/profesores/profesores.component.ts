import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CursoService } from '../../services/curso.service';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  listProfesores: any[] = [];
  listCursos: any[] = [];
  accion = "agregar";
  selector = "Seleccione el curso";
  id: number | undefined;

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private _cursoService: CursoService,
    private _profesorService: ProfesorService) {

    this.form = fb.group({
      codigoProfesor: ['', Validators.required],
      nombreProfesor: ['', Validators.required],
      curso: [''],
    })

  }

  ngOnInit(): void {
    this.obtenerProfesores();
    this.obtenerCursos();
  }

  obtenerCursos() {
    this._cursoService.getListCursos().subscribe(data => {
      this.listCursos = data;
    }), (error: any) => {
      console.log(error);
    }
  }

  obtenerProfesores() {
    this._profesorService.getListProfesores().subscribe(data => {
      this.listProfesores = data;
    }), (error: any) => {
      console.log(error);
    }
  }

  guardarProfesor() {

    const profesor: any = {
      codigoProfesor: this.form.get('codigoProfesor')?.value,
      nombreProfesor: this.form.get('nombreProfesor')?.value,
      curso: this.form.get('curso')?.value
    }

    if (this.id == undefined) {
      //Agregamos un nuevo profesor

      this._profesorService.saveProfesor(profesor).subscribe(data => {
        alert('¡Se agrego el curso con éxito!');
        this.form.reset();
        this.selector = "Seleccione el curso";
        this.obtenerProfesores();
      }), (error: any) => {
        alert('Ha ocurrido un error');
        console.log(error);
      }

    } else {
      //Editamos profesor

      profesor.id = this.id;
      this.selector = profesor.curso;
      this._profesorService.updateProfesor(this.id, profesor).subscribe(data => {
        this.form.reset();
        this.accion = "Agregar";

        this.selector = "Seleccione el curso";
        this.id = undefined;
        alert('¡El curso ha sido actualizado con éxito!');
        this.obtenerProfesores();

      }), (error: any) => {
        console.log(error);
      }
    }

  }

  editarProfesor(profesor: any) {
    this.accion = "Editar";
    this.id = profesor.id;
    this.selector = profesor.curso;

    this.form.patchValue({
      codigoProfesor: profesor.codigoProfesor,
      nombreProfesor: profesor.nombreProfesor
    });
  }

  eliminarProfesor(id: number) {
    this._profesorService.deleteProfesor(id).subscribe(data => {
      alert('¡El curso fue eliminado con éxito!');
      this.obtenerProfesores();
    }), (error: any) => {
      console.log(error);
    }
  }

}
