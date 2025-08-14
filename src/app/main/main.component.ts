import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink, MatIcon],
  template: `
    <section class="group relative ">
      <img
        src="/sofa.jpg"
        alt="slow chair slow sofa"
        class="w-full aspect-[5/2]  object-cover"
      />
      <div class="absolute inset-0 flex justify-center items-center">
        <div class="text-center">
          <h1
            class="text-white text-5xl translate-y-4 group-hover:translate-y-0 transition-all duration-500 "
          >
            Slow Chair & Slow Sofa
          </h1>
          <div
            class="opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            <p
              class="text-white text-xl mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
            >
              A haven for slowing down
            </p>

            <button
              class="bg-white text-black px-8 py-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500  hover:bg-gray-100"
            >
              MORE DETAILS
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-2 gap-4 p-16">
      <div class="">
        <a routerLink="uten" class="cursor-pointer group">
          <div class="overflow-hidden">
            <img
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              alt=""
              src="/uten.jpg"
            />
          </div>
          <div class="mt-1">
            <h3 class="text-center group-hover:text-red-600">Uten.Silo RE</h3>
            <p class="text-center text-gray-500 group-hover:text-red-600">
              Keeping things tidy - now entirely from recycled materials.
            </p>
          </div>
        </a>
      </div>
      <div class="">
        <a routerLink="uten" class="cursor-pointer group">
          <div class="overflow-hidden">
            <img
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              alt=""
              src="/tipton.jpg"
            />
          </div>

          <div class="mt-1">
            <h3 class="text-center group-hover:text-red-600">Tip Ton RE</h3>
            <p class="text-center text-gray-500 group-hover:text-red-600">
              The chair that can't sit still - in four new colors
            </p>
          </div>
        </a>
      </div>
      <div class="">
        <a routerLink="uten" class="cursor-pointer group">
          <div class="overflow-hidden">
            <img
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              alt=""
              src="/outdoor.jpg"
            />
          </div>
          <div class="mt-1">
            <h3 class="text-center group-hover:text-red-600">
              Outdoor Collection
            </h3>
            <p class="text-center text-gray-500 group-hover:text-red-600">
              Step outside and make the most of the season.
            </p>
          </div>
        </a>
      </div>
      <div class="">
        <a routerLink="uten" class="cursor-pointer group">
          <div class="overflow-hidden">
            <img
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              alt=""
              src="/vitracampus.jpg"
            />
          </div>
          <div class="mt-1">
            <h3 class="text-center group-hover:text-red-600">Vitra Campus</h3>
            <p class="text-center text-gray-500 group-hover:text-red-600">
              Plan your visit
            </p>
          </div>
        </a>
      </div>
    </section>

    <section
      routerLink="/mission"
      class="relative h-96 bg-cover bg-center bg-no-repeat flex justify-center items-center text-center "
      style="background-image: url('/mission.jpg')"
    >
      <div class="w-1/3">
        <h2 class="text-5xl font-light mb-6">Vitra's Environmental Mission</h2>
        <a
          routerLink="/details"
          class="border-t-2 border-b-2  border-black py-2 px-10 hover:bg-black hover:text-white"
        >
          MORE DETAILS
        </a>
      </div>
    </section>

    <section class="p-16 text-center">
      <h2 class="text-5xl font-light mb-9">Product categories</h2>
      <div class="overflow-x-scroll scrollbar-hide">
        <div class="flex gap-6 w-max">
          @for (category of categories; track category.id) {
            <div class="cursor-pointer" [routerLink]="category.link">
              <div class="w-60 relative">
                <img
                  [src]="category.image"
                  [alt]="category.item"
                  class="w-full  object-cover aspect-[5/8]"
                />
                <div class="absolute inset-0 flex items-end p-6">
                  <h3 class="text-white text-xl font-medium">
                    {{ category.item }}
                  </h3>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-20">
        <a routerLink="/workplace" class=" group ">
          <div class="overflow-hidden">
            <img
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              alt=""
              src="/workplace.jpg"
            />
          </div>
          <div class="mt-1">
            <h3 class="text-center group-hover:text-red-600">
              Inspiring and flexible workspaces
            </h3>
            <p class="text-center text-gray-500 group-hover:text-red-600">
              Collaborate with us - Consulting & Planning Studio
            </p>
          </div>
        </a>

        <a routerLink="/clients" class=" group">
          <div class="overflow-hidden">
            <img
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              alt=""
              src="/ourclients.jpg"
            />
          </div>
          <div class="mt-1">
            <h3 class="text-center group-hover:text-red-600">
              No matter which industry and no matter where in the world
            </h3>
            <p class="text-center text-gray-500 group-hover:text-red-600">
              Our Clients
            </p>
          </div>
        </a>
      </div>
    </section>

    <section class="grid grid-cols-3 ">
      <div
        class="col-span-2 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/destination.jpg')"
      ></div>
      <div class=" bg-gray-300 px-16 py-32">
        <h3 class=" text-3xl">Destination Workplace</h3>
        <p class="text-lg">
          Are you keen on transforming your office into a destination? Join us
          for a destination journey: visit our clients and partners to learn
          firsthand how they have successfully redefined their spaces and find
          inspiration for your own.
        </p>
        <a
          routerLink="/more"
          class=" inline-block px-4 py-2 mt-4 bg-gray-800 hover:bg-gray-500 text-white"
        >
          MORE DETAILS
        </a>
      </div>
    </section>

    <section class="bg-gray-100 p-20 grid grid-cols-2 mt-16">
      <div>
        <h3 class="text-2xl">Vitra Newsletter</h3>
        <p class="text-lg">
          New products,limited editions, event invitations and much more.
        </p>
      </div>
      <div class="flex gap-3 text-lg items-center">
        <a routerLink="/private" class="hover:text-red-600">
          <mat-icon>home</mat-icon>
          Private customers
        </a>
        <a routerLink="/business" class="hover:text-red-600">
          <mat-icon>business</mat-icon>
          Business customers
        </a>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  categories = [
    {
      id: 1,
      item: 'Chairs',
      image: '/categories.jpg',
      link: '/categories/chairs',
    },
    {
      id: 2,
      item: 'Dining tables',
      image: '/categories.jpg',
      link: '/categories/diningtables',
    },
    {
      id: 3,
      item: 'Office chairs',
      image: '/categories.jpg',
      link: '/categories/officechairs',
    },
    {
      id: 4,
      item: 'Desks',
      image: '/categories.jpg',
      link: '/categories/desks',
    },
    {
      id: 5,
      item: 'Lounge chairs',
      image: '/categories.jpg',
      link: '/categories/loungechairs',
    },
    {
      id: 6,
      item: 'Sofas',
      image: '/categories.jpg',
      link: '/categories/sofa',
    },
    {
      id: 7,
      item: 'Coffee & Side Tables',
      image: '/categories.jpg',
      link: 'categories/coffee',
    },
    {
      id: 8,
      item: 'Accessories',
      image: '/categories.jpg',
      link: 'categories/accessories',
    },
  ];
}
