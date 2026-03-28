import { Component, OnInit, signal } from '@angular/core';
import { WeatherService } from '../../services/weather';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  meteo = signal<any>(null)
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
  }

  rechercherVille(event: Event) {
  const input = event.target as HTMLInputElement
  this.ville.set(input.value)
  this.chargerMeteo()
}
}