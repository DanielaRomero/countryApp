import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';

import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion? : Region;
  public isLoading = false;

  constructor( private countryService: CountriesService){}
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }

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
