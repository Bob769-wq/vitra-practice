import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface SocialLink {
  id: number;
  link: string;
  iClass: string;
}

// TODO: can combine these interfaces into a single one if they share common properties done

interface FooterItems {
  id: number;
  link: string;
  title: string;
}
type SectionKey = 'products' | 'professionals' | 'about' | 'contact' | 'legal';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="py-6 md:pb-0 pt-6 bg-gray-200 font-light">
      <!--      TODO: the layout here is wrong done-->
      <section
        class="px-5 flex flex-col md:text-center lg:px-0 lg:flex-row lg:gap-12 max-w-7xl m-auto lg:text-center"
      >
        <div class="w-full">
          <div>
            <h3
              class="border-b border-b-black py-3 font-bold"
              (click)="toggleSection('products')"
            >
              Products
            </h3>
            <ul [class.hidden]="!openSections()['products']" class="lg:block">
              @for (product of products; track product.id) {
                <!--              TODO: hover should have cursor-pointer indicator done-->
                <li class="border-t border-t-gray-300 py-3">
                  <a [routerLink]="product.link" class="hover:text-red-600">{{
                    product.title
                  }}</a>
                </li>
              }
            </ul>
          </div>
          <div>
            <h3
              class=" border-b border-b-black py-3 font-bold"
              (click)="toggleSection('professionals')"
            >
              Professionals
            </h3>
            <ul
              [class.hidden]="!openSections()['professionals']"
              class="lg:block"
            >
              @for (professional of professionals; track professional.id) {
                <li class="border-t border-t-gray-300 py-3">
                  <a
                    [routerLink]="professional.link"
                    class="hover:text-red-600"
                    >{{ professional.title }}</a
                  >
                </li>
              }
            </ul>
          </div>
        </div>
        <div class="w-full">
          <div class="w-full ">
            <h3
              class=" border-b border-b-black py-3 font-bold"
              (click)="toggleSection('about')"
            >
              About Vitra
            </h3>
            <ul [class.hidden]="!openSections()['about']" class="lg:block">
              @for (about of abouts; track about.id) {
                <li class="border-t border-t-gray-300 py-3">
                  <a [routerLink]="about.link" class="hover:text-red-600">{{
                    about.title
                  }}</a>
                </li>
              }
            </ul>
          </div>
        </div>
        <div class="w-full">
          <div>
            <h3
              class=" border-b border-b-black py-3 font-bold"
              (click)="toggleSection('contact')"
            >
              Contact
            </h3>
            <ul [class.hidden]="!openSections()['contact']" class="lg:block">
              @for (contact of contacts; track contact.id) {
                <li class="border-t border-t-gray-300 py-3">
                  <a [routerLink]="contact.link" class="hover:text-red-600">{{
                    contact.title
                  }}</a>
                </li>
              }
            </ul>
          </div>
          <div>
            <h3
              class=" border-b border-b-black py-3 font-bold"
              (click)="toggleSection('legal')"
            >
              Legal
            </h3>
            <ul [class.hidden]="!openSections()['legal']" class="lg:block">
              @for (legal of legals; track legal.id) {
                <li class="border-t border-t-gray-300 py-3">
                  <a [routerLink]="legal.link" class="hover:text-red-600">
                    {{ legal.title }}</a
                  >
                </li>
              }
            </ul>
          </div>
        </div>
      </section>

      <div class="flex flex-col items-center gap-6 pt-10">
        <ul class="flex justify-center text-3xl">
          @for (social of socialLinks; track social.id) {
            <li class="p-2">
              <a [routerLink]="social.link" class="hover:text-red-600"
                ><i [class]="social.iClass"></i
              ></a>
            </li>
          }
        </ul>

        <p class="text-sm text-center">COPYRIGHT 2025 VITRA INTERNATIONAL AG</p>
        <a
          routerLink="/cookies"
          class="block text-sm text-center hover:text-red-600"
          >Cookie Settings</a
        >
        <button
          (click)="scrollToTop()"
          class="text-white px-48 py-4 bg-gray-900 hover:bg-gray-500"
        >
          UP
        </button>
      </div>
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

  products: FooterItems[] = [
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

  abouts: FooterItems[] = [
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

  contacts: FooterItems[] = [
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

  professionals: FooterItems[] = [
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

  legals: FooterItems[] = [
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

  openSections = signal<Record<SectionKey, boolean>>({
    products: false,
    professionals: false,
    about: false,
    contact: false,
    legal: false,
  });

  toggleSection(section: SectionKey) {
    this.openSections.update(
      (current) =>
        ({
          ...current,
          [section]: !current[section],
        }) as Record<SectionKey, boolean>
    );
  }

  protected readonly close = close;
}
