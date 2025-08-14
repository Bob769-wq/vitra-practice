import { ChangeDetectionStrategy, Component } from '@angular/core';
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
      <header class="bg-white  z-50 px-16 py-3 flex flex-col">
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
          <div class="flex items-baseline gap-4 group">
            <a routerLink="/" class="text-4xl font-bold">vitra.</a>
            <ul class="flex gap-6">
              @for (item of NavList; track item.id) {
                <li
                  [class.relative]="item.dropDown"
                  [class.group]="item.dropDown"
                >
                  <a [routerLink]="item.link" class="hover:text-red-600">
                    {{ item.title }}
                  </a>
                </li>
              }
            </ul>

            <div
              class="absolute top-full left-0 right-0 hidden group-hover:block z-40 bg-white border-t"
            >
              <div class="px-16 py-8">
                <h3 class="text-gray-400 mb-2">Discover</h3>
                <div class="flex gap-6 justify-center">
                  @for (item of aboutVitraItems; track item.id) {
                    <a [routerLink]="item.link">
                      <div class="w-60 relative">
                        <img
                          [src]="item.image"
                          [alt]="item.title"
                          class="w-full  object-cover aspect-[5/7]"
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
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <a routerLink="/search" class="hover:text-red-600">
              <mat-icon> search </mat-icon>
            </a>
            <div class="relative group">
              <a routerLink="/person" class="hover:text-red-600">
                <mat-icon> person </mat-icon>
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

            <div class="relative group ">
              <a routerLink="/language" class="hover:text-red-600">
                <mat-icon> language </mat-icon>
              </a>

              <div
                class="absolute top-full right-0 p-6 mt-2 w-80 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
              >
                <h3 class="text-lg font-semibold  text-gray-700 mb-4">
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
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
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
    { id: 1, title: 'Products', link: '/products' },
    { id: 2, title: 'Inspirations', link: '/inspirations' },
    { id: 3, title: 'Services', link: '/services' },
    { id: 4, title: 'Professionals', link: '/professionals' },
    { id: 5, title: 'Magazine', link: '/magazine' },
    { id: 6, title: 'Vitra Campus', link: '/campus' },
    { id: 7, title: 'About Vitra', link: '/about', dropDown: true },
  ];
}
