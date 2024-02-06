import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore ={
    byCapital: { term: '', countries: []},
    byCountries: { term: '', countries: []},
    byRegion: { region: '', countries: []},
  };

  constructor( private http: HttpClient ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore' , JSON.stringify( this.cacheStore ));

  }

  private loadFromLocalStorage(){
    if( !localStorage.getItem('cacheStore') ) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([])),
        //delay(2000),
      )
  }

  searchCountryByAlphaCode (code: string): Observable<Country | null>{
    const uri = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>( uri )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( error => of(null) )
      );
  }

  searchCapital( capital: string ): Observable<Country[]>{
    const uri = `${this.apiUrl}/capital/${capital}`;

    return this.getCountriesRequest(uri)
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term: capital, countries} ),
        tap( () => this.saveToLocalStorage() ),
      );
  }

  searchCountry( country: string ): Observable<Country[]>{
    const uri = `${this.apiUrl}/name/${country}`;

    return this.getCountriesRequest(uri)
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term: country, countries} ),
        tap( () => this.saveToLocalStorage() ),
      );
  }

  searchRegion( region: Region ): Observable<Country[]>{
    const uri = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(uri)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries }),
        tap( () => this.saveToLocalStorage() ),
      );
  };
}
