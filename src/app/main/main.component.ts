import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink],
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

    <section class="grid grid-cols-2 gap-4 py-16  m-auto max-w-7xl">
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
        <h2 class="text-5xl font-extralight mb-6">
          Vitra's Environmental Mission
        </h2>
        <a
          routerLink="/details"
          class="border-t-2 border-b-2  border-black py-2 px-10 hover:bg-black hover:text-white"
        >
          MORE DETAILS
        </a>
      </div>
    </section>

    <section class=" m-auto max-w-[1380px] pt-16 text-center">
      <h2 class="text-5xl font-extralight mb-9">Product categories</h2>
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
    </section>

    <section class="m-auto max-w-7xl pb-12">
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

    <section class="grid grid-cols-3 m-auto max-w-[1600px] w-full ">
      <div class="col-span-2">
        <img src="/destination.jpg" alt="destination" />
      </div>
      <div class="bg-gray-300 px-10 flex items-center">
        <div>
          <h3 class="text-4xl">Destination Workplace</h3>
          <p class="text-xl py-10 leading-8">
            Are you keen on transforming your office into a destination? Join us
            for a destination journey: visit our clients and partners to learn
            firsthand how they have successfully redefined their spaces and find
            inspiration for your own.
          </p>
          <a
            class="bg-gray-900 text-white px-10 py-4 hover:bg-gray-500 "
            routerLink="/more"
            >MORE DETAILS</a
          >
        </div>
      </div>
    </section>

    <section class="bg-gray-100">
      <div class=" max-w-7xl m-auto py-20 grid grid-cols-2 mt-16">
        <div>
          <h3 class="text-2xl font-medium">Vitra Newsletter</h3>
          <p class="text-base">
            New products,limited editions, event invitations and much more.
          </p>
        </div>
        <div class="flex gap-6 text-lg items-center">
          <a
            routerLink="/private"
            class="hover:text-red-600 flex items-center gap-2"
          >
            <div class="bg-black rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                width="25"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  fill="#ffffff"
                  d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"
                />
              </svg>
            </div>
            Private customers
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 512 512"
            >
              <!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                fill="#cccccc"
                d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
              />
            </svg>
          </a>
          <a
            routerLink="/business"
            class="hover:text-red-600 flex items-center gap-2"
          >
            <div class="bg-black rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                width="25"
                viewBox="0 0 384 512"
              >
                <!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  fill="#ffffff"
                  d="M64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l80 0 0-80c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 80 80 0c8.8 0 16-7.2 16-16l0-384c0-8.8-7.2-16-16-16L64 48zM0 64C0 28.7 28.7 0 64 0L320 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm96 48c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM240 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM96 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm144-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"
                />
              </svg>
            </div>
            Business customers
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 512 512"
            >
              <!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
              <path
                fill="#cccccc"
                d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
              />
            </svg>
          </a>
        </div>
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
      link: '/categories/dining-tables',
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
    {
      id: 9,
      item: 'Office furniture systems',
      image: '/categories.jpg',
      link: 'categories/office-furniture',
    },
    {
      id: 10,
      item: 'Café tables',
      image: '/categories.jpg',
      link: 'categories/café',
    },
    {
      id: 11,
      item: 'Conference chairs',
      image: '/categories.jpg',
      link: 'categories/conference-chairs',
    },
    {
      id: 12,
      item: 'Conference systems',
      image: '/categories.jpg',
      link: 'categories/conference-systems',
    },
    {
      id: 13,
      item: 'Micro architecture',
      image: '/categories.jpg',
      link: 'categories/micro',
    },
    {
      id: 14,
      item: 'Airport seating',
      image: '/categories.jpg',
      link: 'categories/airport',
    },
  ];
}
