import { Component } from '@angular/core';
import {SearchService} from '../services/search/search.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private searchService: SearchService) { }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.searchService.setSearchQuery(query);
  }
}
