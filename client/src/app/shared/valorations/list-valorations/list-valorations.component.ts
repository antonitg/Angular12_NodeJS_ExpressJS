import { Component, Input, OnInit } from '@angular/core';
import { Bar } from 'src/app/core/models/bar.models';
import { Valoration } from 'src/app/core/models/valorations.model';
import { ValorationsService } from 'src/app/core/services';

@Component({
  selector: 'app-list-valorations',
  templateUrl: './list-valorations.component.html'
})
export class ListValorationsComponent implements OnInit {
  @Input("bar") bar!:Bar;
  valorations!:[Valoration];

  constructor(
    private valService: ValorationsService,
  ) { }
  ngOnInit(): void {
  // console.log();

    this.valService.getBarValorations(this.bar.id).subscribe(valorations => {
      this.valorations = valorations
    })
  }

}


