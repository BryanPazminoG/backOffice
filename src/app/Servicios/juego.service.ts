import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private url:string = "https://www.freetogame.com/api/games"

  constructor(private http: HttpClient) { }

  getJuego(name: string)
  {
    return this.http.get(this.url+"?category="+name)
  }

  getApi()
  {
    return this.http.get<any>(this.url);
  }


}
