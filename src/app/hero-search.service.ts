import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
import { Hero } from './hero';
 
@Injectable()
export class HeroSearchService {
 
  constructor(private http: HttpClient) {}
 
  search(term: string): Observable<Hero[]> {
    return this.http
               .get(`api/heroes/?name=${term}`)
               .map(response => response as Hero[]);
  }
}