import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {MapComponent} from './map/map.component';
import {PopupsComponent} from './popups/popups.component';
import {SearchComponent} from './search/search.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MapComponent, PopupsComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'widget';
}
