import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { Food } from 'src/app/shared/models/food';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  buttonName='Checkout'
  cart!:Cart;
  constructor(private _cartService:CartService,private router:Router){

  }
  ngOnInit(): void {
    this._cartService.getCartObservable().subscribe((cartData)=>{
      this.cart=cartData;
      console.log(this.cart)
    })
    
  }
  onAddClick(item:Food){
    this._cartService.addToCart(item)
  }
  onSubClick(item:Food){
    this._cartService.removeItem(item)
  }
  onNextClick(){
    this.router.navigate(['/checkout'])
  }

}
