import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  activeDropdown = signal<string | null>(null);

  setActiveDropdown(title: string | null) {
    this.activeDropdown.set(title);
  }

  closeDropdown() {
    this.activeDropdown.set(null);
  }
}
