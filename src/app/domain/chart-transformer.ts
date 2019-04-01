import { RenderedChart } from '../app.component';
import { EChartOption } from 'echarts';

export interface ChartTransformer {
  generateChart(response: any): RenderedChart;
}

export class LineChartTransformer implements ChartTransformer {

  generateChart(response: any): RenderedChart {
    const values: Array<any> = response.values;
    const seriesTitle = values.shift();

    const result = {};

    values.forEach(element => {
      const count = (result[element] || 0);
      result[element] = count + 1;
    });

    const lineChartOption: EChartOption = {
      xAxis: {
          type: 'category',
          data: Object.keys(result),
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: Object.values(result),
          type: 'line'
      }]
    };

    return {
      type: 'line',
      chartOption: lineChartOption,
    };
  }
}

export class BarChartTransformer implements ChartTransformer {

  generateChart(response: any): RenderedChart {
    const values: Array<any> = response.values;
    const seriesTitle = values.shift();

    const result = {};

    values.forEach(element => {
      const count = (result[element] || 0);
      result[element] = count + 1;
    });

    const lineChartOption: EChartOption = {
      xAxis: {
          type: 'category',
          data: Object.keys(result),
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: Object.values(result),
          type: 'bar'
      }]
    };

    return {
      type: 'bar',
      chartOption: lineChartOption,
    };
  }
}

interface PieData {
  name: string;
  value: number;
}

export class PieChartTransformer implements ChartTransformer {

  generateChart(response: any): RenderedChart {
    const values: Array<any> = response.values;
    const seriesTitle = values.shift();

    const result = {};

    values.forEach(element => {
      const count = (result[element] || 0);
      result[element] = count + 1;
    });

    const seriesData: Array<PieData> = Object
      .entries(result)
      .map(([key, value]) => {
        return {
          name: key,
          value: Number(value),
        };
      });

    const pieChartOption: EChartOption = {
      series : [
          {
              name: seriesTitle,
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data: seriesData,
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    };
    return {
      type: 'pie',
      chartOption: pieChartOption,
    };
  }

}
