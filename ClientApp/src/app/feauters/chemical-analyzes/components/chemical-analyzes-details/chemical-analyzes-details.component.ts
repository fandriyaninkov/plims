import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/app/core/constants';
import { SamplingPointViewModel, UserShortInfoViewModel, ChemicalAnalysisViewModel,} from 'src/app/core/nswag/plims-generated';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Store } from '@ngxs/store';
import { ChemicalAnalysisDetailsData } from './chemical-analysis-details-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UpdateChemicalAnalysis, CreateChemicalAnalysis } from '../../actions/chemical-analyzes.actions';

@Component({
  selector: 'app-chemical-analyzes-details',
  templateUrl: './chemical-analyzes-details.component.html',
  styleUrls: ['./chemical-analyzes-details.component.scss'],
})
export class ChemicalAnalyzesDetailsComponent implements OnInit, OnDestroy {

  _dialogData: ChemicalAnalysisDetailsData;

  analysisForm: FormGroup;

  _submitted = false;

  get submitted() {
    return this._submitted;
  }

  get analysis() {
    if (!this._dialogData.analysisInfo) {
      return {} as ChemicalAnalysisViewModel;
    }
    return this._dialogData.analysisInfo;
  }

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

  get validated() {
    return this.analysisForm.valid;
  }

  get f() {
    return this.analysisForm.controls;
  }

  ruLocale = Constants.ru;
  private _subscriptions = new Array<Subscription>();

  constructor(
    private _config: DynamicDialogConfig,
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _dynamicDialogRef: DynamicDialogRef) {}

  ngOnInit(): void {
    this._dialogData = this._config.data as ChemicalAnalysisDetailsData;
    this.analysisForm = this._formBuilder.group({
      regCode: [this.analysis.regCode, Validators.required],
      selectedPoint: [this.getPoint(this.analysis.point), Validators.required],
      laboratoryAssistant: [this.getAssistant(this.analysis.user), Validators.required],
      samplingDate: [this.analysis.samplingDate ? new Date(this.analysis.samplingDate) : null],
      analysisDate: [this.analysis.analysisDate ? new Date(this.analysis.analysisDate) : null],
      deliveringDate: [this.analysis.deliveringDate ? new Date(this.analysis.deliveringDate) : null],
      contentWMR: [this.analysis.wmrContent, [Validators.required, Validators.min(0), Validators.max(100)]],
      condensateContent: [this.analysis.condensateContent, [Validators.required, Validators.min(0), Validators.max(100)]],
      massFractionOfMethanol: [{value: this.analysis.massFractionOfMethanol, disabled: this.analysis.massFractionOfMethanolNotAvailable}],
      massFractionOfMethanolError: [{value: this.analysis.massFractionOfMethanolError, disabled: this.analysis.massFractionOfMethanolNotAvailable}],
      massFractionOfMethanolNotAvialable: [this.analysis.massFractionOfMethanolNotAvailable],
      massFractionOfWater: [{value: this.analysis.massFractionOfWater, disabled: this.analysis.massFractionOfWaterNotAvailable}],
      massFractionOfWaterError: [{value: this.analysis.massFractionOfWaterError, disabled: this.analysis.massFractionOfWaterNotAvailable}],
      massFractionOfWaterNotAvialable: [this.analysis.massFractionOfWaterNotAvailable],
      massConcentrationOfCorrosionInhibitor: [{value: this.analysis.massConcentrationOfCorrosionInhibitor, disabled: this.analysis.massConcentrationOfCorrosionInhibitorNotAvailable}],
      massConcentrationOfCorrosionInhibitorNotAvialable: [this.analysis.massConcentrationOfCorrosionInhibitorNotAvailable]
    }, {
      validators: [
        RequiredIfEnabled('massFractionOfMethanolNotAvialable', ...['massFractionOfMethanol', 'massFractionOfMethanolError']),
        RequiredIfEnabled('massFractionOfWaterNotAvialable', ...['massFractionOfWater', 'massFractionOfWaterError']),
        RequiredIfEnabled('massConcentrationOfCorrosionInhibitorNotAvialable', ...['massConcentrationOfCorrosionInhibitor'])
        
      ]
    });

    this.massFractionOfMethanolAvialableSubscribe();
    this.massFractionOfWaterAvialableSubscribe();
    this.massConcentrationOfCorrosionInhibitorSubscribe();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(item => {
      item.unsubscribe();
    })
  }

