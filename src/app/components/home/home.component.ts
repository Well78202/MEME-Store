import { SearchForProductByTitlePipe } from './../../core/pipes/search-for-product-by-title.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Component, inject, OnDestroy, OnInit, PipeTransform } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { ICategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';
import { RouterLink } from '@angular/router';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, TrimTextPipe, SearchForProductByTitlePipe, FormsModule, CurrencyPipe, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
})
export class HomeComponent implements OnInit,OnDestroy {
  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

  private getAllProductsSub!:Subscription
   private getAllCategoriesSub!:Subscription
  private AddProductToCartSub!:Subscription
  // private getLoggedUserWishlistSub!:Subscription

  productsList!:IProduct[]
  categoriesList!:ICategory[]
  text:string = ""

  ngOnInit(): void {
    this.getAllCategoriesSub=this._CategoriesService.getAllCategories().subscribe({
      next:(res)=> {
        this.categoriesList=res.data
      }
    })

    this.getAllProductsSub=this._ProductsService.getAllProducts().subscribe({
      next:(res)=> {
        this.productsList=res.data
        console.log(this.productsList);
      },
      error:(err:HttpErrorResponse)=> {
        console.log(err.error);
      },
    })
  }

  addToCart(productId:string):void{
    this.AddProductToCartSub=this._CartService.AddProductToCart(productId).subscribe({
      next:(res)=> {
        if ('success'==res.status) {
          console.log(res);
          this._CartService.cartCount.set(res.numOfCartItems)
          this._ToastrService.success(`${res.message}. 🛺`,'Add To Cart')
        }
      },
      error:(err)=> {
        console.log(err);
        this._ToastrService.error(err.error.message,'MEME Store')
      },
    })
  }

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe()
    this.getAllCategoriesSub?.unsubscribe()
    this.AddProductToCartSub?.unsubscribe()
    // this.getLoggedUserWishlistSub?.unsubscribe()
  }

}