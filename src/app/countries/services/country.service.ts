import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor( private http: HttpClient ) { }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([])),
        delay(2000),
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

    return this.getCountriesRequest(uri);
  }

  searchCountry( country: string ): Observable<Country[]>{
    const uri = `${this.apiUrl}/name/${country}`;

    return this.getCountriesRequest(uri);
  }

  searchRegion( region: string ): Observable<Country[]>{
    const uri = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(uri);
  };
}
