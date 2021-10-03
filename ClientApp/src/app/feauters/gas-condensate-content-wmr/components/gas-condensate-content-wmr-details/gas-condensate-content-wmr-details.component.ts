import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { GasCondensateContentWmrViewModel, SamplingPlaceViewModel, SamplingPointViewModel, UserShortInfoViewModel } from 'src/app/core/nswag/plims-generated';
import { CreateGasCondensateContentWmr, UpdateGasCondensateContentWmr } from '../../actions/gas-condensate-content-wmr.actions';
import { GasCondensateContentWmrDialogData } from './gas-condensate-content-wmr-dialog-data';

@Component({
  selector: 'app-gas-condensate-content-wmr-details',
  templateUrl: './gas-condensate-content-wmr-details.component.html',
  styleUrls: ['./gas-condensate-content-wmr-details.component.scss']
})
export class GasCondensateContentWmrDetailsComponent implements OnInit, OnDestroy {

  _dialogData: GasCondensateContentWmrDialogData;

  gasCondensateForm: FormGroup;

  submitted = false;

  get samplingPoints() {
    return this._dialogData.points;
  }

  get laboratoryAssistants() {
    return this._dialogData.assistants;
  }

  get place() {
    return this._dialogData.place.name;
  }

  set place(value: string) {

  }

  get analysis() {
    if (!this._dialogData.analysis) {
      return {} as GasCondensateContentWmrViewModel;
    }
    return this._dialogData.analysis;
  }

  get validated() {
    return this.gasCondensateForm.valid;
  }

  get f() {
    return this.gasCondensateForm.controls;
  }

  ruLocale = Constants.ru;

  _subscriptions = new Array<Subscription>();

  constructor(
    private _config: DynamicDialogConfig,
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _dynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this._dialogData = this._config.data as GasCondensateContentWmrDialogData;
    this.gasCondensateForm = this._formBuilder.group({
      regCode: [this.analysis.regCode, Validators.required],
      selectedPoint: [this.getPoint(this.analysis.point), Validators.required],
      laboratoryAssistant: [this.getAssistant(this.analysis.user), Validators.required],
      samplingDate: [this.analysis.samplingDate ? new Date(this.analysis.samplingDate) : null],
      analysisDate: [this.analysis.analysisDate ? new Date(this.analysis.analysisDate) : null],
      deliveringDate: [this.analysis.deliveringDate ? new Date(this.analysis.deliveringDate) : null],
      contentWMR: [this.analysis.wmrContent, [Validators.required, Validators.min(0), Validators.max(100)]],
      condensateContent: [100 - this.analysis.wmrContent],
    });
    this.subscribeToValueChangeEvent();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(item => {
      item.unsubscribe();
    });
  }

  save() {
    this.submitted = true;
    if (!this.validated) {
      return;
    }
    const gasCondensateContentWMR = {
      id: this.analysis.id,
      regCode: this.getControlValue('regCode'),
      analysisDate: this.getControlValue('analysisDate') ? new Date(this.getControlValue('analysisDate')) : null,
      deliveringDate: this.getControlValue('deliveringDate') ? new Date(this.getControlValue('deliveringDate')) : null,
      samplingDate: this.getControlValue('samplingDate') ? new Date(this.getControlValue('samplingDate')) : null,
      wmrContent: this.getControlValue('contentWMR'),
      place: this._dialogData.place,
      point: this.getControlValue('selectedPoint'),
      user: this.getControlValue('laboratoryAssistant')
    }
    console.log('i am from save gasCondensateContentWMR:', gasCondensateContentWMR);
    if (gasCondensateContentWMR.id) {
      this._store.dispatch(new UpdateGasCondensateContentWmr(gasCondensateContentWMR));
    } else {
      this._store.dispatch(new CreateGasCondensateContentWmr(gasCondensateContentWMR));
    }
    this.close();
  }

  cancel() {
    this.close();
  }

  close() {
    this._dynamicDialogRef.close();
  }

  private getControlValue(name: string) {
    return this.gasCondensateForm.get(name).value;
  }

  private getPoint(sourcePoint: SamplingPointViewModel) {
    if (!sourcePoint) {
      return;
    }
    let point: SamplingPointViewModel;
    this.samplingPoints.forEach(item => {
      if (item.id === sourcePoint.id) {
        point = item;
      }
    });
    return point;
  }

  private getAssistant(sourceUser: UserShortInfoViewModel) {
    if (!sourceUser) {
      return;
    }
    let assistant: UserShortInfoViewModel;
    this.laboratoryAssistants.forEach(item => {
      if (item.id === sourceUser.id) {
        assistant = item;
      }
    });
    return assistant;
  }

  private subscribeToValueChangeEvent() {
    this._subscriptions.push(this.gasCondensateForm.get('contentWMR').valueChanges.subscribe(val => {
      if (val >= 0 && val <= 100) {
        this.gasCondensateForm.patchValue({
          condensateContent: 100 - val
        });
        return;
      }
      this.gasCondensateForm.patchValue({
        condensateContent: 0
      });
    }));
  }

}
