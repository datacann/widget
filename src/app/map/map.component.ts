import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  Inject,
  Injector,
  ComponentFactoryResolver,
  OnInit,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { PopupContentComponent } from '../popup-content/popup-content.component';
import { PopupsComponent } from '../popups/popups.component';
import { SelectedItemService } from '../services/selected-item/selected-item.service';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit, OnDestroy {
  private isBrowser: boolean;
  private activePopup: L.Popup | null = null;

  @ViewChild('popupContainer', { read: ViewContainerRef }) popupContainer!: ViewContainerRef;
  @ViewChild('popupContainer', { static: true }) popupContainerElement!: ElementRef;
  @ViewChild(PopupsComponent) popupsComponent!: PopupsComponent;

  data: any[] = [];
  markers: any[] = [];
  filteredData: any[] = [];
  map: any;
  ata: boolean = false;
  popupContent: any = {
    section: '',
    temperature: 0,
    humidity: 0
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private dataService: DataService,
    private selectedItemService: SelectedItemService,
    private searchService: SearchService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.data = this.dataService.getData();
    this.filteredData = this.data;
    this.searchService.searchQuery$.subscribe(query => {
      this.filterData(query);
    });
    this.selectedItemService.selectedItem$.subscribe(item => {
      if (item) {
        const index = this.data.indexOf(item);
        if (index !== -1) {
          const marker = this.markers[index];
          if (marker) {
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.loadMap().then(() => {
        this.addMarkers(this.data);
      });
      document.addEventListener('click', this.handleClickOutside.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.removeEventListener('click', this.handleClickOutside.bind(this));
    }
  }

  filterData(query: string) {
    this.filteredData = this.data.filter(item => item.bolum.toLowerCase().includes(query.toLowerCase()));
    this.clearMarkers();
    this.addMarkers(this.filteredData);
  }

  private async loadMap(): Promise<void> {
    if (!this.isBrowser) {
      return;
    }

    const L = await import('leaflet');
    this.map = L.map('map', {
      center: [37.0902, -95.7129],
      zoom: 4
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private clearMarkers(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }

  private addMarkers(data: any[]): void {
    const allCoordinates = [
      [37.7749, -122.4194],
      [40.7128, -74.0060],
      [34.0522, -118.2437],
      [41.8781, -87.6298],
      [29.7604, -95.3698],
      [39.7392, -104.9903],
      [47.6062, -122.3321],
      [25.7617, -80.1918]
    ];

    const coordinates = allCoordinates.slice(0, data.length);

    // @ts-ignore
    const customIcon = L.icon({
      iconUrl: 'assets/pin.svg',
      iconSize: [50, 85],
      iconAnchor: [20, 40],
      popupAnchor: [-140, 175]
    });

    coordinates.forEach((coords, index) => {
      // @ts-ignore
      const marker = L.marker(coords, { icon: customIcon })
        .addTo(this.map)
        .on('click', () => {
          this.onMarkerClick(index, marker);
        });
      this.markers.push(marker);
    });
  }

  onMarkerClick(index: number, marker: any) {
    const dataItem = this.filteredData[index];
    const popupDiv = this.showPopup(dataItem);
    marker.bindPopup(popupDiv).openPopup();
    this.activePopup = marker.getPopup();
    marker.unbindPopup();
    const popupCloseHandler = () => {
      marker.off('popupclose', popupCloseHandler);
      this.activePopup = null;
    };
    marker.on('popupclose', popupCloseHandler);
    this.selectedItemService.setSelectedItem(dataItem);
  }

  showPopup(dataItem: any): HTMLElement | null {
    this.popupContainer.clear();
    const factory = this.resolver.resolveComponentFactory(PopupContentComponent);
    const componentRef = this.popupContainer.createComponent(factory);
    componentRef.instance.section = dataItem.section;
    componentRef.instance.temperature = dataItem.sicaklik;
    componentRef.instance.humidity = dataItem.nem;
    componentRef.instance.section = dataItem.bolum;
    componentRef.changeDetectorRef.detectChanges();
    componentRef.location.nativeElement.style.display = '';
    return componentRef.location.nativeElement;
  }

  handleClickOutside(event: MouseEvent) {
    const mapElement = document.getElementById('map');
    if (mapElement && !mapElement.contains(event.target as Node)) {
      this.popupContainer.clear();
      if (this.activePopup) {
        this.map.closePopup(this.activePopup);
        this.activePopup = null;
        this.deselectItem();
      }
      this.popupContainerElement.nativeElement.style.display = 'none';
    }
  }

  private deselectItem() {
    this.selectedItemService.setSelectedItem(null);
  }


}
