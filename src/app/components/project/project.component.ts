import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from "../../models/project";
import { SafeUrlPipe } from "../../shared/pipes/safe-url.pipe";
import { TechnologiesService } from "../../services/technologies.service";
import { ProjectsService } from "../../services/projects.service";
import { ProjectColorsService } from "../../shared/project-colors.service";

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
  isDesktopScreen: boolean;
  screenSize: number | undefined;

  constructor(private colors: ProjectColorsService,
              private projectsService: ProjectsService,
              public technologiesService: TechnologiesService) {
    this.project = {} as Project;
    this.gradient = "";
    this.isDesktopScreen = true;
  }

  ngOnInit(): void {
    this.project = this.projectsService.currentProject();
    this.projectsService.currentProjectColors.subscribe(colors => {
      this.gradient = this.colors.setGradientStyle(colors);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isDesktopScreen = this.checkScreenSize();
  }

  checkScreenSize(): boolean {
    this.screenSize = document.getElementById("screen")?.offsetWidth;
    if (this.screenSize && this.screenSize > 800) return true; else return false;
  }
}
