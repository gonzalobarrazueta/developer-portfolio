import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from "../../models/project";
import { SafeUrlPipe } from "../../shared/pipes/safe-url.pipe";
import { TechnologiesService } from "../../services/technologies.service";
import { ProjectsService } from "../../services/projects.service";
import { ProjectColorsService } from "../../shared/project-colors.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss', './project-desktop.component.scss']
})
export class ProjectComponent implements OnInit {

  project: Project;
  gradient: string;
  isMobileScreen: boolean;

  constructor(private colors: ProjectColorsService,
              private projectsService: ProjectsService,
              public technologiesService: TechnologiesService,
              private breakpointObserver: BreakpointObserver) {
    this.project = {} as Project;
    this.gradient = "";
    this.isMobileScreen = window.innerWidth < 801;
  }

  ngOnInit(): void {
    this.projectsService.currentProject$.subscribe(project => this.project = project);
    this.projectsService.currentProjectColors.subscribe(colors => this.gradient = this.colors.setGradientStyle(colors));
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe(result => {
        this.isMobileScreen = result.matches;
    });
  }
}
