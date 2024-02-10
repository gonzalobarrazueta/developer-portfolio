import { Injectable } from '@angular/core';
import { Project } from "../models/project";
import { BehaviorSubject, Observable } from "rxjs";
import { Color } from "../models/color";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Technology } from "../models/technology";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private currentProjectSubject: BehaviorSubject<Project>;
  public currentProject$: Observable<Project>;
  currentProjectColors: BehaviorSubject<[Color, Color]>;

  constructor(private http: HttpClient) {
    this.currentProjectSubject = new BehaviorSubject<Project>({} as Project);
    this.currentProject$ = this.currentProjectSubject.asObservable();
    this.currentProjectColors = new BehaviorSubject<[Color, Color]>([{} as Color, {} as Color]);
  }

  saveProject(project: Project) {
    return this.http.post<Project>(`${environment.BASE_URL}/${environment.PROJECTS_ENDPOINT}`, project);
  }

  pageToProject(page: any): Project {
    let pageTitle = page.properties.name.title;
    let title: string = "";
    if (pageTitle.length > 0) {
      title = page.properties.name.title[0].text.content;
    }

    let pageDescription = page.properties.description.rich_text;
    let description = "";
    if (pageDescription.length > 0) {
      description = page.properties.description.rich_text[0].text.content;
    }

    let pageTechnologies = page.properties.technologies.multi_select;
    let technologies: Array<Technology> = [];
    if (pageTechnologies.length > 0) {
      for (const tech of pageTechnologies) {
        technologies.push({ name: tech.name });
      }
    }

    return {
      pageId: page.id,
      title,
      description,
      technologies,
      imageUrl: page.properties.image.files[0].file.url,
      demo: page.properties.demo.url,
      github: page.properties.github.url,
      live: page.properties.live.url
    }
  }

  setCurrentProject(project: Project) {
    this.currentProjectSubject.next(project);
  }
}
