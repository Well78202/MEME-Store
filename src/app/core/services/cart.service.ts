import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient)
  cartCount:WritableSignal<number> = signal(0)
  myHeaders:any = {token: localStorage.getItem('userToken')}

  AddProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart`,
      {
        "productId": productId
      }
    )
  }
  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`,
    )
  }

  removeSpecificCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${productId}`,
    )
  }

  updateCartProductQuantity(productId: string , newCount:number): Observable<any> {
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${productId}`,
      {
        "count": newCount
      }
    )
  }

  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart`,
    )
  }
}
