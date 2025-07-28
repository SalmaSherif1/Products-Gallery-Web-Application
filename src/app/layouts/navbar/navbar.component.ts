import { Component, inject, input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  private id = inject(PLATFORM_ID);
  IsLoggedIn = input<boolean>(true);
  isDarkMode = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      const savedMode = localStorage.getItem('theme');
      if (savedMode === 'dark') {
        this.isDarkMode = true;
        this.enableDarkMode();
      }
    }

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  disableDarkMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
