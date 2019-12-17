export class TrendChartWidget {
    signalsY1: string[];
    signalsY2: string[];
    dateRange: string;
    leftAxisRangeY1: string;
    rightAxisRangeY2: string;
    chartTitle: string;
    displayThrshold: string;
    eventFlags: boolean;
    legends: boolean;
    minMax: boolean;


    accountCode: string;
    propertyName: string;
    propertyValue: string;
    measuredValue: string;
    environmentFqdn: string;
    bucketSize: string;
    fromDateTime: Date;
    toDateTime: Date;

    // Live chart data
    signalY1: string;
    signalY2: string;
    leftAxisRange: string;
    rightAxisRange: string;
    displayThreshold_None: boolean;
    displayThreshold_LeftAxis: boolean;
    displayThreshold_RightAxis: boolean;
}