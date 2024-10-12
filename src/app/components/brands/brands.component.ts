import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBrands } from '../../core/interfaces/ibrands';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
})
export class BrandsComponent implements  OnInit,OnDestroy{

  private readonly _BrandsService=inject(BrandsService)

  getAllBrandsSub!:Subscription
  getSpecifiBrandSub!:Subscription

  brandsList:WritableSignal<IBrands[]>=signal([])

  ngOnInit(): void {
    // get all Categories
    this.getAllBrandsSub=this._BrandsService.getAllPrands().subscribe({
      next:(res)=> {
        console.log(res);
        this.brandsList.set(res.data)
      },
    })
  }

  ngOnDestroy(): void {
    this.getAllBrandsSub?.unsubscribe()
    this.getAllBrandsSub?.unsubscribe()
  }

}
