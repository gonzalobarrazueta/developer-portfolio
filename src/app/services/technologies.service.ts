import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TechnologiesService {

  private technologies: Record<string, Record<string, string>> = {
    icon: {
      angular: "devicon-angularjs-plain colored",
      typescript: "devicon-typescript-plain colored",
      git: "devicon-git-plain colored",
      javascript: "devicon-javascript-plain colored",
      postgresql: "devicon-postgresql-plain colored",
      html: "devicon-html5-plain colored",
      css: "devicon-css3-plain colored",
      spring: "devicon-spring-original colored",
      mysql: "devicon-mysql-plain-wordmark colored",
      "node.js": "devicon-nodejs-plain-wordmark colored",
      "github actions": "devicon-githubactions-plain colored",
    },
    svg: {
      oauth2: "assets/svg/oauth2.svg",
      aws: "assets/svg/aws.svg",
      docker: "assets/svg/docker.svg",
      java: "assets/svg/java.svg",
      python: "assets/svg/python.svg",
    }
  }

  constructor() { }

  getTechnology(type: string, technology: string): string {
    return this.technologies[type][technology];
  }

  isIconOrSvg(technology: string): boolean {
    // true: icon, false: svg
    if (technology in this.technologies['icon']) return true; else return false;
  }
}
