import { Component } from '@angular/core';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  counter = 0;
  // private counterService = inject(CounterService)
  constructor(private counterService: CounterService) { }

  ngOnInit() {
    this.counterService.getCounter().subscribe((res) => (this.counter = res));
  }

  decreaseCounter(){
    this.counterService.setCounter(this.counter - 1)
  }

  increaseCounter(){
    this.counterService.setCounter(this.counter + 1)
  }
}
