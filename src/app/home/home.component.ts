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

  public getSelectedTitle(event: MouseEvent) {
    setTimeout(() => {
      const carouselItem = this.carouselRef.nativeElement.querySelector('.carousel-item.active');
      const cardTitle = carouselItem?.querySelector('.card-title');
      console.log(cardTitle?.textContent);
    }, 650);

    // console.log(cardTitle?.textContent);
    
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
    // this.getForecastHourly('Cluj-Napoca');

    setInterval(() => {
      this.currentDate = new Date(); // update currentDate property every second
    }, 1000);
  }

  // daily and hourly forecast
  dailyForecastData: any;
  hourlyForecastData: any;
  errorMessage: string = '';

  getForecastDaily(city: string) {
    this.showDailyForecast();
    this.weatherService.getDailyForecast(city).subscribe(
      (data) => {
        console.log(data);
        this.dailyForecastData = data;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  getForecastHourly(city: string) {
    this.showHourlyForecast();
    this.weatherService.getDailyForecast(city).subscribe(
      (data) => {
        this.hourlyForecastData = data;
        console.log(data);
        console.log(this.showHourly);
        console.log(data.forecast.forecastday[0].hour[0].condition.text);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
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

}
