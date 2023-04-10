import { Component, EventEmitter, Input } from '@angular/core';
import { FavoritesService } from './service/favorites.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';

  favorites: string[] = [];
  
  constructor(private favoritesService: FavoritesService){
    this.favorites = favoritesService.favorites;
  }

  onFavListChanged(favorites: string[]) {
    this.favorites = favorites;
  }
}
