import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ProjectComponent } from "./components/project/project.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'projects', component: ProjectsComponent, title: 'Projects' },
  { path: 'project', component: ProjectComponent, title: 'Project' },
];
