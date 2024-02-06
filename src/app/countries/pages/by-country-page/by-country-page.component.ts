import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countryService: CountriesService) {}

  searchbyCountry( country: string ): void{
    this.isLoading = true;

    this.countryService.searchCountry(country)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
