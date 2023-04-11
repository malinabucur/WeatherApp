import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from '../service/favorites.service';
import { WeatherModel } from '../models/weatherModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;
  @ViewChild('card') cardRef!: ElementRef<HTMLDivElement>;
  @ViewChild('dropdownBtn', { static: true }) dropdownBtn!: ElementRef;
  

  temperature!: number;
  condition: string = '';
  isFavorite = false;
  favorites: string[] = [];
  cityNames: string[] = [];
  filteredCities: string[] = [];
  public Math = Math; // get integer values
  public title: any;
  currentDate = new Date(); // get current date and hour automatically - no refresh needed
  showHourly = false;
  showDaily = true;
  dailyForecastData: any;
  hourlyForecastData: any;

  constructor(
    private weatherService: WeatherService,
    private http: HttpClient,
    private favoritesService: FavoritesService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.filteredCities = this.cityNames;

    // hide the dropdown when clicking outside of it
    const dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
    dropdownMenu.addEventListener('click', (event: Event) => {
      event.stopPropagation();
    });

    document.addEventListener('click', (event) => {
      if (!this.dropdownBtn.nativeElement.contains(event.target)) {
        dropdownMenu.classList.remove('show');
      }
    });

    this.weatherService.getCurrentWeather().subscribe((temp) => {
      this.temperature = temp.current.temp_c;
      this.condition = temp.current.condition.text;
    });

    this.getForecastDaily('Cluj-Napoca');

    setInterval(() => {
      this.currentDate = new Date(); // update currentDate property every second
    }, 1000);
  }

  // add city to favorites
  onFavListChanged(favorites: string[]) {
    this.favorites = favorites;
  }

  addToFav(event: MouseEvent) {
    const title = (event.target as HTMLElement)
      .closest('.card')
      ?.querySelector('.card-title')
      ?.textContent?.trim();
    if (title) {
      const index = this.favoritesService.favorites.indexOf(title);
      if (index === -1) {
        this.favoritesService.favorites.push(title);
        (event.target as HTMLElement)?.classList.add('fas');
        (event.target as HTMLElement).classList.remove('far');
        this.isFavorite = true;
      } else {
        this.favoritesService.favorites.splice(index, 1);
        (event.target as HTMLElement).classList.add('far');
        (event.target as HTMLElement).classList.remove('fas');
        this.isFavorite = false;
      }
    }
  }

  // list of available cites + searchbar
  ngAfterViewInit() {
    // get all the card titles in the carousel
    const cardTitles = document.querySelectorAll('.carousel-item .card-title');
    cardTitles.forEach((title) => {
      // extract the city name from the title
      const cityName = title.textContent?.trim();

      // add the city name to the array
      if (cityName && !this.cityNames.includes(cityName)) {
        this.cityNames.push(cityName);
      }
    });
  }

  onSearchInput(event: any) {
    const searchTerm = event.target.value.trim().toLowerCase();
    this.filteredCities = this.cityNames.filter((city) =>
      city.toLowerCase().includes(searchTerm)
    );
  }

  // go to the selected city from the list
  scrollToCity(cityName: string) {
    let carouselItem;
    let selecetCarouselItem;

    // lista cu toate carousel-item urile mele din html
    const carouselItems =
      this.carousel.nativeElement.querySelectorAll('.carousel-item');
    // find the index of the city in the carousel
    const cityIndex = this.cityNames.findIndex((city) => city === cityName);

    // gasim elementul activ
    carouselItem = this.carouselRef.nativeElement.querySelector(
      '.carousel-item.active'
    );
    carouselItem?.classList.remove('active');
    // selectez carouselul care vreau sa devina activ dupa cityIndex
    selecetCarouselItem = carouselItems[cityIndex];
    selecetCarouselItem.classList.add('active');
    // reintializez view ul -- forecast
    this.getForecastDaily(cityName);
  }

  // daily and hourly forecast
  showHourlyForecast() {
    this.showHourly = true;
    this.showDaily = false;
  }

  showDailyForecast() {
    this.showHourly = false;
    this.showDaily = true;
  }

  public getWeather(event: MouseEvent) {
    let carouselItem;
    let cardTitle;
    // let element = event.target as HTMLElement;
    // let typeOfForecast = element.id;

    setTimeout(() => {
      carouselItem = this.carouselRef.nativeElement.querySelector(
        '.carousel-item.active'
      );

      cardTitle = carouselItem?.querySelector('.card-title');

      if (cardTitle?.textContent != null) {
        this.getForecastDaily(cardTitle.textContent);
      }

      // aici am incercat sa fac o singura functie pentru carousel si pentru hourly/daily -> aveam delay prea mare
      // if(cardTitle?.textContent != null){
      //   if(typeOfForecast == "hourly"){
      //     this.showHourlyForecast();
      //     this.getForecastHourly(cardTitle.textContent);

      //   }else{
      //     this.showDailyForecast();
      //     this.getForecastDaily(cardTitle.textContent);
      //   }
      // }
    }, 650);
  }

  getForecastDaily(city: string) {
    this.showDailyForecast();
    this.weatherService.getForecast(city).subscribe((data) => {
      this.dailyForecastData = data;
      this.temperature = data.current.temp_c;
      this.condition = data.current.condition.text;
    });
  }

  getForecastDailyOnButtonClick(event: MouseEvent) {
    let carouselItem;
    let cardTitle;
    carouselItem = this.carouselRef.nativeElement.querySelector(
      '.carousel-item.active'
    );

    cardTitle = carouselItem?.querySelector('.card-title');

    if (cardTitle?.textContent != null) {
      this.getForecastDaily(cardTitle.textContent);
    }
  }

  getForecastHourly(city: string) {
    this.showHourlyForecast();
    this.weatherService.getForecast(city).subscribe((data) => {
      this.hourlyForecastData = data;
    });
  }

  getForecastHourlyOnButtonClick(event: MouseEvent) {
    let carouselItem;
    let cardTitle;
    carouselItem = this.carouselRef.nativeElement.querySelector(
      '.carousel-item.active'
    );

    cardTitle = carouselItem?.querySelector('.card-title');

    if (cardTitle?.textContent != null) {
      this.getForecastHourly(cardTitle.textContent);
    }
  }

  // get the days of the week for the daily forecast instead of dat (dd/mm/yyyy)
  getDayOfWeek(dateString: string): string {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }

  // getting the current hour for the hourly forecast
  getCurrentHour(): number {
    return new Date().getHours();
  }
}
