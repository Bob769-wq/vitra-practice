import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface AboutVitraItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

interface NavList {
  id: number;
  title: string;
  link: string;
  dropDown?: boolean;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule, RouterLink],
  template: `
    <div class="relative">
      <header class="bg-white z-50 m-auto max-w-7xl py-3 flex flex-col">
        <div class="flex justify-end gap-4 text-gray-400">
          <a
            routerLink="/find-vitra"
            class="hover:text-red-600 flex items-center"
          >
            <mat-icon>location_on</mat-icon>
            Find Vitra
          </a>
          <a routerLink="/contact" class="hover:text-red-600">Contact</a>
        </div>
        <div class="flex justify-between items-baseline">
          <div class="flex items-baseline gap-4">
            <a routerLink="/" class="text-4xl font-bold">vitra.</a>
            <ul class="flex gap-6">
              @for (item of NavList; track item.id) {
                <li>
                  <a
                    [routerLink]="item.link"
                    class="hover:text-red-600"
                    (mouseenter)="
                      item.dropDown ? setActiveDropdown(item.id) : null
                    "
                    (mouseleave)="setActiveDropdown(null)"
                  >
                    {{ item.title }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <div class="flex gap-3">
            <a routerLink="/search" class="hover:text-red-600">
              <mat-icon>search</mat-icon>
            </a>
            <div class="relative group">
              <a routerLink="/person" class="hover:text-red-600">
                <mat-icon>person</mat-icon>
              </a>
              <div
                class="absolute top-full -right-12 mt-2 w-80 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
              >
                <a
                  routerLink="/login"
                  class="block px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200"
                >
                  <span class="text-lg">Login</span>
                </a>
                <a
                  routerLink="/dealer-login"
                  class="block px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span class="text-lg">Dealer Login</span>
                </a>
              </div>
            </div>

            <div class="relative group">
              <a routerLink="/language" class="hover:text-red-600">
                <mat-icon>language</mat-icon>
              </a>
              <div
                class="absolute top-full right-0 p-6 mt-2 w-80 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
              >
                <h3 class="text-lg font-semibold text-gray-700 mb-4">
                  Location & Language
                </h3>
                <div class="mb-4">
                  <div
                    class="border border-gray-300 rounded p-3 flex items-center justify-between cursor-pointer hover:border-gray-400"
                  >
                    <div class="flex items-center gap-2">
                      <mat-icon class="text-gray-500">public</mat-icon>
                      <span class="text-gray-700">Others in Asia</span>
                    </div>
                    <mat-icon class="text-gray-400"
                      >keyboard_arrow_down</mat-icon
                    >
                  </div>
                </div>
                <button
                  class="w-full bg-gray-700 text-white py-3 rounded hover:bg-gray-800 transition-colors"
                >
                  SELECT
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 移到整個 header 外面的 dropdown -->
      @if (activeDropdown()) {
        <div
          class="absolute top-full left-0 right-0 w-full z-40 bg-white border-t"
          (mouseenter)="setActiveDropdown(activeDropdown()!)"
          (mouseleave)="setActiveDropdown(null)"
        >
          <div class="max-w-7xl mx-auto px-16 py-8">
            @switch (activeDropdown()) {
              @case (1) {
                <!-- Products 的版面 -->
                <h3 class="text-gray-400 mb-2">Discover Products</h3>
                <div class="grid grid-cols-4 gap-6">
                  <div class="text-center">
                    <p>Chairs</p>
                  </div>
                  <div class="text-center">
                    <p>Tables</p>
                  </div>
                  <div class="text-center">
                    <p>Storage</p>
                  </div>
                  <div class="text-center">
                    <p>Lighting</p>
                  </div>
                </div>
              }
              @case (2) {
                <!-- Inspirations 的版面 -->
                <h3 class="text-gray-400 mb-2">Discover Inspirations</h3>
                <div class="flex gap-8">
                  <div class="flex-1">
                    <p>Home Stories</p>
                  </div>
                  <div class="flex-1">
                    <p>Office Stories</p>
                  </div>
                </div>
              }
              @case (3) {
                <!-- Services 的版面 -->
                <h3 class="text-gray-400 mb-2">Discover Services</h3>
                <p>Consulting, Planning & Design Support</p>
              }
              @case (4) {
                <!-- Professionals 的版面 -->
                <h3 class="text-gray-400 mb-2">For Professionals</h3>
                <p>Architect & Designer Resources</p>
              }
              @case (5) {
                <!-- Magazine 的版面 -->
                <h3 class="text-gray-400 mb-2">Vitra Magazine</h3>
                <p>Design Stories & Insights</p>
              }
              @case (6) {
                <!-- Vitra Campus 的版面 -->
                <h3 class="text-gray-400 mb-2">Vitra Campus</h3>
                <p>Architecture, Exhibitions & Events</p>
              }
              @case (7) {
                <!-- About Vitra 的版面 (保持原本的圖片版面) -->
                <h3 class="text-gray-400 mb-2">Discover About Vitra</h3>
                <div class="flex gap-6 justify-center">
                  @for (item of aboutVitraItems; track item.id) {
                    <a [routerLink]="item.link">
                      <div class="w-60 relative">
                        <img
                          [src]="item.image"
                          [alt]="item.title"
                          class="w-full object-cover aspect-[5/7]"
                        />
                        <div class="absolute inset-0 flex items-end p-3">
                          <h3 class="text-white text-lg">
                            {{ item.title }}
                          </h3>
                        </div>
                      </div>
                    </a>
                  }
                </div>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  // Signal 控制哪個 dropdown 顯示
  activeDropdown = signal<number | null>(null);

  setActiveDropdown(id: number | null) {
    this.activeDropdown.set(id);
  }

  aboutVitraItems: AboutVitraItem[] = [
    {
      id: 1,
      title: 'Sustainability',
      image: '/categories.jpg',
      link: '/about/sustainability',
    },
    {
      id: 2,
      title: 'Jobs & Careers',
      image: '/categories.jpg',
      link: '/about/jobs',
    },
    {
      id: 3,
      title: 'Design process',
      image: '/categories.jpg',
      link: '/about/designprocess',
    },
    {
      id: 4,
      title: 'The Original is by Vitra',
      image: '/categories.jpg',
      link: '/about/original',
    },
    {
      id: 5,
      title: 'History - Project Vitra',
      image: '/categories.jpg',
      link: '/about/history',
    },
  ];

  NavList: NavList[] = [
    { id: 1, title: 'Products', link: '/products', dropDown: true },
    { id: 2, title: 'Inspirations', link: '/inspirations', dropDown: true },
    { id: 3, title: 'Services', link: '/services', dropDown: true },
    { id: 4, title: 'Professionals', link: '/professionals', dropDown: true },
    { id: 5, title: 'Magazine', link: '/magazine', dropDown: true },
    { id: 6, title: 'Vitra Campus', link: '/campus', dropDown: true },
    { id: 7, title: 'About Vitra', link: '/about', dropDown: true },
  ];
}
