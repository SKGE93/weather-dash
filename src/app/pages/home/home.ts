import { Component, OnInit, signal } from '@angular/core';
import { WeatherService } from '../../services/weather';
import { DecimalPipe } from '@angular/common';
import { WeatherChart } from '../../components/weather-chart/weather-chart';
@Component({
  selector: 'app-home',
  imports: [DecimalPipe, WeatherChart],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  meteo = signal<any>(null)
  previsions = signal<any>(null)
  loading = signal(true)
  ville = signal('Paris')

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.chargerMeteo()
  }

  chargerMeteo() {
    this.loading.set(true)
    this.weatherService.getMeteo(this.ville())
      .subscribe({
        next: (data) => {
          this.meteo.set(data)
          this.loading.set(false)
        },
        error: (err) => {
          console.error(err)
          this.loading.set(false)
        }
      })

    this.weatherService.getPrevisions(this.ville())
      .subscribe({
        next: (data) => {
          this.previsions.set(data)
        },
        error: (err) => console.error(err)
      })
  }

  rechercherVille(event: Event) {
    const input = event.target as HTMLInputElement
    this.ville.set(input.value)
    this.chargerMeteo()
  }
}