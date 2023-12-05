import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotionService } from "../../services/notion.service";
import { Project } from "../../models/project";
import { ProjectColorsService } from "../../shared/project-colors.service";
import { Router } from "@angular/router";
import { ProjectsService } from "../../services/projects.service";
import { Color } from "../../models/color";
import { ProjectAndColors } from "../../models/project-and-colors";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  projectAndColors: Array<ProjectAndColors> = [];

  constructor(private projectColorsService: ProjectColorsService,
              private projectsService: ProjectsService,
              private notionService: NotionService,
              private router: Router) {
    this.getProjects();
  }

  getProjects() {
    let projects: string | null = localStorage.getItem('projects');

    if (projects) {
      this.projectAndColors = JSON.parse(projects);
    } else {
      this.notionService.getPages()
        .subscribe(data => {
          this.buildProjectAndColorsArray(data.results);
          this.setLocalStorageProjects();
        });
    }
  }

  setLocalStorageProjects() {
    localStorage.setItem("projects", JSON.stringify(this.projectAndColors));
  }

  private buildProjectAndColorsArray(results: Array<any>) {
    for (let i = 0; i < results.length; i++) {
      this.projectAndColors.push({
        project: this.pageToProject(results[i]),
        colors: this.projectColorsService.chooseRandomColors()
      });
    }
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
      imageUrl: page.properties.image.files[0].file.url,
      demo: page.properties.demo.url,
      github: page.properties.github.url,
      live: page.properties.live.url
    };

    return project;
  }

  setGradientBackground(colors: [Color, Color]): string {
    return this.projectColorsService.setGradientStyle(colors);
  }

  navigateToProjectDetails(p: ProjectAndColors) {
    this.projectsService.currentProject.set(p.project);
    this.projectsService.currentProjectColors.next(p.colors);
    this.router.navigate(['project']);
  }
}
