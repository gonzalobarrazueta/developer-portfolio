import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from "../../models/project";
import { SafeUrlPipe } from "../../shared/pipes/safe-url.pipe";
import { TechnologiesService } from "../../services/technologies.service";
import { ProjectsService } from "../../services/projects.service";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss', './project-desktop.component.scss']
})
export class ProjectComponent implements OnInit {

  project: Project;
  isDesktopScreen: boolean;
  screenSize: number | undefined;

  constructor(private projectsService: ProjectsService,
              public technologiesService: TechnologiesService) {
    this.project = {} as Project;
    this.isDesktopScreen = true;
  }

  ngOnInit(): void {
    this.project = this.projectsService.currentProject();
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
