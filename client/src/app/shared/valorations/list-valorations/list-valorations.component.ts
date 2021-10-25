import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  updatingValoration!:Valoration;
  @ViewChild('updateValoDescr') valoDescrUpdate!: ElementRef;
  @ViewChild('updateValoRange') valoRangeUpdate!: ElementRef;
  constructor(
    private valService: ValorationsService,
    private toastr: ToastrService,
  ) { }
  ngOnInit(): void {
  // console.log();

    this.valService.getBarValorations(this.bar.id).subscribe(valorations => {
      console.log(valorations);

      this.valorations = valorations
    })
  }

  modalUpdateValoration(valoration:Valoration) {
    this.updatingValoration = valoration;
    this.valoDescrUpdate.nativeElement.innerHTML = valoration.descr;
    this.valoRangeUpdate.nativeElement.value = valoration.rate
  }
  updateValoration() {
    this.updatingValoration.rate = this.valoRangeUpdate.nativeElement.value
    this.updatingValoration.descr = this.valoDescrUpdate.nativeElement.value
    this.valService.updateValoration(this.updatingValoration).subscribe(ret => {
      this.toastr.success("Valoración actualizada")
    })
  }
  delValoration(id:string){
    this.valService.deleteBarValoration(id).subscribe(data => {
      this.toastr.success(data.msg)
    });

  }
 }


