import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5'

  constructor(private http: HttpClient) {}

  getMeteo(ville: string) {
    return this.http.get(`${this.baseUrl}/weather`, {
      params: {
        q: ville,
        appid: environment.apiKey,
        units: 'metric',
        lang: 'fr'
      }
    })
  }

  getPrevisions(ville: string) {
  return this.http.get(`${this.baseUrl}/forecast`, {
    params: {
      q: ville,
      appid: environment.apiKey,
      units: 'metric',
      lang: 'fr'
    }
  })
}
}