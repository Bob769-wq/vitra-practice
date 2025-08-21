import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownService } from './dropdown.service';

interface MenuIconList {
  id: number;
  title?: string;
  icon: string;
  link: string;
}

interface HeaderList {
  id: number;
  title: string;
  link: string;
}

interface HeaderImg {
  id: number;
  title: string;
  image: string;
  link: string;
}

interface NavItem {
  id: number;
  title: string;
  link?: string;
  dropDown: boolean;
  children?: NavChild[];
  imageItems?: NavImageItem[];
  menuType?: 'simple' | 'grouped' | 'mixed';
  imageLayout?: 'horizontal' | 'vertical';
}

interface NavChild {
  id: number;
  title: string;
  link?: string;
  dropDown: boolean;
  isGroupHeader?: boolean;
  isGroupDivider?: boolean;
}

interface NavImageItem {
  id: number;
  title: string;
  imageUrl: string;
  imageTitle: string;
  link?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule, RouterLink, FormsModule],
  template: `
    <div class="relative">
      <header
        class="px-5 bg-white z-50 isolate m-auto max-w-7xl py-3 flex flex-col lg:px-0"
      >
        <div
          class="hidden lg:flex justify-end gap-4 text-gray-400"
          (click)="closeDropdown()"
        >
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
            <button class="lg:hidden" (click)="toggleMenu()">
              <mat-icon>menu</mat-icon>
            </button>

            <a routerLink="/" class="hidden lg:block text-4xl font-bold">
              vitra.
            </a>
            <ul class="hidden lg:flex gap-6">
              @for (item of NavList; track item.id) {
                <li>
                  <!--                  routerlink routerlinkAcitve routerlinkActivaOptions-->
                  <a
                    [routerLink]="item.link"
                    class="hover:text-red-600"
                    (mouseenter)="
                      item.dropDown
                        ? dropdownService.setActiveDropdown(item.title)
                        : null
                    "
                  >
                    {{ item.title }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <a routerLink="/" class="text-4xl font-bold lg:hidden">vitra.</a>

          <div class="flex gap-3">
            <a routerLink="/search" class="hover:text-red-600">
              <mat-icon>search</mat-icon>
            </a>
            <div class="relative group hidden lg:block">
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

            <div class="relative group hidden lg:block">
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

      @if (isMenuOpen()) {
        <nav class="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div
            class="flex justify-between items-baseline py-3 px-5 border-b border-b-gray-300"
          >
            <div (click)="closeMenu()">
              <mat-icon>close</mat-icon>
            </div>
            <div>
              <a routerLink="/" class="text-4xl font-bold"> vitra.</a>
            </div>
            <div>
              <mat-icon>search</mat-icon>
            </div>
          </div>

          @if (showSubmenu()) {
            <div
              class="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200"
            >
              <button
                (click)="goBack()"
                class="flex items-center text-gray-600 hover:text-black"
              >
                <mat-icon>arrow_back_ios</mat-icon>
              </button>
              <div class="text-xl ">
                {{ selectedParent()?.title }}
              </div>
              <div></div>
            </div>
          }

          @if (!showSubmenu()) {
            <div class="px-5 pb-0">
              <ul class="flex flex-col gap-8 py-6">
                @for (item of NavList; track item.id) {
                  <a
                    [routerLink]="item.link"
                    class="block  text-xl hover:text-red-600"
                    (click)="openSubmenu(item)"
                  >
                    <li class="flex justify-between items-center">
                      {{ item.title }}

                      <mat-icon>arrow_forward</mat-icon>
                    </li>
                  </a>
                }
              </ul>
            </div>
          }

          @if (showSubmenu() && selectedParent()) {
            <div class="px-5">
              <ul class="flex flex-col gap-6 pt-6">
                @for (child of selectedParent()!.children; track child.id) {
                  @if (child.isGroupHeader) {
                    <li class="text-gray-500 text-sm font-medium mt-4">
                      {{ child.title }}
                    </li>
                  } @else if (child.isGroupDivider) {
                    <li class="border-t border-gray-300"></li>
                  } @else {
                    <li class="flex justify-between items-center">
                      <a
                        class="block text-xl hover:text-red-600 cursor-pointer"
                      >
                        {{ child.title }}
                      </a>
                    </li>
                  }
                }
              </ul>

              @if (
                selectedParent()!.imageItems &&
                selectedParent()!.imageItems!.length > 0
              ) {
                <div class="overflow-x-auto">
                  <div
                    [class]="
                      selectedParent()!.imageLayout === 'vertical'
                        ? 'flex flex-col gap-4'
                        : 'flex gap-4'
                    "
                  >
                    @for (
                      imageItem of selectedParent()!.imageItems;
                      track imageItem.id
                    ) {
                      <a
                        [routerLink]="imageItem.link"
                        class="py-3"
                        [class]="
                          selectedParent()!.imageLayout === 'vertical'
                            ? 'w-full'
                            : 'flex-shrink-0 w-64'
                        "
                      >
                        <div class="relative overflow-hidden group">
                          <img
                            [src]="imageItem.imageUrl"
                            [alt]="imageItem.imageTitle"
                            [class]="
                              selectedParent()!.id === 1
                                ? 'w-full object-cover aspect-[16/9] transition-transform duration-500 group-hover:scale-110'
                                : 'w-full object-cover aspect-[5/7] transition-transform duration-500 group-hover:scale-110'
                            "
                          />
                          <div class="absolute inset-0 flex items-end p-3">
                            <h3 class="text-white text-lg">
                              {{ imageItem.imageTitle }}
                            </h3>
                          </div>
                        </div>
                      </a>
                    }
                  </div>
                </div>
              }
            </div>
          }

          <div class="bg-gray-200 py-20">
            <div class="px-5">
              <ul class="flex flex-col gap-6">
                @for (item of menuIconItems; track item.id) {
                  <li class="flex justify-between items-center">
                    <a
                      [routerLink]="item.link"
                      class="flex items-center gap-2 text-xl hover:text-red-600"
                      (click)="closeMenu()"
                    >
                      <mat-icon>{{ item.icon }}</mat-icon>
                      {{ item.title }}
                    </a>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
      }

      @if (activeDropdown()) {
        <div
          class="absolute top-full left-0 right-0 w-full z-40 bg-white border-t"
          (mouseenter)="setActiveDropdown(activeDropdown()!)"
        >
          <div class="max-w-7xl mx-auto py-8">
            @switch (dropdownService.activeDropdown()) {
              @case ('Products') {
                <div class="grid grid-cols-6 gap-6">
                  <div>
                    <h3 class="text-gray-400">Seating furniture</h3>
                    <!--                    TODO: use margin top instead margin bottom done-->
                    <ul class="flex flex-col gap-1">
                      @for (item of seatingFurnitureItems; track item.id) {
                        <!--                        TODO: hover should have cursor-pointer indicator done-->
                        <!--                        TODO: if is the space between items, use gap is better then padding top done-->
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                    <h3 class="text-gray-400 mt-8">Spatial organisation</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of spatialItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                  </div>
                  <div>
                    <h3 class="text-gray-400">Tables</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of TablesItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                    <h3 class="text-gray-400 mt-8">Accessories</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of accessoriesItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                      <li class="text-base text-gray-400">
                        <a
                          routerLink="/more"
                          class="border-b border-b-gray-400 hover:text-red-600 hover:border-b-red-600"
                          >More</a
                        >
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 class="text-gray-400">Discover</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of productDiscoverItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                    <h3 class="text-gray-400 mt-8">Designer</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of designerItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                      <li class="text-base text-gray-400">
                        <a
                          routerLink="/more"
                          class="border-b border-b-gray-400 hover:text-red-600 hover:border-b-red-600"
                          >More</a
                        >
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 class="text-gray-400">Product finder</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of finderItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                    <h3 class="text-gray-400 mt-8">Service</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of serviceItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                    <h3 class="text-gray-400 mt-8">Circular products</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of circularItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                  </div>
                  <div class="col-span-2 flex flex-col gap-4">
                    @for (item of productImage; track item.id) {
                      <!--                      TODO: why here need to use group 有文字在那邊需要group才能動p-->
                      <div class="relative overflow-hidden group">
                        <a [routerLink]="item.link">
                          <img
                            class="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            [alt]="item.title"
                            [src]="item.image"
                          />
                        </a>
                        <div class="absolute inset-0 flex items-end p-3">
                          <h3 class="text-white text-lg">
                            {{ item.title }}
                          </h3>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
              @case ('Inspirations') {
                <div class="grid grid-cols-6 gap-8">
                  <div class="col-span-3">
                    <div class="grid grid-cols-3 gap-8">
                      <div>
                        <h3 class="text-gray-400">Home</h3>
                        <ul class="flex flex-col gap-1">
                          @for (item of homeItems; track item.id) {
                            <li class="text-lg">
                              <a
                                [routerLink]="item.link"
                                class="hover:text-red-600"
                                >{{ item.title }}</a
                              >
                            </li>
                          }
                        </ul>
                      </div>
                      <div>
                        <h3 class="text-gray-400">Office spaces</h3>
                        <ul class="flex flex-col gap-1">
                          @for (item of officeItems; track item.id) {
                            <li class="text-lg">
                              <a
                                [routerLink]="item.link"
                                class="hover:text-red-600"
                                >{{ item.title }}</a
                              >
                            </li>
                          }
                          <li class="text-base text-gray-400">
                            <a
                              routerLink="/more"
                              class="border-b border-b-gray-400 hover:text-red-600 hover:border-b-red-600"
                              >More</a
                            >
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 class="text-gray-400">Public spaces</h3>
                        <ul class="flex flex-col gap-1">
                          @for (item of publicItems; track item.id) {
                            <li class="text-lg">
                              <a
                                [routerLink]="item.link"
                                class="hover:text-red-600"
                                >{{ item.title }}</a
                              >
                            </li>
                          }
                        </ul>
                      </div>
                      <div>
                        <h3 class="text-gray-400">Discover</h3>
                        <ul class="flex flex-col gap-1">
                          @for (item of homeStoriesItems; track item.id) {
                            <li class="text-lg">
                              <a
                                [routerLink]="item.link"
                                class="hover:text-red-600"
                                >{{ item.title }}</a
                              >
                            </li>
                          }
                        </ul>
                      </div>
                      <div>
                        <h3 class="text-gray-400">Vitra offices & concepts</h3>
                        <ul class="flex flex-col gap-1">
                          @for (item of vitraItems; track item.id) {
                            <li class="text-lg">
                              <a
                                [routerLink]="item.link"
                                class="hover:text-red-600"
                                >{{ item.title }}</a
                              >
                            </li>
                          }
                          <li class="text-base text-gray-400">
                            <a
                              routerLink="/more"
                              class="border-b border-b-gray-400 hover:text-red-600 hover:border-b-red-600"
                              >More</a
                            >
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 class="text-gray-400">Themes</h3>
                        <ul class="flex flex-col gap-1">
                          @for (item of themesItems; track item.id) {
                            <li class="text-lg">
                              <a
                                [routerLink]="item.link"
                                class="hover:text-red-600"
                                >{{ item.title }}</a
                              >
                            </li>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-3">
                    <div class="flex justify-between items-start">
                      <h3 class="text-gray-400">Discover</h3>
                      <div class="text-gray-200">
                        <mat-icon
                          class="text-base cursor-pointer"
                          (click)="scrollLeft()"
                          >arrow_back_ios</mat-icon
                        >
                        <mat-icon
                          class="text-base cursor-pointer"
                          (click)="scrollRight()"
                          >arrow_forward_ios</mat-icon
                        >
                      </div>
                    </div>
                    <div class="overflow-x-auto scrollbar-hide">
                      <div class="flex gap-6 w-max">
                        @for (item of inspirationsImage; track item.id) {
                          <a routerLink="item.link">
                            <div
                              class="relative flex-shrink-0 w-64 overflow-hidden group"
                            >
                              <img
                                [src]="item.image"
                                [alt]="item.title"
                                class="w-full object-cover aspect-[5/7] transition-transform duration-500 group-hover:scale-110"
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
              }
              @case ('Services') {
                <div class="grid grid-cols-5 gap-6">
                  <div>
                    <h3 class="text-gray-400">Product services</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of productServicesItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class=" hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                  </div>
                  <div>
                    <h3 class="text-gray-400">Office planning</h3>
                    <ul class="flex flex-col gap-1">
                      <li class="text-lg">
                        <a routerLink="/studio" class=" hover:text-red-600"
                          >Consulting & Planning Studio</a
                        >
                      </li>
                    </ul>
                    <h3 class="text-gray-400 mt-9">Circular Products</h3>
                    <ul class="flex flex-col gap-1">
                      <li class="text-lg">
                        <a
                          routerLink="/circle-stores"
                          class=" hover:text-red-600"
                          >Vitra Circle Stores</a
                        >
                      </li>
                    </ul>
                  </div>
                  @for (item of productImg; track item.id) {
                    <a routerLink="item.link">
                      <div class="relative overflow-hidden group">
                        <img
                          [src]="item.image"
                          [alt]="item.title"
                          class="w-full object-cover aspect-[5/7] transition-transform duration-500 group-hover:scale-110"
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
              @case ('Professionals') {
                <div class="grid grid-cols-5 gap-6">
                  <div>
                    <h3 class="text-gray-400">Downloads</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of downloadItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class=" hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                  </div>
                  <div>
                    <h3 class="text-gray-400">Tools</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of toolItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                    <h3 class="text-gray-400 mt-8">Dealer</h3>
                    <ul class="flex flex-col gap-1">
                      <li class="text-lg">
                        <a routerLink="/login" class="hover:text-red-600"
                          >To the dealer login</a
                        >
                      </li>
                    </ul>
                  </div>
                  <div class="col-span-3">
                    <div class="flex justify-between items-start">
                      <h3 class="text-gray-400">Discover</h3>
                      <div class="text-gray-200">
                        <mat-icon
                          class="text-base cursor-pointer"
                          (click)="scrollLeft()"
                          >arrow_back_ios</mat-icon
                        >
                        <mat-icon
                          class="text-base cursor-pointer"
                          (click)="scrollRight()"
                          >arrow_forward_ios</mat-icon
                        >
                      </div>
                    </div>
                    <div class="overflow-x-auto scrollbar-hide">
                      <div class="flex gap-6 w-max">
                        @for (item of professionalImage; track item.id) {
                          <a routerLink="item.link">
                            <div
                              class="relative flex-shrink-0 w-64 overflow-hidden group"
                            >
                              <img
                                [src]="item.image"
                                [alt]="item.title"
                                class="w-full object-cover aspect-[5/7] transition-transform duration-500 group-hover:scale-110"
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
              }
              @case ('Magazine') {
                <div class="grid grid-cols-5 gap-6">
                  <div>
                    <h3 class="text-gray-400">Categories</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of magazineItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                      <li class="text-base text-gray-400">
                        <a
                          routerLink="/more"
                          class="border-b border-b-gray-400 hover:text-red-600 hover:border-b-red-600"
                          >More</a
                        >
                      </li>
                    </ul>
                  </div>
                  <div class="col-span-4">
                    <div class="flex justify-between items-start">
                      <h3 class="text-gray-400">Article</h3>
                      <div class="text-gray-200">
                        <mat-icon
                          class="text-base cursor-pointer"
                          (click)="scrollLeft()"
                          >arrow_back_ios</mat-icon
                        >
                        <mat-icon
                          class="text-base cursor-pointer"
                          (click)="scrollRight()"
                          >arrow_forward_ios</mat-icon
                        >
                      </div>
                    </div>
                    <div class="overflow-x-auto scrollbar-hide">
                      <div class="flex gap-6 w-max">
                        @for (item of magazineImage; track item.id) {
                          <a routerLink="item.link">
                            <div
                              class="relative flex-shrink-0 w-64 overflow-hidden group"
                            >
                              <img
                                [src]="item.image"
                                [alt]="item.title"
                                class="w-full object-cover aspect-[5/7] transition-transform duration-500 group-hover:scale-110"
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
              }
              @case ('Vitra Campus') {
                <div class="grid grid-cols-5 gap-6">
                  <div>
                    <h3 class="text-gray-400">Discover</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of discoverItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                  </div>
                  <div>
                    <h3 class="text-gray-400">Visitor information</h3>
                    <ul class="flex flex-col gap-1">
                      @for (item of visitorItems; track item.id) {
                        <li class="text-lg">
                          <a
                            [routerLink]="item.link"
                            class="hover:text-red-600"
                            >{{ item.title }}</a
                          >
                        </li>
                      }
                    </ul>
                  </div>
                  <div class="col-span-3">
                    <div class="flex justify-between items-start">
                      <h3 class="text-gray-400">Highlights</h3>
                      <div class="text-gray-200">
                        <mat-icon
                          class="text-base cursor-pointer"
                          (click)="scrollLeft()"
                          >arrow_back_ios</mat-icon
                        >
                        <mat-icon
                          class="text-base cursor-pointer"
                          (click)="scrollRight()"
                          >arrow_forward_ios</mat-icon
                        >
                      </div>
                    </div>
                    <div class="overflow-x-auto scrollbar-hide">
                      <div class="flex gap-6 w-max">
                        @for (item of campusImg; track item.id) {
                          <a routerLink="item.link">
                            <div
                              class="relative flex-shrink-0 w-64 overflow-hidden group"
                            >
                              <img
                                [src]="item.image"
                                [alt]="item.title"
                                class="w-full object-cover aspect-[5/7] transition-transform duration-500 group-hover:scale-110"
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
              }
              @case ('About Vitra') {
                <div class="flex justify-between items-start">
                  <h3 class="text-gray-400">Discover About Vitra</h3>
                  <div class="text-gray-200">
                    <mat-icon
                      class="text-base cursor-pointer"
                      (click)="scrollLeft()"
                      >arrow_back_ios</mat-icon
                    >
                    <mat-icon
                      class="text-base cursor-pointer"
                      (click)="scrollRight()"
                      >arrow_forward_ios</mat-icon
                    >
                  </div>
                </div>
                <div class="grid grid-cols-5 gap-6">
                  @for (item of aboutVitraItems; track item.id) {
                    <a [routerLink]="item.link">
                      <div class="relative overflow-hidden group">
                        <img
                          [src]="item.image"
                          [alt]="item.title"
                          class="w-full object-cover aspect-[5/7] transition-transform duration-500 group-hover:scale-110"
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
        <div
          class="fixed inset-0 bg-black bg-opacity-30 z-30"
          (click)="closeDropdown()"
        ></div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  dropdownService = inject(DropdownService);

  activeDropdown() {
    return this.dropdownService.activeDropdown();
  }

  setActiveDropdown(title: string | null) {
    this.dropdownService.setActiveDropdown(title);
  }

  closeDropdown() {
    this.dropdownService.closeDropdown();
  }

  isMenuOpen = signal(false);
  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.showSubmenu.set(false);
    this.selectedParent.set(null);
  }

  campusImg: HeaderImg[] = [
    {
      id: 1,
      title: 'VitraHaus',
      image: '/categories.jpg',
      link: '/vitrahaus',
    },
    {
      id: 2,
      title: 'Vitra Design Museum',
      image: '/categories.jpg',
      link: '/museum',
    },
    {
      id: 3,
      title: 'Vitra Schaudepot',
      image: '/categories.jpg',
      link: '/schaudepot',
    },
    {
      id: 4,
      title: 'Vitra Circle Store Campus',
      image: '/categories.jpg',
      link: '/circle-store',
    },
    {
      id: 5,
      title: 'Oudolf Garten',
      image: '/categories.jpg',
      link: '/garten',
    },
  ];
  magazineImage: HeaderImg[] = [
    {
      id: 1,
      title: 'Project Vitra',
      image: '/categories.jpg',
      link: '/project',
    },
    {
      id: 2,
      title: 'Mynt is a lifetime achievement to me',
      image: '/categories.jpg',
      link: '/mynt',
    },
    {
      id: 3,
      title: 'A desk like a typeface',
      image: '/categories.jpg',
      link: '/desk',
    },
    {
      id: 4,
      title: 'V-Foam',
      image: '/categories.jpg',
      link: '/foam',
    },
    {
      id: 5,
      title: 'Sculptural Icons',
      image: '/categories.jpg',
      link: '/sculptural',
    },
    {
      id: 6,
      title: 'Games bring people together - just like good offices',
      image: '/categories.jpg',
      link: '/games',
    },
    {
      id: 7,
      title: 'Let there be light!',
      image: '/categories.jpg',
      link: '/light',
    },
    {
      id: 8,
      title: 'Social Seating',
      image: '/categories.jpg',
      link: '/social-seating',
    },
    {
      id: 9,
      title: 'Just Do It!',
      image: '/categories.jpg',
      link: '/just-do-it',
    },
    {
      id: 10,
      title: 'EVER GREEN',
      image: '/categories.jpg',
      link: '/evergreen',
    },
    {
      id: 11,
      title: 'Why the Eames La Fonda Chair was designed',
      image: '/categories.jpg',
      link: '/chair-designed',
    },
    {
      id: 12,
      title: 'When a Sofa is more than just a Sofa: Anagram',
      image: '/categories.jpg',
      link: '/sofa-anagram',
    },
    {
      id: 13,
      title: '100% virgin wool - 100% recyclable',
      image: '/categories.jpg',
      link: '/wool',
    },
    {
      id: 14,
      title: 'An archive is like a time capsule',
      image: '/categories.jpg',
      link: '/capsule',
    },
    {
      id: 15,
      title: 'VitraHaus Loft - A conversation with Sabine Marcelis',
      image: '/categories.jpg',
      link: '/loft',
    },
    {
      id: 16,
      title: 'A 1000 m2 piece of furniture',
      image: '/categories.jpg',
      link: '/m2-furniture',
    },
    {
      id: 17,
      title: 'From a toy to an object',
      image: '/categories.jpg',
      link: '/toy-object',
    },
    {
      id: 18,
      title: 'The Eames Collection at the Vitra Design Museum',
      image: '/categories.jpg',
      link: '/collection',
    },
    {
      id: 19,
      title: 'About the partnership between Eames and Vitra',
      image: '/categories.jpg',
      link: '/partnership',
    },
  ];
  professionalImage: HeaderImg[] = [
    {
      id: 1,
      title: 'Our Clients',
      image: '/categories.jpg',
      link: '/clients',
    },
    {
      id: 2,
      title: 'Mynt',
      image: '/categories.jpg',
      link: '/mynt',
    },
    {
      id: 3,
      title: 'Destination Workplace: Visit our clients and partners',
      image: '/categories.jpg',
      link: '/destination',
    },
    {
      id: 4,
      title: 'Anagram Sofa',
      image: '/categories.jpg',
      link: '/anagram-sofa',
    },
    {
      id: 5,
      title: 'Mikado',
      image: '/categories.jpg',
      link: '/mikado',
    },
    {
      id: 6,
      title: 'Tyde 2 on castors',
      image: '/categories.jpg',
      link: '/tyde',
    },
    {
      id: 7,
      title: 'ACX',
      image: '/categories.jpg',
      link: '/acx',
    },
    {
      id: 8,
      title: 'Dancing Office',
      image: '/categories.jpg',
      link: '/dancing-office',
    },
    {
      id: 9,
      title: 'Office chairs',
      image: '/categories.jpg',
      link: '/office-chairs',
    },
  ];
  aboutVitraItems: HeaderImg[] = [
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
      link: '/about/design-process',
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
  discoverItems: HeaderList[] = [
    {
      id: 1,
      title: 'Exhibitions',
      link: '/exhibitions',
    },
    {
      id: 2,
      title: 'Guided tours & workshops',
      link: '/guided-tours',
    },
    {
      id: 3,
      title: 'Food and drink',
      link: '/food',
    },
    {
      id: 4,
      title: 'Shopping',
      link: '/shopping',
    },
    {
      id: 5,
      title: 'Activities for families',
      link: '/activities',
    },
    {
      id: 6,
      title: 'Architecture',
      link: '/architecture',
    },
    {
      id: 7,
      title: 'Your event',
      link: '/event',
    },
    {
      id: 8,
      title: 'Consulting & planning in the VitraHaus',
      link: '/consulting',
    },
  ];
  visitorItems: HeaderList[] = [
    {
      id: 1,
      title: 'Plan your visit',
      link: '/plan',
    },
    {
      id: 2,
      title: 'Vitra Campus app',
      link: '/campus-app',
    },
    {
      id: 3,
      title: 'Campus Events',
      link: '/campus-events',
    },
    {
      id: 4,
      title: 'News',
      link: '/news',
    },
  ];
  magazineItems: HeaderList[] = [
    {
      id: 1,
      title: 'Stories',
      link: '/stories',
    },
    {
      id: 2,
      title: 'Conversations',
      link: '/conversations',
    },
    {
      id: 3,
      title: 'Exhibitions',
      link: '/exhibitions',
    },
    {
      id: 4,
      title: 'Designer',
      link: '/designer',
    },
  ];
  downloadItems: HeaderList[] = [
    {
      id: 1,
      title: 'CAD data',
      link: '/cad',
    },
    {
      id: 2,
      title: 'Product factsheets',
      link: '/factsheets',
    },
    {
      id: 3,
      title: 'Certificates',
      link: '/certificates',
    },
    {
      id: 4,
      title: 'Sustainability report',
      link: '/sustain-report',
    },
    {
      id: 5,
      title: 'Instructions',
      link: '/instructions',
    },
    {
      id: 6,
      title: 'Ecology information',
      link: '/ecology',
    },
  ];
  productServicesItems: HeaderList[] = [
    {
      id: 1,
      title: 'Care & repair',
      link: '/care',
    },
    {
      id: 2,
      title: 'Care products',
      link: '/care-products',
    },
    {
      id: 3,
      title: 'Manufacturer warranty',
      link: '/warranty',
    },
    {
      id: 4,
      title: 'FAQ and contact',
      link: '/faq',
    },
    {
      id: 5,
      title: 'Instructions',
      link: '/instructions',
    },
  ];
  productImg: HeaderImg[] = [
    {
      id: 1,
      title: 'Consulting & planning in the VitraHaus',
      image: '/categories.jpg',
      link: '/consulting',
    },
    {
      id: 2,
      title: 'Instructions',
      image: '/categories.jpg',
      link: '/instructions',
    },
    {
      id: 3,
      title: 'Outdoor care instructions',
      image: '/categories.jpg',
      link: '/outdoor',
    },
  ];
  toolItems: HeaderList[] = [
    {
      id: 1,
      title: 'pCon',
      link: '/pcon',
    },
    {
      id: 2,
      title: 'Planning Examples',
      link: '/planning',
    },
    {
      id: 3,
      title: 'Colour & Material Library',
      link: '/library',
    },
    {
      id: 4,
      title: 'Certificates and standards',
      link: '/certificates-standards',
    },
    {
      id: 5,
      title: 'Home Selection',
      link: '/home-selection',
    },
  ];
  homeItems: HeaderList[] = [
    {
      id: 1,
      title: 'Living room',
      link: '/living-room',
    },
    {
      id: 2,
      title: 'Dining room',
      link: '/dining-room',
    },
    {
      id: 3,
      title: 'Home Office',
      link: '/home-office',
    },
    {
      id: 4,
      title: "Children's room",
      link: '/children',
    },
    {
      id: 5,
      title: 'Outdoor',
      link: '/outdoor',
    },
  ];
  homeStoriesItems: HeaderList[] = [
    {
      id: 1,
      title: 'Home Stories',
      link: '/home-stories',
    },
    {
      id: 2,
      title: 'Augumented Reality',
      link: '/augmented-reality',
    },
    {
      id: 3,
      title: 'Colours & materials',
      link: '/colours',
    },
    {
      id: 4,
      title: 'Home Selection',
      link: '/selection',
    },
  ];
  officeItems: HeaderList[] = [
    {
      id: 1,
      title: 'Workspace',
      link: '/workspace',
    },
    {
      id: 2,
      title: 'Focus',
      link: '/focus',
    },
    {
      id: 3,
      title: 'Meeting',
      link: '/meeting',
    },
    {
      id: 4,
      title: 'Workshop',
      link: '/workshop',
    },
  ];
  vitraItems: HeaderList[] = [
    {
      id: 1,
      title: 'Club Office',
      link: '/club-office',
    },
    {
      id: 2,
      title: 'Citizen Office',
      link: '/citizen',
    },
    {
      id: 3,
      title: 'Studio Office',
      link: '/studio',
    },
    {
      id: 4,
      title: 'Dynamic Spaces',
      link: '/dynamic',
    },
  ];
  publicItems: HeaderList[] = [
    {
      id: 1,
      title: 'Hospitality',
      link: '/hospitality',
    },
    {
      id: 2,
      title: 'Airports',
      link: '/airports',
    },
    {
      id: 3,
      title: 'Education',
      link: '/education',
    },
    {
      id: 4,
      title: 'Co-working',
      link: '/co-working',
    },
    {
      id: 5,
      title: 'Healthcare',
      link: '/healthcare',
    },
  ];
  themesItems: HeaderList[] = [
    {
      id: 1,
      title: 'Our Clients',
      link: '/clients',
    },
    {
      id: 2,
      title: 'Destination Workplace',
      link: '/destination',
    },
    {
      id: 3,
      title: 'A case for classics',
      link: '/classics',
    },
    {
      id: 4,
      title: 'Office chairs',
      link: '/office-chairs',
    },
    {
      id: 5,
      title: 'Dancing Office',
      link: '/dancing-office',
    },
  ];
  inspirationsImage: HeaderImg[] = [
    {
      id: 1,
      title: 'Home Stories',
      image: '/categories.jpg',
      link: '/home-stories',
    },
    {
      id: 2,
      title: 'The Home Selection fabrics from Kvadrat and Dedar',
      image: '/categories.jpg',
      link: '/selection',
    },
    {
      id: 3,
      title: 'Augmented Reality - bring Vitra products into your home',
      image: '/categories.jpg',
      link: '/augmented-reality',
    },
    {
      id: 4,
      title: 'School of Design: Showcase work and knowledge',
      image: '/categories.jpg',
      link: '/school-design',
    },
    {
      id: 5,
      title: 'A case for classics',
      image: '/categories.jpg',
      link: '/classics',
    },
    {
      id: 6,
      title: 'Colour & material',
      image: '/categories.jpg',
      link: '/colour-material',
    },
    {
      id: 7,
      title: 'An open house',
      image: '/categories.jpg',
      link: '/open-house',
    },
    {
      id: 8,
      title: 'An office landscape - without walls or partitions',
      image: '/categories.jpg',
      link: '/office-landscape',
    },
    {
      id: 9,
      title: 'High comfort of low energy',
      image: '/categories.jpg',
      link: '/comfort',
    },
    {
      id: 10,
      title: 'A leading space for a leading art college',
      image: '/categories.jpg',
      link: '/garten',
    },
  ];
  seatingFurnitureItems: HeaderList[] = [
    {
      id: 1,
      title: 'Chairs',
      link: '/chairs',
    },
    {
      id: 2,
      title: 'Lounge chairs',
      link: '/lounge-chairs',
    },
    {
      id: 3,
      title: 'Sofas',
      link: '/sofas',
    },
    {
      id: 4,
      title: 'Office chairs',
      link: '/office-chairs',
    },
    {
      id: 5,
      title: 'Chaises longues',
      link: '/chaises',
    },
    {
      id: 6,
      title: 'Stools & benches',
      link: '/stools-benches',
    },
    {
      id: 7,
      title: 'Sculptures',
      link: '/sculptures',
    },
    {
      id: 8,
      title: 'Conference chairs',
      link: '/conference',
    },
    {
      id: 9,
      title: 'Airport seating',
      link: '/airport',
    },
  ];
  spatialItems: HeaderList[] = [
    {
      id: 1,
      title: 'Storage space',
      link: '/storage-space',
    },
    {
      id: 2,
      title: 'Micro architecture',
      link: '/micro',
    },
  ];
  TablesItems: HeaderList[] = [
    {
      id: 1,
      title: 'Dining tables',
      link: '/dining-tables',
    },
    {
      id: 2,
      title: 'Café tables',
      link: '/café',
    },
    {
      id: 3,
      title: 'Coffee & side tables',
      link: '/coffee-side',
    },
    {
      id: 4,
      title: 'Desks',
      link: '/desks',
    },
    {
      id: 5,
      title: 'Office furniture systems',
      link: '/office-systems',
    },
    {
      id: 6,
      title: 'Conference systems',
      link: '/conference-systems',
    },
  ];
  accessoriesItems: HeaderList[] = [
    {
      id: 1,
      title: 'Lighting',
      link: '/lighting',
    },
    {
      id: 2,
      title: 'Clocks',
      link: '/clocks',
    },
    {
      id: 3,
      title: 'Decorative objects',
      link: '/decorative-objects',
    },
    {
      id: 4,
      title: 'Coat racks & wall shelves',
      link: '/racks-shelves',
    },
    {
      id: 5,
      title: 'Trays & vessels',
      link: '/trays-vessels',
    },
  ];
  productDiscoverItems: HeaderList[] = [
    {
      id: 1,
      title: 'New',
      link: '/new',
    },
    {
      id: 2,
      title: 'Bestseller',
      link: '/bestseller',
    },
    {
      id: 3,
      title: 'Colour & material',
      link: '/colour-material',
    },
  ];
  designerItems: HeaderList[] = [
    {
      id: 1,
      title: 'Alexander Girard',
      link: '/alexander',
    },
    {
      id: 2,
      title: 'Antonio Citterio',
      link: '/antonio',
    },
    {
      id: 3,
      title: 'Barber Osgerby',
      link: '/barber',
    },
    {
      id: 4,
      title: 'Charles & Ray Eames',
      link: '/charles',
    },
    {
      id: 5,
      title: 'George Nelson',
      link: '/george',
    },
    {
      id: 6,
      title: 'Hella Jongerius',
      link: '/hella',
    },
    {
      id: 7,
      title: 'Isamu Noguchi',
      link: '/isamu',
    },
  ];
  finderItems: HeaderList[] = [
    {
      id: 1,
      title: 'Lounge chair finder',
      link: '/lounge-chair-finder',
    },
    {
      id: 2,
      title: 'Office chair finder',
      link: '/office-chair-finder',
    },
    {
      id: 3,
      title: 'Gift finder',
      link: '/gift-finder',
    },
  ];
  serviceItems: HeaderList[] = [
    {
      id: 1,
      title: 'Care & repair',
      link: '/care-repair',
    },
    {
      id: 2,
      title: 'Spare parts',
      link: '/spare-parts',
    },
    {
      id: 3,
      title: 'Care products',
      link: '/care-products',
    },
    {
      id: 4,
      title: 'Manufacturer warranty',
      link: '/warranty',
    },
  ];
  circularItems: HeaderList[] = [
    { id: 1, title: 'Vitra Circle Stores', link: '/vitra-circle' },
  ];
  productImage: HeaderImg[] = [
    {
      id: 1,
      title: 'Mynt: sit differently',
      link: '/mynt',
      image: '/categories.jpg',
    },
    {
      id: 2,
      title: 'Antony Limited Edition 2025',
      link: '/antony-limited-edition',
      image: '/categories.jpg',
    },
  ];
  menuIconItems: MenuIconList[] = [
    {
      id: 1,
      title: 'Account',
      icon: 'person',
      link: '/account',
    },
    {
      id: 2,
      title: 'Wishlist',
      icon: 'favorite',
      link: '/wishlist',
    },
    {
      id: 3,
      icon: 'language',
      link: '/language',
    },
    {
      id: 4,
      title: 'Find Vitra',
      icon: 'location_on',
      link: '/find-vitra',
    },
    {
      id: 5,
      title: 'Contact',
      icon: 'phone',
      link: '/phone',
    },
  ];

  showSubmenu = signal(false);
  selectedParent = signal<NavItem | null>(null);

  openSubmenu(item: NavItem) {
    if (item.children && item.children.length > 0) {
      this.selectedParent.set(item);
      this.showSubmenu.set(true);
    }
  }
  goBack() {
    this.showSubmenu.set(false);
    this.selectedParent.set(null);
  }

  scrollLeft() {
    const container = document.querySelector('.overflow-x-auto');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const container = document.querySelector('.overflow-x-auto');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  NavList: NavItem[] = [
    {
      id: 1,
      title: 'Products',
      link: '/products',
      dropDown: true,
      imageLayout: 'vertical',
      children: [
        { id: 1, title: 'Seating furniture', dropDown: false },
        { id: 2, title: 'Spatial organisation', dropDown: false },
        { id: 3, title: 'Tables', dropDown: false },
        { id: 4, title: 'Accessories', dropDown: false },
        { id: 5, title: 'Discover', dropDown: false },
        { id: 6, title: 'Designer', dropDown: false },
        { id: 7, title: 'Product finder', dropDown: false },
        { id: 8, title: 'Service', dropDown: false },
        { id: 9, title: 'Circular products', dropDown: false },
        { id: 10, title: '', dropDown: false, isGroupDivider: true },
      ],
      imageItems: [
        {
          id: 1,
          title: 'Mynt: sit differently',
          imageUrl: '/categories.jpg',
          imageTitle: 'Mynt: sit differently',
        },
        {
          id: 2,
          title: 'Antony Limited Edition 2025',
          imageUrl: '/categories.jpg',
          imageTitle: 'Antony Limited Edition 2025',
        },
      ],
    },

    {
      id: 2,
      title: 'Inspirations',
      menuType: 'grouped',
      dropDown: true,
      children: [
        { id: 1, title: 'Home', dropDown: false, isGroupHeader: true },
        { id: 2, title: 'Living room', dropDown: false },
        { id: 3, title: 'Dining room', dropDown: false },
        { id: 4, title: 'Home Office', dropDown: false },
        { id: 5, title: "Children's room", dropDown: false },
        { id: 6, title: 'Outdoor', dropDown: false },

        { id: 7, title: '', dropDown: false, isGroupDivider: true },

        { id: 8, title: 'Discover', dropDown: false, isGroupHeader: true },
        { id: 9, title: 'Home Stories', dropDown: false },
        { id: 10, title: 'Augmented Reality', dropDown: false },
        { id: 11, title: 'Colours & materials', dropDown: false },
        { id: 12, title: 'Home Selection', dropDown: false },

        { id: 13, title: '', dropDown: false, isGroupDivider: true },

        {
          id: 14,
          title: 'Office spaces',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 15, title: 'Workspace', dropDown: false },
        { id: 16, title: 'Focus', dropDown: false },
        { id: 17, title: 'Meeting', dropDown: false },
        { id: 18, title: 'Workshop', dropDown: false },

        { id: 19, title: '', dropDown: false, isGroupDivider: true },

        {
          id: 20,
          title: 'Vitra offices & concepts',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 21, title: 'Club Office', dropDown: false },
        { id: 22, title: 'Citizen Office', dropDown: false },
        { id: 23, title: 'Studio Office', dropDown: false },
        { id: 24, title: 'Dynamic Spaces', dropDown: false },

        { id: 25, title: '', dropDown: false, isGroupDivider: true },

        {
          id: 26,
          title: 'Public spaces',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 27, title: 'Hospitality', dropDown: false },
        { id: 28, title: 'Airports', dropDown: false },
        { id: 29, title: 'Education', dropDown: false },
        { id: 30, title: 'Co-working', dropDown: false },
        { id: 31, title: 'Healthcare', dropDown: false },

        { id: 32, title: '', dropDown: false, isGroupDivider: true },

        {
          id: 33,
          title: 'Themes',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 34, title: 'Our Clients', dropDown: false },
        { id: 35, title: 'Destination Workplace', dropDown: false },
        { id: 36, title: 'A case for classics', dropDown: false },
        { id: 37, title: 'Office chairs', dropDown: false },
        { id: 38, title: 'Dancing Office', dropDown: false },
        { id: 39, title: '', dropDown: false, isGroupDivider: true },

        {
          id: 40,
          title: 'Discover',
          dropDown: false,
          isGroupHeader: true,
        },
      ],
      imageItems: [
        {
          id: 1,
          title: 'Home Stories',
          imageUrl: '/categories.jpg',
          imageTitle: 'Home Stories',
          link: '/home-stories',
        },
        {
          id: 2,
          title: 'The Home Selection fabrics from Kvadrat and Dedar',
          imageUrl: '/categories.jpg',
          imageTitle: 'The Home Selection fabrics from Kvadrat and Dedar',
          link: '/home-selection-fabrics',
        },
        {
          id: 3,
          title: 'Augmented Reality - bring Vitra products into your home',
          imageUrl: '/categories.jpg',
          imageTitle: 'Augmented Reality - bring Vitra products into your home',
          link: '/augmented-reality',
        },
        {
          id: 4,
          title: 'School of Design: Showcase work and knowledge',
          imageUrl: '/categories.jpg',
          imageTitle: 'School of Design: Showcase work and knowledge',
          link: '/school-design',
        },
        {
          id: 5,
          title: 'A case for classics',
          imageUrl: '/categories.jpg',
          imageTitle: 'A case for classics',
          link: '/classic',
        },
        {
          id: 6,
          title: 'Colour & material',
          imageUrl: '/categories.jpg',
          imageTitle: 'Colour & material',
          link: '/colour-material',
        },
        {
          id: 7,
          title: 'An open house',
          imageUrl: '/categories.jpg',
          imageTitle: 'An open house',
          link: '/open-house',
        },
        {
          id: 8,
          title: 'An office landscape - without walls or partitions',
          imageUrl: '/categories.jpg',
          imageTitle: 'An office landscape - without walls or partitions',
          link: '/landscape',
        },
        {
          id: 9,
          title: 'High comfort of low energy',
          imageUrl: '/categories.jpg',
          imageTitle: 'High comfort of low energy',
          link: '/comfort',
        },
        {
          id: 10,
          title: 'A leading space for a leading art college',
          imageUrl: '/categories.jpg',
          imageTitle: 'A leading space for a leading art college',
          link: '/leading-space',
        },
      ],
    },
    {
      id: 3,
      title: 'Services',
      link: '/services',
      dropDown: true,
      children: [
        {
          id: 1,
          title: 'Product services',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 2, title: 'Care & repair', dropDown: false },
        { id: 3, title: 'Care products', dropDown: false },
        { id: 4, title: 'Manufacturer warranty', dropDown: false },
        { id: 5, title: 'FAQ and contact', dropDown: false },
        { id: 6, title: 'Instructions', dropDown: false },

        { id: 7, title: '', dropDown: false, isGroupDivider: true },

        {
          id: 8,
          title: 'Office planning',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 9, title: 'Consulting & Planning Studio', dropDown: false },
        { id: 10, title: '', dropDown: false, isGroupDivider: true },

        {
          id: 11,
          title: 'Circular products',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 12, title: 'Vitra Circle Stores', dropDown: false },
        { id: 13, title: '', dropDown: false, isGroupDivider: true },
        { id: 14, title: '', dropDown: false, isGroupDivider: true },
      ],
      imageItems: [
        {
          id: 1,
          title: 'Our Clients',
          imageUrl: '/categories.jpg',
          imageTitle: 'Our Clients',
          link: '/clients',
        },
        {
          id: 2,
          title: 'Mynt',
          imageUrl: '/categories.jpg',
          imageTitle: 'Mynt',
          link: '/mynt',
        },
        {
          id: 3,
          title: 'Destination Workplace: Visit our clients and partners',
          imageUrl: '/categories.jpg',
          imageTitle: 'Destination Workplace: Visit our clients and partners',
          link: '/destination',
        },
        {
          id: 4,
          title: 'Anagram Sofa',
          imageUrl: '/categories.jpg',
          imageTitle: 'Anagram Sofa',
          link: '/anagram',
        },
        {
          id: 5,
          title: 'Mikado',
          imageUrl: '/categories.jpg',
          imageTitle: 'Mikado',
          link: '/mikado',
        },
        {
          id: 6,
          title: 'Tyde 2 on castors',
          imageUrl: '/categories.jpg',
          imageTitle: 'Tyde 2 on castors',
          link: '/tyde',
        },
        {
          id: 7,
          title: 'ACX',
          imageUrl: '/categories.jpg',
          imageTitle: 'ACX',
          link: '/acx',
        },
        {
          id: 8,
          title: 'Dancing Office',
          imageUrl: '/categories.jpg',
          imageTitle: 'Dancing Office',
          link: '/dancing-office',
        },
        {
          id: 9,
          title: 'Office chairs',
          imageUrl: '/categories.jpg',
          imageTitle: 'Office chairs',
          link: '/office-chairs',
        },
      ],
    },
    {
      id: 4,
      title: 'Professionals',
      link: '/professionals',
      dropDown: true,
      children: [
        {
          id: 1,
          title: 'Downloads',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 2, title: 'CAD data', dropDown: false },
        { id: 3, title: 'Product factsheets', dropDown: false },
        { id: 4, title: 'Certificates', dropDown: false },
        { id: 5, title: 'Sustainability report', dropDown: false },
        { id: 6, title: 'Instructions', dropDown: false },
        { id: 7, title: 'Ecology information', dropDown: false },

        { id: 8, title: '', dropDown: false, isGroupDivider: true },

        { id: 9, title: 'Tools', dropDown: false, isGroupHeader: true },
        { id: 10, title: 'pCon', dropDown: false },
        { id: 11, title: 'Planning examples', dropDown: false },
        { id: 12, title: 'Colour & Material Library', dropDown: false },
        { id: 13, title: 'Certificates and standards', dropDown: false },
        { id: 14, title: 'Home Selection', dropDown: false },
        { id: 15, title: '', dropDown: false, isGroupDivider: true },

        { id: 16, title: 'Dealer', dropDown: false, isGroupHeader: true },
        { id: 17, title: 'To the dealer login', dropDown: false },
        { id: 18, title: '', dropDown: false, isGroupDivider: true },

        { id: 19, title: 'Dealer', dropDown: false, isGroupHeader: true },
      ],
      imageItems: [
        {
          id: 1,
          title: 'Consulting & planning in the VitraHaus',
          imageUrl: '/categories.jpg',
          imageTitle: 'Consulting & planning in the VitraHaus',
          link: '/consulting',
        },
        {
          id: 2,
          title: 'Instructions',
          imageUrl: '/categories.jpg',
          imageTitle: 'Instructions',
          link: '/instructions',
        },
        {
          id: 3,
          title: 'Outdoor care instructions',
          imageUrl: '/categories.jpg',
          imageTitle: 'Outdoor care instructions',
          link: '/outdoor',
        },
        {
          id: 4,
          title:
            'Repair, maintenance, overhaul at the Vitra Circle Store Campus',
          imageUrl: '/categories.jpg',
          imageTitle:
            'Repair, maintenance, overhaul at the Vitra Circle Store Campus',
          link: '/repair',
        },
      ],
    },
    {
      id: 5,
      title: 'Magazine',
      link: '/magazine',
      dropDown: true,
      children: [
        {
          id: 1,
          title: 'Categories',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 2, title: 'Stories', dropDown: false },
        { id: 3, title: 'Conversations', dropDown: false },
        { id: 4, title: 'Exhibitions', dropDown: false },
        { id: 5, title: 'Designer', dropDown: false },
        { id: 6, title: '', dropDown: false, isGroupDivider: true },
        { id: 7, title: 'Article', dropDown: false, isGroupHeader: true },
      ],
      imageItems: [
        {
          id: 1,
          title: 'Project Vitra',
          imageUrl: '/categories.jpg',
          imageTitle: 'Project Vitra',
          link: '/project',
        },
        {
          id: 2,
          title: 'Mynt is a lifetime achievement to me',
          imageUrl: '/categories.jpg',
          imageTitle: 'Mynt is a lifetime achievement to me',
          link: '/mynt',
        },
        {
          id: 3,
          title: 'A desk like a typeface',
          imageUrl: '/categories.jpg',
          imageTitle: 'A desk like a typeface',
          link: '/desk',
        },
        {
          id: 4,
          title: 'V-Foam',
          imageUrl: '/categories.jpg',
          imageTitle: 'V-Foam',
          link: '/v-foam',
        },
        {
          id: 5,
          title: 'Sculptural Icons',
          imageUrl: '/categories.jpg',
          imageTitle: 'Sculptural Icons',
          link: '/sculptural',
        },
        {
          id: 6,
          title: 'Game bring people together - just like good offices',
          imageUrl: '/categories.jpg',
          imageTitle: 'Game bring people together - just like good offices',
          link: '/game',
        },
        {
          id: 7,
          title: 'Let there be light!',
          imageUrl: '/categories.jpg',
          imageTitle: 'Let there be light!',
          link: '/let-light',
        },
        {
          id: 8,
          title: 'Social Seating',
          imageUrl: '/categories.jpg',
          imageTitle: 'Social Seating',
          link: '/social-seating',
        },
        {
          id: 9,
          title: 'Just Do It!',
          imageUrl: '/categories.jpg',
          imageTitle: 'Just Do It!',
          link: '/just-do-it',
        },
        {
          id: 10,
          title: 'EVER GREEN',
          imageUrl: '/categories.jpg',
          imageTitle: 'EVER GREEN',
          link: '/evergreen',
        },
        {
          id: 11,
          title: 'Why the Eames La Fonda Chair was dxesigned',
          imageUrl: '/categories.jpg',
          imageTitle: 'Why the Eames La Fonda Chair was dxesigned',
          link: '/chair-designed',
        },
        {
          id: 12,
          title: 'When a Sofa is more than just a Sofa: Anagram',
          imageUrl: '/categories.jpg',
          imageTitle: 'When a Sofa is more than just a Sofa: Anagram',
          link: '/sofa-more',
        },
        {
          id: 13,
          title: '100% virgin wool - 100% recyclable',
          imageUrl: '/categories.jpg',
          imageTitle: '100% virgin wool - 100% recyclable',
          link: '/virgin-wool',
        },
        {
          id: 14,
          title: 'An archive is like a time capsule',
          imageUrl: '/categories.jpg',
          imageTitle: 'An archive is like a time capsule',
          link: '/archive',
        },
        {
          id: 15,
          title: 'VitraHaus Loft - A conversation with Sabine Marcelis',
          imageUrl: '/categories.jpg',
          imageTitle: 'VitraHaus Loft - A conversation with Sabine Marcelis',
          link: '/vitrahaus-loft',
        },
        {
          id: 16,
          title: 'A 1000 m2 piece of furniture',
          imageUrl: '/categories.jpg',
          imageTitle: 'A 1000 m2 piece of furniture',
          link: '/1000m',
        },
        {
          id: 17,
          title: 'From a toy to an object',
          imageUrl: '/categories.jpg',
          imageTitle: 'From a toy to an object',
          link: '/toy-to-object',
        },
        {
          id: 18,
          title: 'The Eames Collection at the Vitra Design Museum',
          imageUrl: '/categories.jpg',
          imageTitle: 'The Eames Collection at the Vitra Design Museum',
          link: '/museum',
        },
        {
          id: 19,
          title: 'About the partnership between Eames and Vitra',
          imageUrl: '/categories.jpg',
          imageTitle: 'About the partnership between Eames and Vitra',
          link: '/about',
        },
      ],
    },
    {
      id: 6,
      title: 'Vitra Campus',
      link: '/campus',
      dropDown: true,
      children: [
        {
          id: 1,
          title: 'Discover',
          dropDown: false,
          isGroupHeader: true,
        },
        { id: 2, title: 'Exhibitions', dropDown: false },
        { id: 3, title: 'Guided tours & workshops', dropDown: false },
        { id: 4, title: 'Food and drink', dropDown: false },
        { id: 5, title: 'Shopping', dropDown: false },
        { id: 6, title: 'Activities for families', dropDown: false },
        { id: 7, title: 'Architecture', dropDown: false },
        { id: 8, title: 'Your event', dropDown: false },
        {
          id: 9,
          title: 'Consulting & planning in the VitraHaus',
          dropDown: false,
        },

        { id: 10, title: '', dropDown: false, isGroupDivider: true },
        {
          id: 11,
          title: 'Visitor information',
          dropDown: false,
          isGroupHeader: true,
        },

        { id: 12, title: 'Plan your visit', dropDown: false },
        { id: 13, title: 'Vitra Campus app', dropDown: false },
        { id: 14, title: 'Campus Events', dropDown: false },
        { id: 15, title: 'News', dropDown: false },

        { id: 16, title: '', dropDown: false, isGroupDivider: true },
        { id: 17, title: 'Highlights', dropDown: false, isGroupHeader: true },
      ],
      imageItems: [
        {
          id: 1,
          title: 'VitraHaus',
          imageUrl: '/categories.jpg',
          imageTitle: 'VitraHaus',
          link: '/vitrahaus',
        },
        {
          id: 2,
          title: 'Vitra Design Museum',
          imageUrl: '/categories.jpg',
          imageTitle: 'Vitra Design Museum',
          link: '/museum',
        },
        {
          id: 3,
          title: 'Vitra Schaudepot',
          imageUrl: '/categories.jpg',
          imageTitle: 'Vitra Schaudepot',
          link: '/schaudepot',
        },
        {
          id: 4,
          title: 'Vitra Circle Store Campus',
          imageUrl: '/categories.jpg',
          imageTitle: 'Vitra Circle Store Campus',
          link: '/circle-store',
        },
        {
          id: 5,
          title: 'Oudolf Garten',
          imageUrl: '/categories.jpg',
          imageTitle: 'Oudolf Garten',
          link: '/oudolf-garde ',
        },
      ],
    },
    {
      id: 7,
      title: 'About Vitra',
      link: '/about',
      dropDown: true,
      children: [
        {
          id: 1,
          title: 'Discover',
          dropDown: false,
          isGroupHeader: true,
        },
      ],
      imageItems: [
        {
          id: 1,
          title: 'Sustainability',
          imageUrl: '/categories.jpg',
          imageTitle: 'Sustainability',
          link: '/sustainability',
        },
        {
          id: 2,
          title: 'Jobs & Careers',
          imageUrl: '/categories.jpg',
          imageTitle: 'Jobs & Careers',
          link: '/jobs',
        },
        {
          id: 3,
          title: 'Design process',
          imageUrl: '/categories.jpg',
          imageTitle: 'Design process',
          link: '/design-process',
        },
        {
          id: 4,
          title: 'The Original is by Vitra',
          imageUrl: '/categories.jpg',
          imageTitle: 'The Original is by Vitra',
          link: '/original',
        },
        {
          id: 5,
          title: 'History - Project Vitra',
          imageUrl: '/categories.jpg',
          imageTitle: 'History - Project Vitra',
          link: '/history ',
        },
      ],
    },
  ];
}
