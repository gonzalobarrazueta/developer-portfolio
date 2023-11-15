import { Injectable, signal, WritableSignal } from '@angular/core';
import { Project } from "../models/project";
import { BehaviorSubject } from "rxjs";
import { Color } from "../models/color";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  currentProject: WritableSignal<Project>;
  currentProjectColors: BehaviorSubject<[Color, Color]>;

  constructor() {
    this.currentProject = signal({} as Project);
    this.currentProjectColors = new BehaviorSubject<[Color, Color]>([{} as Color, {} as Color]);
  }
}
