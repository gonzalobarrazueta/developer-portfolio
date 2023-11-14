import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotionService } from "../../services/notion.service";
import { Project } from "../../models/project";
import { ProjectColorsService } from "../../shared/project-colors.service";
import { Color } from "../../models/color";
import { Router } from "@angular/router";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  public projects: Array<Project> = [];

  constructor(private notionService: NotionService,
              private projectColorsService: ProjectColorsService,
              private router: Router) {
    this.getProjects();
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
      imageUrl: page.properties.image.url,
      demo: page.properties.demo.url,
      github: page.properties.github.url,
      live: page.properties.live.url
    };

    return project;
  }

  setGradientBackground(): string {
    let colors = this.projectColorsService.chooseRandomColors();
    return this.projectColorsService.setGradientStyle(colors);
  }

  navigateToProjectDetails(project: Project) {
    this.router.navigate(['project'], { queryParams: { project: JSON.stringify(project) } });
  }
}
