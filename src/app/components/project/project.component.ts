import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute) {
    this.project = {} as Project;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['project']) {
          this.project = JSON.parse(params['project']);
        }
      }
    )
  }
}
