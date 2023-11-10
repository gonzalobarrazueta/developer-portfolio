import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TechnologiesService {

  private technologies: Record<string, string> = {
    angular: "devicon-angularjs-plain colored",
    typescript: "devicon-typescript-plain colored",
    git: "devicon-git-plain colored",
    java: "devicon-java-plain colored",
    javascript: "devicon-javascript-plain colored",
    postgresql: "devicon-postgresql-plain colored",
    python: "devicon-python-plain colored",
    html: "devicon-html5-plain colored",
    css: "devicon-css3-plain colored",
    "node.js": "devicon-nodejs-plain colored"
  }

  constructor() { }

  getTechnology(technology: string): string {
    return this.technologies[technology];
  }
}
