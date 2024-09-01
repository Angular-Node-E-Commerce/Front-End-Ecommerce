// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CounterService {

//   private counter = new BehaviorSubject(0)
//   constructor() {}

//   getCounter(){
//      return this.counter.asObservable();
//   }

//   setCounter(newCounter: number){
//     this.counter.next(newCounter)
//   }


// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counterSubject = new BehaviorSubject<number>(0);

  getCounter() {
    return this.counterSubject.asObservable();
  }

  setCounter(value: number) {
    this.counterSubject.next(value);
  }
}
