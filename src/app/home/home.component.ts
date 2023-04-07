import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { HttpClient } from '@angular/common/http';
import { WeatherModel } from '../models/weatherModel';
// import { FavoriteComponent } from '../favorite/favorite.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;
  @ViewChild('card') cardRef!: ElementRef<HTMLDivElement>;

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

      if(cardTitle?.textContent != null){
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
      this.temperature = data.current.temp_c
    });
  }

  getForecastDailyOnButtonClick(event: MouseEvent){
    let carouselItem;
    let cardTitle;
    carouselItem = this.carouselRef.nativeElement.querySelector(
      '.carousel-item.active'
    );

    cardTitle = carouselItem?.querySelector('.card-title');

    if(cardTitle?.textContent != null){
      this.getForecastDaily(cardTitle.textContent);
    }
  }

  getForecastHourly(city: string) {
    this.showHourlyForecast();
    this.weatherService.getDailyForecast(city).subscribe((data) => {
      this.hourlyForecastData = data;
    });
  }

  getForecastHourlyOnButtonClick(event: MouseEvent){
    let carouselItem;
    let cardTitle;
    carouselItem = this.carouselRef.nativeElement.querySelector(
      '.carousel-item.active'
    );

    cardTitle = carouselItem?.querySelector('.card-title');

    if(cardTitle?.textContent != null){
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
