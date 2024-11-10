import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/cartItem';
import { CHECKOUT_URL } from '../shared/constants/urls';

const CART_KEY='Cart'
@Injectable({
  providedIn: 'root'
})
export class CartService {
 private cart:Cart=this.getDataFromLocalStorage();
 private cartSubject:BehaviorSubject<Cart>=new BehaviorSubject(this.cart)
  constructor(private _http:HttpClient) { }

  addToCart(food:Food):void{
    let cartItem=this.cart.items.find((item)=>item.food.id===food.id);
    if(cartItem){
      cartItem.quantity++;
      cartItem.price=cartItem.food.price*cartItem.quantity;
      this.setCartToLocalStorage();
      return
    }
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();


  }

  removeItem(items:Food):void{
    let index=this.cart.items.findIndex((item)=>items.id===item.food.id);
    let cartItem=this.cart.items[index];
    cartItem.quantity--;
    this.cart.items[index].price=cartItem.food.price*cartItem.quantity;
    if(this.cart.items[index].quantity===0){
      this.cart.items.splice(index,1);

    }
    this.setCartToLocalStorage()
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable()
  }
  setCartToLocalStorage(){
    this.cart.totalPrice=this.cart.items.reduce(
      (prevSum,currentItem)=>prevSum+currentItem.price,0
    )

    this.cart.totalCount=this.cart.items.reduce(
      (prevSum,currentItem)=>prevSum+currentItem.quantity,0
    )
    let cartJson=JSON.stringify(this.cart);
    localStorage.setItem(CART_KEY,cartJson);
    this.cartSubject.next(this.cart)
  }
  getDataFromLocalStorage(){
    const cartJson=localStorage.getItem(CART_KEY);
    return cartJson?JSON.parse(cartJson):new Cart()
  }
  checkout(request:any){
   return this._http.post(CHECKOUT_URL,request)
  }
}
