import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  listCursos: any[] = [];
  accion = "agregar";
  id: number | undefined;

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private _cursoService: CursoService) {
    this.form = fb.group({
      codigoCurso: ['', Validators.required],
      nombreCurso: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      noHoras: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos() {
    this._cursoService.getListCursos().subscribe(data => {
      this.listCursos = data;
    }), (error: any) => {
      console.log(error);
    }
  }

  guardarCurso() {

    const curso: any = {
      codigoCurso: this.form.get('codigoCurso')?.value,
      nombreCurso: this.form.get('nombreCurso')?.value,
      descripcion: this.form.get('descripcion')?.value,
      noHoras: this.form.get('noHoras')?.value,
    }

    if( this.id == undefined ) {
      //Agregamos un nuevo curso

      this._cursoService.saveCurso(curso).subscribe(data => {
        alert('¡Se agrego el curso con éxito!');
        this.form.reset();
        this.obtenerCursos();
      }), (error: any) => {
        alert('Ha ocurrido un error');
        console.log(error);
      }

    } else {
      //Editamos curso

      curso.id = this.id;
      this._cursoService.updateCurso(this.id, curso).subscribe(data => {
        this.form.reset();
        this.accion="Agregar";
        this.id = undefined;
        alert('¡El curso ha sido actualizado con éxito!');
        this.obtenerCursos();

      }), (error: any) => {
        console.log(error);
      }
    }

  }

  eliminarCurso(id: number) {

    this._cursoService.deleteCurso(id).subscribe(data => {
      alert('¡El curso fue eliminado con éxito!');
      this.obtenerCursos();
    }), (error: any) => {
      console.log(error);
    }

  }

  editarCurso(curso: any) {
    this.accion= "Editar";
    this.id = curso.id;

    this.form.patchValue({
      codigoCurso: curso.codigoCurso,
      nombreCurso: curso.nombreCurso,
      descripcion: curso.descripcion,
      noHoras: curso.noHoras
    });
  }

}
