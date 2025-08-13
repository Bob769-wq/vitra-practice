import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule, RouterLink],
  template: `
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
        <div class="flex items-baseline gap-4">
          <a routerLink="/" class="text-4xl font-bold">vitra.</a>
          <ul class="flex gap-6">
            <li>
              <a routerLink="/products" class="hover:text-red-600">Products</a>
            </li>
            <li>
              <a routerLink="/inspirations" class="hover:text-red-600"
                >Inspirations</a
              >
            </li>
            <li>
              <a routerLink="/services" class="hover:text-red-600">Services</a>
            </li>
            <li>
              <a routerLink="/professionals" class="hover:text-red-600"
                >Professionals</a
              >
            </li>
            <li>
              <a routerLink="/magazine" class="hover:text-red-600">Magazine</a>
            </li>
            <li>
              <a routerLink="/vitracampus" class="hover:text-red-600"
                >Vitra Campus</a
              >
            </li>
            <li>
              <a routerLink="/about" class="hover:text-red-600">About Vitra</a>
            </li>
          </ul>
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
                  <mat-icon class="text-gray-400">keyboard_arrow_down</mat-icon>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
