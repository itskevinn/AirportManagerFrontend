import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Flight} from "../../../../data/models/airport/flight.model";

@Component({
  selector: 'app-flight-detail-dialog',
  templateUrl: './flight-detail-dialog.component.html',
  styleUrls: ['./flight-detail-dialog.component.scss']
})
export class FlightDetailDialogComponent implements OnInit {
  flight: Flight;

  constructor(public _: MatDialogRef<FlightDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.flight = data.flight ?? null;
  }

  ngOnInit(): void {
  }
}
