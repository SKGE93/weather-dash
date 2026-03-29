import { Component, input, OnChanges, ElementRef, viewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.html',
  styleUrl: './weather-chart.css'
})
export class WeatherChart implements OnChanges {
  previsions = input<any>(null)
  canvas = viewChild<ElementRef>('canvas')
  private chart: any = null

  ngOnChanges() {
    setTimeout(() => {
      this.creerGraphique()
    }, 100)
  }

  creerGraphique() {
    const data = this.previsions()
    if (!data || !this.canvas()) return

    if (this.chart) {
      this.chart.destroy()
    }

    this.chart = new Chart(this.canvas()!.nativeElement, {
      type: 'line',
      data: {
        labels: data.list.slice(0, 8).map((item: any) => item.dt_txt.slice(11, 16)),
        datasets: [{
          label: 'Température (°C)',
          data: data.list.slice(0, 8).map((item: any) => item.main.temp),
          borderColor: '#6c63ff',
          backgroundColor: 'rgba(108, 99, 255, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { ticks: { color: '#ffffff' } },
          y: { ticks: { color: '#ffffff' } }
        }
      }
    })
  }
}