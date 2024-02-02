import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  @Input()
  public placeholder: string = '';

  searchByCapital( term: string ){
    console.log('Desde by capital page');
    console.log(term);
  }
}
