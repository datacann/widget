import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemService {
  private selectedItemSubject = new BehaviorSubject<any>(null);
  selectedItem$ = this.selectedItemSubject.asObservable();

  setSelectedItem(item: any) {
    this.selectedItemSubject.next(item);
  }

  getSelectedItem(): any {
    return this.selectedItemSubject.getValue();
  }
}
