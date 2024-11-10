import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';
import { Tag } from '../shared/models/tag';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private _http:HttpClient) { }

  getAll():Observable<Food[]>{
    return this._http.get<Food[]>(FOODS_URL)

  }
  getFoodBySearch(search:string):Observable<Food[]>{
    return this._http.get<Food[]>(FOODS_BY_SEARCH_URL+search)
  }
  getAllTags():Observable<Tag[]>{
    return this._http.get<Tag[]>(FOODS_TAGS_URL)
  }
  getFoodByTagName(tag:string):Observable<Food[]>{
    console.log("called")
    return tag==='All'?this.getAll():this._http.get<Food[]>(FOODS_BY_TAG_URL+tag)

    // return tag==='All'?this.getAll():this._http.get<Food[]>(FOODS_BY_TAG_URL+tag)
  }
}
