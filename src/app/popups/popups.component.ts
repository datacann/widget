import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data/data.service';
import {CommonModule} from '@angular/common';
import {SelectedItemService} from '../services/selected-item/selected-item.service';
import {SearchService} from '../services/search/search.service';

@Component({
  selector: 'app-popups',
  imports: [CommonModule],
  templateUrl: './popups.component.html',
  styleUrl: './popups.component.css'
})
export class PopupsComponent implements OnInit{
  data: any[] = [];
  selectedItem: any;
  filteredData: any[] = [];

  constructor( private dataService: DataService,
               private selectedItemService: SelectedItemService,
               private searchService: SearchService
  ) {
  }

  ngOnInit() {
    this.data = this.dataService.getData();
    this.filteredData = this.data;
    this.selectedItemService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    });
    this.searchService.searchQuery$.subscribe(query => {
      this.filterData(query);
    });
  }

  filterData(query: string) {
    this.filteredData = this.data.filter(item => item.bolum.toLowerCase().includes(query.toLowerCase()));
  }

  isSelected(item: any): boolean {
    return this.selectedItem === item;

  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedItemService.setSelectedItem(item);
  }


  trackByItem(index: number, item: any): any {
    return index;
  }

  getBatteryIcon(pil_degeri: number): string {
    if (pil_degeri >= 70) {
      return 'assets/pil/full-battery.svg';
    } else if (pil_degeri >= 25) {
      return 'assets/pil/average-battery.svg';
    } else {
      return 'assets/pil/low-battery.svg';
    }
  }

}
