import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {MainComponent} from './main/main.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, MainComponent, FooterComponent],
  template:`
<app-header/>
<app-main/>
<app-footer/>
  `,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
