import { Injectable } from '@angular/core';
import { Project } from "../models/project";
import { BehaviorSubject, Observable } from "rxjs";
import { Color } from "../models/color";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private currentProjectSubject: BehaviorSubject<Project>;
  public currentProject$: Observable<Project>;
  currentProjectColors: BehaviorSubject<[Color, Color]>;

  constructor() {
    this.currentProjectSubject = new BehaviorSubject<Project>({} as Project);
    this.currentProject$ = this.currentProjectSubject.asObservable();
    this.currentProjectColors = new BehaviorSubject<[Color, Color]>([{} as Color, {} as Color]);
  }

  setCurrentProject(project: Project) {
    this.currentProjectSubject.next(project);
  }
}
