import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ValorationsService } from 'src/app/core';
import { Bar } from 'src/app/core/models/bar.models';

@Component({
  selector: 'app-create-valoration',
  templateUrl: './create-valoration.component.html',
  styleUrls: ['./create-valoration.component.css']
})

export class CreateValorationComponent implements OnInit {
  @Input("bar") bar!:Bar;
  @ViewChild('createValoDescr') valoDescr!: ElementRef;
  @ViewChild('createValoRange') valoRange!: ElementRef;

  constructor(
    private valService: ValorationsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log();
  }
  createValoration() {
    if (this.valoRange.nativeElement.value == "" || this.valoDescr.nativeElement.value == "") {
      this.toastr.error("Rellena bien el forumluario")
    } else {
    this.valService.createBarValoration(this.bar.id,this.valoRange.nativeElement.value,this.valoDescr.nativeElement.value).subscribe(params => {
      this.toastr.info(params.msg);
    })
  }
  }

}
