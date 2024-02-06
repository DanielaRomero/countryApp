import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValueCountries: string = '';
  public isLoading: boolean = false;

  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.initialValueCountries = this.countryService.cacheStore.byCountries.term;
  }

  searchbyCountry( country: string ): void{
    this.isLoading = true;

    this.countryService.searchCountry(country)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
