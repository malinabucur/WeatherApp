import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentDate = new Date();
  temperature!: number;
  
  constructor(private weatherService: WeatherService, private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log(this.weatherService.getForecast());
    
    this.weatherService.getForecast().subscribe((temp) => {
      console.log(temp);
      console.log(temp.current.temp_c);
      console.log(temp.location.region);
      console.log(temp.location.country);
      this.temperature = temp.current.temp_c;
    });
  }
}
