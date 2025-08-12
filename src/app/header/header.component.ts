import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector:'app-header',
  imports: [CommonModule, MatIconModule, RouterLink],
  template:`
  <header class="bg-white  z-50 px-16 py-3 flex flex-col">
    <div class="flex justify-end gap-4 text-gray-400">
        <a routerLink="/find-vitra">
          Find Vitra
        </a>
        <a routerLink="/contact">Contact</a>
    </div>
    <div class="flex justify-between items-baseline">
    <div class="flex items-baseline gap-4">
      <a routerLink="/" class="text-4xl font-bold">vitra.</a>
      <ul class="flex gap-6">
        <li><a routerLink="/products">Products</a></li>
        <li><a routerLink="/inspirations">Inspirations</a></li>
        <li><a routerLink="/services">Services</a></li>
        <li><a routerLink="/professionals">Professionals</a></li>
        <li><a routerLink="/magazine">Magazine</a></li>
        <li><a routerLink="/vitracampus">Vitra Campus</a></li>
        <li><a routerLink="/about">About Vitra</a></li>
      </ul>
    </div>
    <div class="flex gap-3">
      <a routerLink="/search">
        <mat-icon>
          search
        </mat-icon>
      </a>
      <a routerLink="/person">
        <mat-icon>
          person
        </mat-icon>
      </a>
      <a routerLink="/language">
        <mat-icon>
          language
        </mat-icon>
      </a>
    </div>
    </div>
  </header>
  `,
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent{}
