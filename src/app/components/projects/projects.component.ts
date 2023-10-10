import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotionService } from "../../services/notion.service";
import { Project } from "../../models/project";
import { ProjectColorsService } from "../../shared/project-colors.service";
import { Color } from "../../models/color";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  public projects: Array<Project> = [];
  public projectColors: Array<[Color, Color]>;

  constructor(private notionService: NotionService, private projectColorsService: ProjectColorsService) {
    this.getProjects();
    this.projectColors = projectColorsService.projectColors;
  }

  getProjects() {
    this.notionService.getPages()
      .subscribe(data => {
        this.projects = this.buildProjectsArray(data.results);
      });
  }

  buildProjectsArray(results: Array<any>): Array<Project> {

    let projectsArray: Array<Project> = [];
    for (let i = 0; i < results.length; i++) {
      projectsArray.push(this.pageToProject(results[i]));
    }

    return projectsArray;
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
    let technologies: Array<string> = [];
    if (pageTechnologies.length > 0) {
      for (const tech of pageTechnologies) {
        technologies.push(tech.name);
      }
    }

    let project: Project = {
      pageId: page.id,
      title,
      description,
      technologies,
      imageUrl: page.properties.image.url
    };

    return project;
  }

  setBackgroundGradient(colors: Color[]): string {
    let rgba1: string = this.projectColorsService.formatColorToRGBA(colors[0]);
    let rgba2: string = this.projectColorsService.formatColorToRGBA(colors[1]);

    return `background: linear-gradient(180deg, ${rgba1} 0%, ${rgba2} 100%);`
  }
}
