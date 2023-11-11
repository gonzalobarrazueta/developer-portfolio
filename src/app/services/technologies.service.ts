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
      java: "devicon-java-plain colored",
      javascript: "devicon-javascript-plain colored",
      postgresql: "devicon-postgresql-plain colored",
      python: "devicon-python-plain colored",
      html: "devicon-html5-plain colored",
      css: "devicon-css3-plain colored",
      "node.js": "devicon-nodejs-plain colored"
    },
    svg: {
      "spring boot": "assets/svg/spring-boot.svg",
      "spotify api": "assets/svg/spotify.svg",
      "notion api": "assets/svg/notion.svg",
      "oauth2": "assets/svg/oauth2.svg"
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
