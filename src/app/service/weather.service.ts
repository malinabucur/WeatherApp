import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherModel} from '../models/weatherModel';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private apiKey = 'a7b62f9a2b04497690874829230404';
  private apiUrl = 'https://api.weatherapi.com/v1/current.json?key=a7b62f9a2b04497690874829230404&q=Cluj-Napoca&aqi=yes';

  getForecast(): Observable<any> {
    return this.http.get<WeatherModel>(this.apiUrl);
  }
}
