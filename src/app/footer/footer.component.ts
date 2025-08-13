import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <section class="bg-gray-200 grid grid-cols-3 px-16 py-8 text-center">
      <div class="w-full px-8">
        <h3 class=" border-b border-b-black py-2 font-bold">Products</h3>
        <ul>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/allproducts">All Products</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/newproducts">New Products</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/designer">Designer</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/manufacturer">Manufacturer warranty</a>
          </li>
          <li class=" py-2 hover:text-red-600">
            <a routerLink="/colours">Colours & materials</a>
          </li>
        </ul>
      </div>
      <div class="w-full px-8">
        <h3 class=" border-b border-b-black py-2 font-bold">About Vitra</h3>
        <ul>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/facts">Facts</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/vitracampus">Vitra Campus</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/sustainability">Sustainability</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/magazine">Magazine</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/jobs">Jobs & Careers</a>
          </li>
          <li class=" py-2 hover:text-red-600">
            <a routerLink="/press">Press</a>
          </li>
        </ul>
      </div>
      <div class="w-full px-8">
        <h3 class=" border-b border-b-black py-2 font-bold">Contact</h3>
        <ul>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/contact">Contact Vitra</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/find">Find Vitra</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/company">Vitra Companies</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/subscribe">Subscribe to the newsletter</a>
          </li>
          <li class="py-2 hover:text-red-600">
            <a routerLink="/stores">Vitra Circle Stores</a>
          </li>
        </ul>
      </div>
      <div class="w-full px-8">
        <h3 class=" border-b border-b-black py-2 font-bold">Professionals</h3>
        <ul>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/download">Downloads</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/project">Projects</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/client">Our Clients</a>
          </li>
          <li class="py-2 hover:text-red-600">
            <a routerLink="/tools">Tools</a>
          </li>
        </ul>
      </div>
      <div></div>
      <div class="w-full px-8">
        <h3 class=" border-b border-b-black py-2 font-bold">Legal</h3>
        <ul>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/rights">Distribution rights</a>
          </li>
          <li class="border-b border-b-gray-300 py-2 hover:text-red-600">
            <a routerLink="/imprint">Imprint</a>
          </li>
          <li class=" py-2 hover:text-red-600">
            <a routerLink="/privacy">Privacy Policy</a>
          </li>
        </ul>
      </div>
      <div></div>
      <div class="w-full px-8 ">
        <ul class="flex justify-center text-3xl">
          <li class="p-2 hover:text-red-600">
            <a routerLink="/youtube"><i class="fa-brands fa-youtube"></i></a>
          </li>
          <li class=" p-2 hover:text-red-600">
            <a routerLink="/twitter"><i class="fa-brands fa-twitter"></i></a>
          </li>
          <li class=" p-2 hover:text-red-600">
            <a routerLink="/facebook"><i class="fa-brands fa-facebook"></i></a>
          </li>
          <li class=" p-2 hover:text-red-600">
            <a routerLink="/pinterest"
              ><i class="fa-brands fa-pinterest"></i
            ></a>
          </li>
          <li class=" p-2 hover:text-red-600">
            <a routerLink="/instagram"
              ><i class="fa-brands fa-instagram"></i
            ></a>
          </li>
          <li class=" p-2 hover:text-red-600">
            <a routerLink="/linkedin"><i class="fa-brands fa-linkedin"></i></a>
          </li>
        </ul>
        <p class="py-3">COPYRIGHT 2025 VITRA INTERNATIONAL AG</p>
        <a routerLink="/cookies" class="block py-3 hover:text-red-600"
          >Cookie Settings</a
        >
        <button
          (click)="scrollToTop()"
          class="text-white w-full py-3 bg-gray-800 hover:bg-gray-500"
        >
          UP
        </button>
      </div>
      <div></div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滾動效果
    });
  }
}
