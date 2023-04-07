import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { HttpClient } from '@angular/common/http';
import { WeatherModel } from '../models/weatherModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('dropdownBtn') dropdownBtn: any;
  cityNames: string[] = [];
  filteredCities: string[] = [];

  ngAfterViewInit() {
    // get all the card titles in the carousel
    const cardTitles = document.querySelectorAll('.carousel-item .card-title');
    cardTitles.forEach((title) => {
      // extract the city name from the title
      const cityName = title.textContent?.trim();

      // add the city name to the array if it's not already there
      if (cityName && !this.cityNames.includes(cityName)) {
        this.cityNames.push(cityName);
      }
    });

    // make the dropdown toggle when the button is clicked
    this.dropdownBtn.nativeElement.addEventListener('click', () => {
      this.dropdownBtn.nativeElement.classList.toggle('show');
    });

    // hide the dropdown when the user clicks outside of it
    window.addEventListener('click', (event) => {
      if (!this.dropdownBtn.nativeElement.contains(event.target)) {
        this.dropdownBtn.nativeElement.classList.remove('show');
      }
    });
  }
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;
  @ViewChild('card') cardRef!: ElementRef<HTMLDivElement>;

  onSearchInput(event: any) {
    const searchTerm = event.target.value.trim().toLowerCase();
    this.filteredCities = this.cityNames.filter((city) =>
      city.toLowerCase().includes(searchTerm)
    );
  }
  scrollToCity(cityName: string) {
    let carouselItem;
    let selecetCarouselItem;

    // lista cu toate carousel-item urile mele din html    
    const carouselItems = this.carousel.nativeElement.querySelectorAll('.carousel-item');
    // find the index of the city in the carousel
    const cityIndex = this.cityNames.findIndex(city => city === cityName);
    
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











  




  public Math = Math;
  public title: any;
  currentDate = new Date();

  temperature!: number;

  showHourly = false;
  showDaily = true;

  showHourlyForecast() {
    this.showHourly = true;
    this.showDaily = false;
  }

  showDailyForecast() {
    this.showHourly = false;
    this.showDaily = true;
  }

  constructor(
    private weatherService: WeatherService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.filteredCities = this.cityNames;
    this.weatherService.getCurrentWeather().subscribe((temp) => {
      console.log(temp);
      this.temperature = temp.current.temp_c;
    });

    this.getForecastDaily('Cluj-Napoca');

    setInterval(() => {
      this.currentDate = new Date(); // update currentDate property every second
    }, 1000);
  }

  // daily and hourly forecast
  dailyForecastData: any;
  hourlyForecastData: any;

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
    this.weatherService.getDailyForecast(city).subscribe((data) => {
      this.dailyForecastData = data;
      this.temperature = data.current.temp_c;
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
    this.weatherService.getDailyForecast(city).subscribe((data) => {
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
