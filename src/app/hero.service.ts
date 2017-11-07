import { Injectable } from '@angular/core';
// import { Headers, Http } from '@angular/http';

import { HttpClient, HttpHeaders }    from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
//import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService { 

  private heroesUrl = 'api/heroes';
  private headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', 'my-auth-token');
  
 // private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {};

  //constructor(private http: Http) {};

  //Observable 
  getHeroesObs() {
    return this.http.get(this.heroesUrl)
    .subscribe(data => { data as Hero[] },
               err => { console.log("Error occured.") }          
    );
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl,  {headers: this.headers})
    .toPromise()
    .then(response => response as Hero[])
    .catch(this.handleError);

 //   return Promise.resolve(HEROES);
  }
  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as Hero)
      .catch(this.handleError);

  //  return this.getHeroes()
  //             .then(heroes => heroes.find(hero => hero.id === id));
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, ({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, (hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
