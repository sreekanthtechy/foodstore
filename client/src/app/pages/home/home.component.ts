import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { CartService } from 'src/app/services/cart.service';
import { Food } from 'src/app/shared/models/food';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foods!:Food[];
  foodObservable!:Observable<Food[]>
  constructor(private _foodService:FoodService,private _activatedRoute:ActivatedRoute,
    private router:Router,private _cartService:CartService){

  }
  ngOnInit(): void {
  this._activatedRoute.params.subscribe((params)=>{
    if(params['searchTerm']){
      this.foodObservable=this._foodService.getFoodBySearch(params['searchTerm'])
    }else if(params['tag']){
      this.foodObservable=this._foodService.getFoodByTagName(params['tag'])

    }else{
      this.foodObservable=this._foodService.getAll()
    }

    this.foodObservable.subscribe((food:Food[])=>{
      this.foods=food;
    })
  })

    
  }

  onAddClick(food:Food){
    this._cartService.addToCart(food)
  }

}
