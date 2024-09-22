import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectColorsService } from "../../shared/project-colors.service";
import { Router } from "@angular/router";
import { ProjectsService } from "../../services/projects.service";
import { Color } from "../../models/color";
import { ProjectAndColors } from "../../models/project-and-colors";
import { PROJECTS } from "./project-list";

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
              private router: Router) {
    this.buildProjectAndColorsArray(PROJECTS)
  }

  buildProjectAndColorsArray(projects: Array<any>) {
    for (let i = 0; i < projects.length; i++) {
      this.projectAndColors.push({
        project: projects[i],
        colors: this.projectColorsService.chooseRandomColors()
      });
    }
  }

  setGradientBackground(colors: [Color, Color]): string {
    return this.projectColorsService.setGradientStyle(colors);
  }

  navigateToProjectDetails(p: ProjectAndColors) {
    this.projectsService.setCurrentProject(p.project);
    this.projectsService.currentProjectColors.next(p.colors);
    this.router.navigate(['project']);
  }
}
