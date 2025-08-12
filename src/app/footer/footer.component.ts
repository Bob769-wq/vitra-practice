import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector:'app-footer',
  imports:[],
  template:`
  <section class="bg-gray-200 grid grid-cols-3 px-16 py-8 text-center">
    <div class="w-full px-8" >
      <h3 class=" border-b border-b-black py-2">Products</h3>
      <ul>
        <li class="border-b border-b-gray-300 py-2"><a>All Products</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>New Products</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Designer</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Manufacturer warranty</a></li>
        <li class=" py-2"><a>Colours & materials</a></li>
      </ul>
    </div>
    <div class="w-full px-8" >
      <h3 class=" border-b border-b-black py-2">About Vitra</h3>
      <ul>
        <li class="border-b border-b-gray-300 py-2"><a>Facts</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Vitra Campus</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Sustainability</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Magazine</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Jobs & Careers</a></li>
        <li class=" py-2"><a>Press</a></li>
      </ul>
    </div>
    <div class="w-full px-8" >
      <h3 class=" border-b border-b-black py-2">Contact</h3>
      <ul>
        <li class="border-b border-b-gray-300 py-2"><a>Contact Vitra</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Find Vitra</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Vitra Companies</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Subscribe to the newsletter</a></li>
        <li class="py-2"><a>Vitra Circle Stores</a></li>
      </ul>
    </div>
    <div class="w-full px-8" >
      <h3 class=" border-b border-b-black py-2">Professionals</h3>
      <ul>
        <li class="border-b border-b-gray-300 py-2"><a>Downloads</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Projects</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Our Clients</a></li>
        <li class=" py-2"><a>Tools</a></li>

      </ul>
    </div>
    <div></div>
    <div class="w-full px-8" >
      <h3 class=" border-b border-b-black py-2">Legal</h3>
      <ul>
        <li class="border-b border-b-gray-300 py-2"><a>Distribution rights</a></li>
        <li class="border-b border-b-gray-300 py-2"><a>Imprint</a></li>
        <li class=" py-2"><a>Privacy Policy</a></li>

      </ul>
    </div>
    <div></div>
    <div class="w-full px-8 " >

      <ul class="flex justify-center text-3xl">
        <li class="p-2 hover:text-red-600"><a><i class="fa-brands fa-youtube"></i></a></li>
        <li class=" p-2 hover:text-red-600"><a><i class="fa-brands fa-twitter"></i></a></li>
        <li class=" p-2 hover:text-red-600"><a><i class="fa-brands fa-facebook"></i></a></li>
        <li class=" p-2 hover:text-red-600"><a><i class="fa-brands fa-pinterest"></i></a></li>
        <li class=" p-2 hover:text-red-600"><a><i class="fa-brands fa-instagram"></i></a></li>
        <li class=" p-2 hover:text-red-600"><a><i class="fa-brands fa-linkedin"></i></a></li>
      </ul>
      <p class="py-3">COPYRIGHT 2025 VITRA INTERNATIONAL AG</p>
      <p class="py-3 hover:text-red-600">Cookie Settings</p>
      <button class="text-white w-full py-3 bg-gray-800">UP</button>
    </div>
    <div></div>
  </section>
  `,
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

}
