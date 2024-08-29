import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GamesRequestService {

  constructor(private http : HttpClient) {}

  getGamesList(){
    return this.http.get(`https://games-shop-api.glitch.me/api/v1/games`)
  }
  getGameDetails(id: string){
    return this.http.get(`https://games-shop-api.glitch.me/api/v1/games/${id}`)
  }
}
