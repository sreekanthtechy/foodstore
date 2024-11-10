import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/tag';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags!:Tag[]
  
  constructor(private _foodService:FoodService,private router:Router){

  }

  ngOnInit(): void {
    this.getTags()
  }
  getTags(){

    this._foodService.getAllTags().subscribe((tags:Tag[])=>{
      this.tags=tags;
      console.log(this.tags)
    })

  }

  activeTag(tag:Tag){
    return this.router.url.includes(tag.name)
  }

}
