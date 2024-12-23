import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-popup-update',
  imports: [],
  templateUrl: './popup-update.component.html',
  styleUrl: './popup-update.component.css'
})
export class PopupUpdateComponent {
  @Input() temperature: number = 0;

}
