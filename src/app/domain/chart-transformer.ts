import { EChartOption } from 'echarts';

export interface ChartTransformer {
  generateChart(values: Array<any>): EChartOption;
}

export class LineChartTransformer implements ChartTransformer {
  generateChart(values: Array<any>): EChartOption {
    const seriesTitle = values[0];
    const seriesValues: Array<any> = values.slice(1, values.length + 1);
    console.log(`seriesValues`, seriesValues);

    const result = {};

    seriesValues.forEach(element => {
      const count = result[element] || 0;
      result[element] = count + 1;
    });

    const lineChartOption: EChartOption = {
      title: {
        text: seriesTitle,
      },

      xAxis: {
        type: 'category',
        data: Object.keys(result)
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: Object.values(result),
          type: 'line'
        }
      ]
    };

    return lineChartOption;
  }
}

export class BarChartTransformer implements ChartTransformer {
  generateChart(values: Array<any>): EChartOption {
    const seriesTitle = values[0];
    const seriesValues: Array<any> = values.slice(1, values.length + 1);

    const result = {};

    seriesValues.forEach(element => {
      const count = result[element] || 0;
      result[element] = count + 1;
    });

    const lineChartOption: EChartOption = {
      title: {
        text: seriesTitle,
      },

      xAxis: {
        type: 'category',
        data: Object.keys(result)
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: Object.values(result),
          type: 'bar'
        }
      ]
    };

    return lineChartOption;
  }
}

interface PieData {
  name: string;
  value: number;
}

export class PieChartTransformer implements ChartTransformer {
  generateChart(values: Array<any>): EChartOption {
    const seriesTitle = values[0];
    const seriesValues: Array<any> = values.slice(1, values.length + 1);

    const result = {};

    seriesValues.forEach(element => {
      const count = result[element] || 0;
      result[element] = count + 1;
    });

    const seriesData: Array<PieData> = Object.entries(result).map(
      ([key, value]) => {
        return {
          name: key,
          value: Number(value)
        };
      }
    );

    const pieChartOption: EChartOption = {
      title: {
        text: seriesTitle,
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: seriesTitle,
          type: 'pie',
          radius: '55%',
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
    return pieChartOption;
  }
}
