import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private _router:Router,private _activatedRoute:ActivatedRoute){

  }
 searchTerm!:string;

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params)=>{
      if(params['searchTerm']){
        this.searchTerm=params['searchTerm']
      }
    })
    
  }

  search(searchTerm:string){
    if(searchTerm)
      this._router.navigateByUrl('/search/'+searchTerm)
  }

}
