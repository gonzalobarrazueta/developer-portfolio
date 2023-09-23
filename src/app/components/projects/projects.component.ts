import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotionService } from "../../services/notion.service";
import { Project } from "../../models/project";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  constructor(private notionService: NotionService) {
    this.getProjects();
  }

  getProjects() {
    this.notionService.getPages()
      .subscribe(data => {
        let projects: Array<any> = data.results;
        for (let i = 0; i < projects.length; i++) {
          console.log(this.pageToProject(projects[i]));
        }
      });
  }

  pageToProject(page: any) {

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
      title,
      description,
      technologies,
      image: page.properties.image.url
    };

    return project;
  }
}
