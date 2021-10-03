import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SamplingPlaceViewModel, SamplingPointFullViewModel } from 'src/app/core/nswag/plims-generated';
import { CreatePoint, UpdatePoint } from '../../../actions/admin.actions';
import { SamplingPointDialogData } from './sampling-point-dialog-data';

@Component({
  selector: 'app-sampling-point-details',
  templateUrl: './sampling-point-details.component.html',
  styleUrls: ['./sampling-point-details.component.scss']
})
export class SamplingPointDetailsComponent implements OnInit {

  private _dialogData: SamplingPointDialogData;

  pointForm: FormGroup;

  submitted = false;

  get places() {
    return this._dialogData.places;
  }

  get point() {
    if (!this._dialogData.point) {
      return {} as SamplingPointFullViewModel;
    }
    return this._dialogData.point;
  }

  get validated() {
    return this.pointForm.valid;
  }

  get f() {
    return this.pointForm.controls;
  }

  constructor(
    private _config: DynamicDialogConfig,
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _dynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this._dialogData = this._config.data as SamplingPointDialogData;
    this.pointForm = this._formBuilder.group({
      selectedPlace: [this.getPlace(this.point.placeId), Validators.required],
      name: [this.point.name, Validators.required]
    });
  }

  save() {
    this.submitted = true;
    if (!this.validated) {
      return;
    }
    const point = {
      id: this.point.id,
      name: this.pointForm.get('name').value,
      placeId: (this.pointForm.get('selectedPlace').value as SamplingPlaceViewModel).id
    } as SamplingPointFullViewModel;

    if (point.id) {
      this._store.dispatch(new UpdatePoint(point));
    } else {
      this._store.dispatch(new CreatePoint(point));
    }

    this.close();
  }

  cancel() {
    this.close();
  }

  close() {
    this._dynamicDialogRef.close();
  }

  private getPlace(sourcePlaceId: number) {
    if (!sourcePlaceId) {
      return;
    }
    let place: SamplingPlaceViewModel;
    this.places.forEach(item => {
      if (item.id === sourcePlaceId) {
        place = item;
      }
    });
    return place;
  }

}
