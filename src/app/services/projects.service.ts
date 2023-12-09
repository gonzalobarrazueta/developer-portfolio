import { Injectable, signal, WritableSignal } from '@angular/core';
import { Project } from "../models/project";
import { BehaviorSubject } from "rxjs";
import { Color } from "../models/color";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  currentProject: WritableSignal<Project>;
  currentProjectColors: BehaviorSubject<[Color, Color]>;

  constructor(private http: HttpClient) {
    this.currentProject = signal({} as Project);
    this.currentProjectColors = new BehaviorSubject<[Color, Color]>([{} as Color, {} as Color]);
  }

  saveProject(project: Project) {
    return this.http.post<Project>(`${environment.BASE_URL}/${environment.PROJECTS_ENDPOINT}`, project);
  }
}
