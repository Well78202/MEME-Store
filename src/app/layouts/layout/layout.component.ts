import { Component } from '@angular/core';
import { navComponent } from "../../components/nav/nav.component";
import { RouterOutlet } from '@angular/router';
import { footerComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [navComponent, RouterOutlet, footerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
