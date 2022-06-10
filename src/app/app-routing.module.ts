import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ProfesoresComponent } from './pages/profesores/profesores.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },

  {
    path: 'cursos',
    component: CursosComponent
  },

  {
    path: 'profesores',
    component: ProfesoresComponent
  },

  {
    path: 'estudiantes',
    component: EstudiantesComponent
  },

  {
    path: '**',
    component: DashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
