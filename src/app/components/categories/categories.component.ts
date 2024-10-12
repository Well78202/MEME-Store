import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements  OnInit,OnDestroy{

  private readonly _CategoriesService=inject(CategoriesService)

  getAllCategoriesSub!:Subscription
  getSpecifiCategorySub!:Subscription

  categoriesList:WritableSignal<ICategory[]>=signal([])

  ngOnInit(): void {
    // get all Categories
    this.getAllCategoriesSub=this._CategoriesService.getAllCategories().subscribe({
      next:(res)=> {
        console.log(res);

        this.categoriesList.set(res.data)
      },
    })
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSub?.unsubscribe()
    this.getSpecifiCategorySub?.unsubscribe()
  }

}
