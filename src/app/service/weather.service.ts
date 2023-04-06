import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherModel } from '../models/weatherModel';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private apiKey = 'a7b62f9a2b04497690874829230404';
  private currentURL =
    'https://api.weatherapi.com/v1/current.json?key=a7b62f9a2b04497690874829230404&q=Cluj-Napoca&aqi=yes';
  private baseDailyForecastURL = 'https://api.weatherapi.com/v1';

  getCurrentWeather(): Observable<any> {
    return this.http.get<WeatherModel>(this.currentURL);
  }

  getDailyForecast(city: string): Observable<any> {
    const dailyForecastURL = `${this.baseDailyForecastURL}/forecast.json?key=${this.apiKey}&q=${city}&days=7`;
    return this.http.get<WeatherModel>(dailyForecastURL);
  }

  getHourlyForecast(city: string): Observable<any> {
    const hourlyForecastURL = `${this.baseDailyForecastURL}/forecast.json?key=${this.apiKey}&q=${city}&days=1&hour=24`;
    return this.http.get<WeatherModel>(hourlyForecastURL);
  }
}
