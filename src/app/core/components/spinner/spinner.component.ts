import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../service/spinner.service';
import {START} from "../../constants/http-spinner-actions";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner = false;

  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === START);
      this.cdRef.detectChanges();
    });
  }
}
