import { Injectable, signal, WritableSignal } from '@angular/core';
import { Project } from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  currentProject: WritableSignal<Project>;

  constructor() {
    this.currentProject = signal({} as Project);
  }
}
