import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/country.service';

type Region = 'Africa'| 'Americas'| 'Asia'| 'Europe'| 'Oceania'

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion? : Region;
  public isLoading = false;

  constructor( private countryService: CountriesService){}

  searchByRegion( region: Region): void{
    this.isLoading = true;

    this.selectedRegion = region;

    this.countryService.searchRegion(region)
    .subscribe( countries =>{
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
