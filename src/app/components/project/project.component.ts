import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from "../../models/project";
import { ActivatedRoute, Params } from "@angular/router";
import { SafeUrlPipe } from "../../shared/pipes/safe-url.pipe";
import { TechnologiesService } from "../../services/technologies.service";

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

  constructor(private route: ActivatedRoute, public technologiesService: TechnologiesService,) {
    this.project = {} as Project;
    this.isDesktopScreen = true;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['project']) this.project = JSON.parse(params['project']);
      }
    )
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