  save() {
    this._submitted = true;
    if (!this.validated) {
      return;
    }
    const analysis = {
      id: this.analysis.id,
      regCode: this.getControlValue('regCode'),
      analysisDate: new Date(this.getControlValue('analysisDate')),
      deliveringDate: new Date(this.getControlValue('deliveringDate')),
      samplingDate: new Date(this.getControlValue('samplingDate')),
      wmrContent: this.getControlValue('contentWMR'),
      condensateContent: this.getControlValue('condensateContent'),
      massConcentrationOfCorrosionInhibitorNotAvailable: this.getControlValue('massConcentrationOfCorrosionInhibitorNotAvialable'),
      massFractionOfMethanolNotAvailable: this.getControlValue('massFractionOfMethanolNotAvialable'),
      massFractionOfWaterNotAvailable: this.getControlValue('massFractionOfWaterNotAvialable'),
      massConcentrationOfCorrosionInhibitor: null,
      massFractionOfMethanol: null,
      massFractionOfMethanolError: null,
      massFractionOfWater: null,
      massFractionOfWaterError: null,
      place: this._dialogData.place,
      point: this.getControlValue('selectedPoint'),
      user: this.getControlValue('laboratoryAssistant')
    } as ChemicalAnalysisViewModel;

    if (!analysis.massConcentrationOfCorrosionInhibitorNotAvailable) {
      analysis.massConcentrationOfCorrosionInhibitor = this.getControlValue('massConcentrationOfCorrosionInhibitor');
    }

    if (!analysis.massFractionOfMethanolNotAvailable) {
      analysis.massFractionOfMethanol = this.getControlValue('massFractionOfMethanol');
      analysis.massFractionOfMethanolError = this.getControlValue('massFractionOfMethanolError');
    }

    if (!analysis.massFractionOfWaterNotAvailable) {
      analysis.massFractionOfWater = this.getControlValue('massFractionOfWater');
      analysis.massFractionOfWaterError = this.getControlValue('massFractionOfWaterError');
    }
    if (analysis.id) {
      this._store.dispatch(new UpdateChemicalAnalysis(analysis));
    } else {
      this._store.dispatch(new CreateChemicalAnalysis(analysis));
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
    return this.analysisForm.get(name).value;
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

  private massFractionOfMethanolAvialableSubscribe() {
    this._subscriptions.push(this.analysisForm.controls['massFractionOfMethanolNotAvialable'].valueChanges.subscribe(
      (value: boolean) => {
        if (value) {
          this.analysisForm.controls['massFractionOfMethanol'].disable();
          this.analysisForm.controls['massFractionOfMethanolError'].disable();
        } else {
          this.analysisForm.controls['massFractionOfMethanol'].enable();
          this.analysisForm.controls['massFractionOfMethanolError'].enable();
        }
      }
    ));
  }

  private massFractionOfWaterAvialableSubscribe() {
    this._subscriptions.push(this.analysisForm.controls['massFractionOfWaterNotAvialable'].valueChanges.subscribe(
      (value: boolean) => {
        if (value) {
          this.analysisForm.controls['massFractionOfWater'].disable();
          this.analysisForm.controls['massFractionOfWaterError'].disable();
        } else {
          this.analysisForm.controls['massFractionOfWater'].enable();
          this.analysisForm.controls['massFractionOfWaterError'].enable();
        }
      }
    ));
  }

  private massConcentrationOfCorrosionInhibitorSubscribe() {
    this._subscriptions.push(this.analysisForm.controls['massConcentrationOfCorrosionInhibitorNotAvialable'].valueChanges.subscribe(
      (value: boolean) => {
        if (value) {
          this.analysisForm.controls['massConcentrationOfCorrosionInhibitor'].disable();
        } else {
          this.analysisForm.controls['massConcentrationOfCorrosionInhibitor'].enable();
        }
      }
    ));
  }
}

export function RequiredIfEnabled(checkBoxName: string, ...checkedControlNames: string[]) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[checkBoxName];

    if (control.value) {
      return;
    }

    checkedControlNames.forEach(item => {
      const matchingControl = formGroup.controls[item];
      if (!matchingControl.value) {
        matchingControl.setErrors({requiredIfEnabled: true});
      } else {
        matchingControl.setErrors(null);
      }
    })
  }
}
