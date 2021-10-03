import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import * as Chart from 'chart.js';
import { ChartViewModel, PointViewModel, TimeScaleBoundingViewModel } from 'src/app/core/nswag/plims-generated';
import { GetChartInfo, SetSamplingDateRange, SetTimeAxisBounding } from '../../actions/gas-condensate-content-wmr.actions';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  chartTypes = [
    {name: 'Линия', code: 1},
    {name: 'Диаграмма', code: 2},
    {name: 'Точки', code: 3}
  ]

  private _selectedType = {name: 'Линия', code: 1};

  get selectedType() {
    return this._selectedType;
  }

  set selectedType(value) {
    this._selectedType = value;
    if (value.code === 1) {
      this.reRenderChart('line');
    }
    if (value.code === 2) {
      this.reRenderChart('bar');
    }
    if (value.code === 3) {
      this.reRenderChart('scatter');
    }
  }

  chartHeight: string;

  chart: Chart;
  timeAxis: Chart.TimeScale;
  zoomInit = false;

  private _chartInfo: ChartViewModel;
  private _timeAxisBoundary: TimeScaleBoundingViewModel;

  constructor(
    private _actions: Actions,
    private _store: Store
  ) { }

  ngOnInit(): void {
    this._store.dispatch(new SetTimeAxisBounding(null, null));
    this._timeAxisBoundary = this._store
    .selectSnapshot<TimeScaleBoundingViewModel>(state => state.gasCondensateContentWMR.timeAxisBounding);
    this.chartHeight = `calc(100vh - ${250}px)`;
    this._actions.pipe(ofActionSuccessful(GetChartInfo)).subscribe((result) => {
      this._chartInfo = this._store.selectSnapshot<ChartViewModel>(state => state.gasCondensateContentWMR.chartInfo);
      this.initZoom();
      this.loadDataToChart();
    });
  }

  ngAfterViewInit(): void {
    const canvas = document.getElementById('gasCondensateContentWmrCanvasId') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    this.timeAxis = {
      type: 'time',
      time: {
        stepSize: 250,
        unit: 'hour',
        displayFormats: {
          hour: 'YYYY-MM-DD hh:mm',
        },
      }
    } as Chart.TimeScale;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        scales: {
          xAxes: [
            this.timeAxis
          ]
        },

      },
    });
    this.chart.render();
  }

  private loadDataToChart() {
    if (this.chart.data.datasets.length > 0) {
      this._chartInfo.lines.forEach(item => {
        const dataSet = this.chart.data.datasets.filter(x => x.label === item.title)[0];
        if (!dataSet) {
          this.chart.data.datasets.push({
            label: item.title,
            backgroundColor: item.lineColor,
            fill: 'disabled',
            borderColor: item.lineColor,
            data: this.convertPointViewModel(item.points)
          });
          return;
        }
        dataSet.data = this.convertPointViewModel(item.points);
      });
    } else {
      this._chartInfo.lines.forEach(item => {
        this.chart.data.datasets.push({
          label: item.title,
          backgroundColor: item.lineColor,
          fill: 'disabled',
          borderColor: item.lineColor,
          data: this.convertPointViewModel(item.points)
        });
      });
    }
    this.chart.update();
  }

  private initZoom() {
    if (this.zoomInit) {
      return;
    }
    this.zoomInit = true;
    console.log('i am from initZoom:', this._chartInfo.timeScaleBounding);
    this.chart.options.plugins = {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          // rangeMin: {
          //   x: this._chartInfo.timeScaleBounding.startDate,
          //   y: null
          // },
          // rangeMax: {
          //   x: this._chartInfo.timeScaleBounding.endDate,
          //   y: null
          // },
          onPanComplete: ({chart}) => { this.loadDataByZoom(chart); },
        },
        zoom: {
          enabled: true,
          mode: 'x',
          // speed: 0.05,
          // rangeMin: {
          //   x: this._chartInfo.timeScaleBounding.startDate,
          //   y: null
          // },
          // rangeMax: {
          //   x: this._chartInfo.timeScaleBounding.endDate,
          //   y: null
          // },
          onZoomComplete: ({chart}) => { this.loadDataByZoom(chart); },
        }
      },
    };
  }

  private loadDataByZoom(chart) {
    const timeScale = chart.scales['x-axis-0'];
    this._store.dispatch(new SetTimeAxisBounding(new Date(timeScale.min), new Date(timeScale.max)));
    this._store.dispatch(new GetChartInfo());
  }

  private convertPointViewModel(points: PointViewModel[]) {
    const chartPoints = [];
    points.forEach(point => {
      chartPoints.push({
        t: point.date,
        y: point.value
      });
    });
    return chartPoints;
  }

  private reRenderChart(type: string) {
    const canvas = document.getElementById('gasCondensateContentWmrCanvasId') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
      type,
      data: this.chart.data,
      options: {
        scales: {
          xAxes: [
            this.timeAxis
          ]
        },
        plugins: this.chart.options.plugins
      },
    });
    this.chart = chart;
    this.chart.render();
  }

}
