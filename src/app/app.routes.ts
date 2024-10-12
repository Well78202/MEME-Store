import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { LayoutComponent } from "./layouts/layout/layout.component";
import { logedGuard } from "./core/guards/loged.guard";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./components/sign-in/sign-in.component').then(m => m.SignInComponent)
      },
      {
        path: 'registration',
        loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent)
      },
      {
        path: 'forget-password',
        loadComponent: () => import('./components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent)
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details.component').then(m => m.DetailsComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'brands',
        loadComponent: () => import('./components/brands/brands.component').then(m => m.BrandsComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then(m => m.CategoriesComponent)
      },
      {
        path: 'allorders',
        loadComponent: () => import('./components/allorders/allorders.component').then(m => m.AllordersComponent)
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./components/orders/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./components/wishlist/wishlist.component').then(m => m.WishlistComponent)
      }
    ]
  },
  { path: '**', loadComponent:()=> import('./components/notfound/notfound.component').then(m => m.NotfoundComponent) }
];
