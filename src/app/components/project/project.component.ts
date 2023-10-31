import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from "../../models/project";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  project: Project;
  isDesktopScreen: boolean;
  screenSize: number | undefined;

  constructor(private route: ActivatedRoute) {
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
    console.log(this.screenSize)
  }

  checkScreenSize(): boolean {
    this.screenSize = document.getElementById("screen")?.offsetWidth;

    if (this.screenSize && this.screenSize > 700) return true;

    return false;
  }
}
