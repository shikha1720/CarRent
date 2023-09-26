import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  allAgreements: any = [];
  updateDurationForm!: FormGroup;
  agrId!: number;

  constructor(
    private router: Router,
    private api: ApiService,
    private toaster: NgToastService,
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {

    //Form for agreement update
    this.updateDurationForm = this.fb.group({
      updatedDuration: ['', Validators.required],
    });

    // All agreements
    this.api.getAllAgreements().subscribe((val) => {
      this.allAgreements = val;
    });
  }

  onClickAddCar() {
    this.router.navigate(['addCars']);
  }

  // Inspection done
  carInspected(carId: any, id: any) {
    this.api.carInspected(carId, id).subscribe();
    this.toaster.success({
      detail: 'SUCCESS',
      summary: 'Car inspected successfully.',
      duration: 1500,
    });
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  }

  //function to delete agreement
  deleteAgreement(id: any) {
    if (window.confirm('Do you want to delete this areement') == true) {
      this.api.deleteAgreement(id).subscribe();
      this.toaster.error({
        detail: 'Deleted',
        summary: 'Agreement deleted successfully.',
        duration: 1500,
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      setTimeout(function () {
        window.location.reload();
      }, 500);
    }
  }

  // function to update agreement
  saveChanges() {
    if (this.updateDurationForm.valid) {
      // send the object to db
      this.api
        .updateDuration(
          this.agrId,
          this.updateDurationForm.value.updatedDuration
        )
        .subscribe();
      this.toaster.success({
        detail: 'SUCCESS',
        summary: 'Duration updated successfully.',
        duration: 1500,
      });
      setTimeout(function () {
        window.location.reload();
      }, 2500);
    } else {
      this.toaster.error({
        detail: 'ERROR',
        summary: 'Enter Duration First.',
        duration: 3000,
      });
    }
  }
}
