import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectColorsService} from "../../shared/project-colors.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  gradientBackground: string;

  constructor(private colors: ProjectColorsService) {
    this.gradientBackground = "background: linear-gradient(180deg, #FFFAE5 0%, #FFF2BD 100%)";
  }
}
