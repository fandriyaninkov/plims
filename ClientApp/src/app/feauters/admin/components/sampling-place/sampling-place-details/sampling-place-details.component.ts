import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SamplingPlaceViewModel } from 'src/app/core/nswag/plims-generated';
import { CreatePlace, UpdatePlace } from '../../../actions/admin.actions';

@Component({
  selector: 'app-sampling-place-details',
  templateUrl: './sampling-place-details.component.html',
  styleUrls: ['./sampling-place-details.component.scss']
})
export class SamplingPlaceDetailsComponent implements OnInit {

  placeForm: FormGroup;

  submitted = false;

  get placeInfo() {
    if (!this._config.data) {
      return {} as SamplingPlaceViewModel;
    }
    return this._config.data as SamplingPlaceViewModel;
  }

  get f() {
    return this.placeForm.controls;
  }

  get validated() {
    return this.placeForm.valid;
  }

  constructor(
    private _config: DynamicDialogConfig,
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _dynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.fillFormGroup();
  }

  save() {
    this.submitted = true;
    if (!this.validated) {
      return;
    }
    const place = {
      id: this.placeInfo.id,
      name: this.placeForm.get('name').value
    } as SamplingPlaceViewModel;

    if (place.id) {
      this._store.dispatch(new UpdatePlace(place));
    } else {
      this._store.dispatch(new CreatePlace(place));
    }
    this.close();
  }

  close() {
    this._dynamicDialogRef.close();
  }

  cancel() {
    this.close();
  }

  private fillFormGroup() {
    this.placeForm = this._formBuilder.group({
      name: [this.placeInfo.name, Validators.required]
    });
  }

}
