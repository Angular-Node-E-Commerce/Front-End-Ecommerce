import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnInit {
  counter = 0;

  constructor(private counterService: CounterService) {}

  ngOnInit() {
    this.counterService.getCounter().subscribe((res) => (this.counter = res));
  }

  decreaseCounter() {
    this.counterService.setCounter(this.counter - 1);
  }

  increaseCounter() {
    this.counterService.setCounter(this.counter + 1);
  }
}
