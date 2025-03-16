import {Component, HostListener, Renderer2} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  protected readonly faBars = faBars;
  isScrolled: boolean = false;

  constructor(private renderer: Renderer2) {
  }

  toggleNavMenu() {
    const navMenu = document.querySelector(".nav-menu");
    if (navMenu != null ) {
      navMenu.classList.toggle("nav-menu-visible");
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    let scroll = window.scrollY || document.documentElement.scrollTop
    let windowSize = window.innerWidth;

    if (scroll > 50 && windowSize > 800) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
