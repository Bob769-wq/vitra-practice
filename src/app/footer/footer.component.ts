import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SocialLink {
  id: number;
  link: string;
  iClass: string;
}

interface Products {
  id: number;
  link: string;
  title: string;
}

interface About {
  id: number;
  link: string;
  title: string;
}

interface Contact {
  id: number;
  link: string;
  title: string;
}

interface Professionals {
  id: number;
  link: string;
  title: string;
}

interface Legal {
  id: number;
  link: string;
  title: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="pt-8  bg-gray-200 font-light">
      <section class=" grid grid-cols-3 gap-12 max-w-7xl m-auto text-center">
        <div class="w-full ">
          <h3 class=" border-b border-b-black py-3 font-bold">Products</h3>
          <ul>
            @for (product of products; track product.id) {
              <li class="border-t border-t-gray-300 py-3 hover:text-red-600">
                <a [routerLink]="product.link">{{ product.title }}</a>
              </li>
            }
          </ul>
        </div>
        <div class="w-full ">
          <h3 class=" border-b border-b-black py-3 font-bold">About Vitra</h3>
          <ul>
            @for (about of abouts; track about.id) {
              <li class="border-t border-t-gray-300 py-3 hover:text-red-600">
                <a [routerLink]="about.link">{{ about.title }}</a>
              </li>
            }
          </ul>
        </div>
        <div class="w-full ">
          <h3 class=" border-b border-b-black py-3 font-bold">Contact</h3>
          <ul>
            @for (contact of contacts; track contact.id) {
              <li class="border-t border-t-gray-300 py-3 hover:text-red-600">
                <a [routerLink]="contact.link">{{ contact.title }}</a>
              </li>
            }
          </ul>
        </div>
        <div class="w-full ">
          <h3 class=" border-b border-b-black py-3 font-bold">Professionals</h3>
          <ul>
            @for (professional of professionals; track professional.id) {
              <li class="border-t border-t-gray-300 py-3 hover:text-red-600">
                <a [routerLink]="professional.link">{{ professional.title }}</a>
              </li>
            }
          </ul>
        </div>
        <div></div>
        <div class="w-full ">
          <h3 class=" border-b border-b-black py-3 font-bold">Legal</h3>
          <ul>
            @for (legal of legals; track legal.id) {
              <li class="border-t border-t-gray-300 py-3 hover:text-red-600">
                <a [routerLink]="legal.link"> {{ legal.title }}</a>
              </li>
            }
          </ul>
        </div>
        <div></div>
        <div class="w-full  ">
          <ul class="flex justify-center text-3xl">
            @for (social of socialLinks; track social.id) {
              <li class="p-2 hover:text-red-600">
                <a [routerLink]="social.link"
                  ><i [class]="social.iClass"></i
                ></a>
              </li>
            }
          </ul>
          <p class="py-3 text-sm">COPYRIGHT 2025 VITRA INTERNATIONAL AG</p>
          <a routerLink="/cookies" class="block text-sm py-3 hover:text-red-600"
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
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  socialLinks: SocialLink[] = [
    {
      id: 1,
      link: '/youtube',
      iClass: 'fa-brands fa-youtube',
    },
    {
      id: 2,
      link: '/twitter',
      iClass: 'fa-brands fa-twitter',
    },
    {
      id: 3,
      link: '/facebook',
      iClass: 'fa-brands fa-facebook',
    },
    {
      id: 4,
      link: '/pinterest',
      iClass: 'fa-brands fa-pinterest',
    },
    {
      id: 5,
      link: '/instagram',
      iClass: 'fa-brands fa-instagram',
    },
    {
      id: 6,
      link: '/linkedin',
      iClass: 'fa-brands fa-linkedin',
    },
  ];

  products: Products[] = [
    {
      id: 1,
      link: '/all-products',
      title: 'All Products',
    },
    {
      id: 2,
      link: '/new-products',
      title: 'New Products',
    },
    {
      id: 3,
      link: '/designer',
      title: 'Designer',
    },
    {
      id: 4,
      link: '/manufacturer',
      title: 'Manufacturer warranty',
    },
    {
      id: 5,
      link: '/colours',
      title: 'Colours & materials',
    },
  ];

  abouts: About[] = [
    {
      id: 1,
      link: '/facts',
      title: 'Facts',
    },
    {
      id: 2,
      link: '/vitra-campus',
      title: 'Vitra Campus',
    },
    {
      id: 3,
      link: '/sustainability',
      title: 'Sustainability',
    },
    {
      id: 4,
      link: '/magazine',
      title: 'Magazine',
    },
    {
      id: 5,
      link: '/jobs',
      title: 'Jobs & Careers',
    },
    {
      id: 6,
      link: '/press',
      title: 'Press',
    },
  ];

  contacts: Contact[] = [
    {
      id: 1,
      link: '/contact-vitra',
      title: 'Contact Vitra',
    },
    {
      id: 2,
      link: '/find',
      title: 'Find Vitra',
    },
    {
      id: 3,
      link: '/vitra-companies',
      title: 'Vitra Companies',
    },
    {
      id: 4,
      link: '/subscribe',
      title: 'Subscribe to the newsletter',
    },
    {
      id: 5,
      link: '/circle-stores',
      title: 'Vitra Circle Stores',
    },
  ];

  professionals: Professionals[] = [
    {
      id: 1,
      link: '/downloads',
      title: 'Downloads',
    },
    {
      id: 2,
      link: '/projects',
      title: 'Projects',
    },
    {
      id: 3,
      link: '/clients',
      title: 'Our Clients',
    },
    {
      id: 4,
      link: '/tools',
      title: 'Tools',
    },
  ];

  legals: Legal[] = [
    {
      id: 1,
      link: '/rights',
      title: 'Distribution rights',
    },
    {
      id: 2,
      link: '/imprint',
      title: 'Imprint',
    },
    {
      id: 3,
      link: '/privacy-policy',
      title: 'Privacy Policy',
    },
  ];

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
