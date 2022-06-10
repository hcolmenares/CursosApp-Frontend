import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from 'src/app/services/curso.service';
import { EstudianteService } from '../../services/estudiante.service';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  listEstudiantes: any[] = [];
  listProfesores: any[] = [];
  listCursos: any[] = [];
  accion = "agregar";
  selector1 = "Seleccione el curso";
  selector2 = "Seleccione el curso";
  selector3 = "Seleccione el curso";
  id: number | undefined;

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private _cursoService: CursoService,
    private _profesorService: ProfesorService,
    private _estudianteService: EstudianteService) {
    this.form = fb.group({
      nombreEstudiante: ['', Validators.required],
      codigoEstudiante: ['', Validators.required],
      correoEstudiante: ['', [Validators.required, Validators.email]],
      curso1: ['', Validators.required],
      curso2: ['', Validators.required],
      curso3: ['', Validators.required]
      
    })
  }

  ngOnInit(): void {
    this.obtenerEstudianes();
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

  obtenerEstudianes() {
    this._estudianteService.getListEstudiantes().subscribe(data => {
      this.listEstudiantes = data;
    }), (error: any) => {
      console.log(error);
    }
  }

  guardarEstudiante() {

    const estudiante: any = {
      nombreEstudiante: this.form.get('nombreEstudiante')?.value,
      codigoEstudiante: this.form.get('codigoEstudiante')?.value,
      correoEstudiante: this.form.get('correoEstudiante')?.value,
      curso1: this.form.get('curso1')?.value,
      curso2: this.form.get('curso2')?.value,
      curso3: this.form.get('curso1')?.value
    }

    if (this.id == undefined) {
      //Agregamos un nuevo profesor

      this._estudianteService.saveEstudiante(estudiante).subscribe(data => {
        alert('¡Se agrego el curso con éxito!');
        this.form.reset();
        this.selector1 = "Seleccione el curso";
        this.obtenerEstudianes();
      }), (error: any) => {
        alert('Ha ocurrido un error');
        console.log(error);
      }

    } else {
      //Editamos profesor

      estudiante.id = this.id;
      this.selector1 = estudiante.curso;
      this._estudianteService.updateEstudiante(this.id, estudiante).subscribe(data => {
        this.form.reset();
        this.accion = "Agregar";

        this.selector1 = "Seleccione el curso";
        this.id = undefined;
        alert('¡El curso ha sido actualizado con éxito!');
        this.obtenerEstudianes();

      }), (error: any) => {
        console.log(error);
      }
    }

  }

  editarEstudiante(estudiante: any) {
    this.accion = "Editar";
    this.id = estudiante.id;
    this.selector1 = estudiante.curso1;
    this.selector2 = estudiante.curso2;
    this.selector3 = estudiante.curso3;

    this.form.patchValue({
      nombreEstudiante: estudiante.nombreEstudiante,
      codigoEstudiante: estudiante.codigoEstudiante,
      correoEstudiante: estudiante.correoEstudiante,

    });
  }

  eliminarEstudiante(id: number) {
    this._estudianteService.deleteEstudiante(id).subscribe(data => {
      alert('¡El curso fue eliminado con éxito!');
      this.obtenerEstudianes();
    }), (error: any) => {
      console.log(error);
    }
  }

}
