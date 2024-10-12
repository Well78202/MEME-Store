import { Component } from '@angular/core';
import { NavAuthComponent } from '../../components/nav-auth/nav-auth.component';
import { RouterOutlet } from '@angular/router';
import { footerComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavAuthComponent, RouterOutlet, footerComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
