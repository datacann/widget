import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {PopupUpdateComponent} from '../popup-update/popup-update.component';

@Component({
  selector: 'app-popup-content',
  imports: [
    NgClass,
    PopupUpdateComponent,
    NgIf
  ],
  templateUrl: './popup-content.component.html',
  styleUrl: './popup-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PopupContentComponent implements OnChanges{
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  @Input() markerName!: string;
  @Input() section!: string ;
  @Input() temperature!: number ;
  @Input() humidity!: number ;
  headerText: string = 'Nem ve Sıcaklık Sensörü';
  activeButton: string = '';
  headerTitle: string = 'Nem ve Sıcaklık Sensörü';
  headerAction: string = '';
  isClicked: boolean  = false;

  onButtonClick(buttonType: string): void {
    if (buttonType === 'temperature') {
      this.headerTitle = 'Sıcaklık';
      this.headerAction = ' Ayarla';
    } else if (buttonType === 'humidity') {
      this.headerTitle = 'Nem';
      this.headerAction = ' Ayarla';
    }
    this.activeButton = buttonType;
    this.isClicked = !this.isClicked
  }

  ngOnChanges() {
    this.changeDetectorRef.detectChanges();
  }
}
