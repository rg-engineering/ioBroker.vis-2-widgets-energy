import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@mui/styles';

import { Card, CardContent} from '@mui/material';

//import ReactEchartsCore from 'echarts-for-react';

import EchartContainer from './EchartContainer'

import { I18n } from '@iobroker/adapter-react-v5';

import Generic from './Generic'; 

const styles = () => ({
    cardContent: {
        flex: 1,
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
    },
});


//todo für WU anpassen
//todo icons für widgtes und allgemein
//todo readme anpassen
//todo Format-String für Zeitanzeige X Achse (bug)
//todo rerender verzögern, wenn Daten aktualisiert werden
//todo Farbe für Background einstellbar
//todo MinMax Temperatur auf ganze 5er runden


const setDataStructures = async (field, data, changeData, socket) => {

    console.log("set new datastructure instance" + data['instance'] + " " + data['datastructure'] + " " + data.length);

    let max_days = 5;
    let max_periods = 8;
    let cnt = 1;


    //if DasWettter

    if (data['instance'].indexOf("daswetter") > -1) {

        if (data['datastructure'] == "NextDaysDetailed") {
            max_periods = 8;
            max_days = 5;
            for (var d = 1; d <= max_days; d++) {

                data['oid_general_day_' + d] = "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".day_value";

                for (var p = 1; p <= max_periods; p++) {

                    data['oid_rain_' + cnt] = "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".rain_value";
                    data['oid_temp_' + cnt] = "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".temp_value";
                    data['oid_cloud_' + cnt] = "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".clouds_value";
                    data['oid_time_' + cnt] = "daswetter.0.NextDaysDetailed.Location_1.Day_" + d + ".Hour_" + p + ".hour_value";
                    cnt++;
                }
            }
        }
        else if (data['datastructure'] == "NextHours") {
            max_periods = 23;
            max_days = 5;
            for (var d = 1; d <= max_days; d++) {

                data['oid_general_day_' + d] = "daswetter.0.NextHours.Location_1.Day_" + d + ".day_value";

                if (d > 3) { max_periods = 8; }

                for (var p = 1; p <= max_periods; p++) {

                    data['oid_rain_' + cnt] = "daswetter.0.NextHours.Location_1.Day_" + d + ".Hour_" + p + ".rain_value";
                    data['oid_temp_' + cnt] = "daswetter.0.NextHours.Location_1.Day_" + d + ".Hour_" + p + ".temp_value";
                    data['oid_cloud_' + cnt] = "daswetter.0.NextHours.Location_1.Day_" + d + ".Hour_" + p + ".clouds_value";
                    data['oid_time_' + cnt] = "daswetter.0.NextHours.Location_1.Day_" + d + ".Hour_" + p + ".hour_value";
                    cnt++;
                }
            }
        }
        else if (data['datastructure'] == "NextHours2") {
            max_periods = 8;
            max_days = 5;
            for (var d = 1; d <= max_days; d++) {

                data['oid_general_day_' + d] = "daswetter.0.NextHours2.Location_1.Day_" + d + ".date";

                for (var p = 1; p <= max_periods; p++) {

                    data['oid_rain_' + cnt] = "daswetter.0.NextHours2.Location_1.Day_" + d + ".Hour_" + p + ".rain";
                    data['oid_temp_' + cnt] = "daswetter.0.NextHours2.Location_1.Day_" + d + ".Hour_" + p + ".temp";
                    data['oid_cloud_' + cnt] = "daswetter.0.NextHours2.Location_1.Day_" + d + ".Hour_" + p + ".clouds";
                    data['oid_time_' + cnt] = "daswetter.0.NextHours2.Location_1.Day_" + d + ".Hour_" + p + ".hour";
                    cnt++;
                }
            }
        }
        else {
            console.log("setdatastructures: unknown data structure");
        }
    }
    else if (data['instance'].indexOf("weatherunderground") > -1) {


        for (var h = 0; h < 36; h++) {

            data['oid_rain_' + cnt] = "weatherunderground.0.forecastHourly." + h + "h.precipitation";
            data['oid_temp_' + cnt] = "weatherunderground.0.forecastHourly." + h + ".h.temp";
            data['oid_cloud_' + cnt] = "weatherunderground.0.forecastHourly." + h + ".h.sky";
            data['oid_time_' + cnt] = "weatherunderground.0.forecastHourly." + h + ".h.time";

            //todo
            //data['oid_chancerain_' + cnt] = "weatherunderground.0.forecastHourly." + h + ".h.precipitationChance";
            cnt++;



        }




    }
    else {
        //do nothing
    }


    //todo überflüssige OID's löschen

    changeData(data);

};




class WeatherWidget extends (Generic) {

    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();

    }

    static getWidgetInfo() {

        let oid_rain_fields = [];
        let oid_temp_fields = [];
        let oid_cloud_fields = [];
        let oid_time_fields = [];
        let oid_general_fields = [];
        let cnt = 1;

        let max_days = 5;
        let max_periods = 23;

        for (var d = 1; d <= max_days; d++) {

            oid_general_fields.push(
                {
                    name: 'oid_general_day_' + d,    // name in data structure
                    label: 'widgets_weather_label_oid_general_day_' + d, // translated field label
                    type: 'id',
                    default: "daswetter.0.NextHours.Location_1.Day_" + d + ".day_value",
                }
            )

            if (d > 3) { max_periods = 8; }

            for (var p = 1; p <= max_periods; p++) {

                oid_rain_fields.push(
                    {
                        name: 'oid_rain_' + cnt,    // name in data structure
                        label: 'widgets_weather_label_oid_rain_' + cnt, // translated field label
                        type: 'id',
                        default: "daswetter.0.NextHours.Location_1.Day_" + d + ".Hour_" + p + ".rain_value",
                    }
                );
                oid_temp_fields.push(
                    {
                        name: 'oid_temp_' + cnt,    // name in data structure
                        label: 'widgets_weather_label_oid_temp_' + cnt, // translated field label
                        type: 'id',
                        default: "daswetter.0.NextHours.Location_1.Day_" + d + ".Hour_" + p + ".temp_value",
                    }
                );
                oid_cloud_fields.push(
                    {
                        name: 'oid_cloud_' + cnt,    // name in data structure
                        label: 'widgets_weather_label_oid_cloud_' + cnt, // translated field label
                        type: 'id',
                        default: "daswetter.0.NextHours.Location_1.Day_" + d + ".Hour_" + p + ".clouds_value",
                    }
                );
                oid_time_fields.push(
                    {
                        name: 'oid_time_' + cnt,    // name in data structure
                        label: 'widgets_weather_label_oid_time_' + cnt, // translated field label
                        type: 'id',
                        default: "daswetter.0.NextHours.Location_1.Day_" + d + ".Hour_" + p + ".hour_value",
                    }
                );
                cnt++;
            }
        }


        return {
            id: 'tplWeatherWidget',                 // Unique widget type ID. Should start with `tpl` followed
            visSet: 'vis-2-widgets-weather',        // Unique ID of widget set 
            visSetLabel: 'vis-2-widgets-weather',   // Widget set translated label (should be defined only in one widget of set)
            visSetColor: '#cf00ff',                 // Color of widget set. it is enough to set color only in one widget of set
            visName: 'weather',                     // Name of widget
            visWidgetLabel: 'vis_2_widgets-weather', // Label of widget
            visWidgetColor: '#005cc4',               // Optional widget color. If not set, default color of widget set will be used.
            visResizeLocked: false,                   // require, that width is always equal to height
            visResizable: true,                     // widget is not resizable 
            visDraggable: true,                     // widget is not draggable 
            visAttrs: [
                {
                    // check here all possible types https://github.com/ioBroker/ioBroker.vis/blob/react/src/src/Attributes/Widget/SCHEMA.md
                    name: 'common', // group name
                    fields: [
                        {
                            name: 'noCard',
                            label: 'without_card',
                            type: 'checkbox',
                        },

                        //todo nur als Beispiel zum ausblenden
                        {
                            name: 'widgetTitle',
                            label: 'name',
                            hidden: '!!data.noCard',
                        },
                        {
                            name: 'instance',    // name in data structure
                            label: 'widgets_weather_label_instance', // translated field label
                            type: 'instance',
                            default: 'daswetter.0',
                            onChange: setDataStructures,
                        },
                        {
                            name: 'oid_location',    // name in data structure
                            label: 'widgets_weather_label_oidlocation', // translated field label
                            type: 'id',
                            default: 'daswetter.0.NextHours.Location_1.Location',
                        },
                        {
                            name: 'datastructure',    // name in data structure
                            label: 'widgets_weather_label_datastructure', // translated field label
                            type: 'select',
                            options: [
                                {
                                    value: 'NextDaysDetailed',
                                    label: 'widgets_weather_label_datastructure_nextdaysdetailed'
                                },
                                {
                                    value: 'NextHours',
                                    label: 'widgets_weather_label_datastructure_nexthours'
                                },
                                {
                                    value: 'NextHours2',
                                    label: 'widgets_weather_label_datastructure_nexthours2'
                                }
                            ],
                            default: 'NextHours',
                            onChange: setDataStructures,

                        },
                    ],
                },
                {
                    name: 'X_axis', // group name
                    fields: [
                        {
                            name: 'xaxis_axisLabel_formatstring',    // name in data structure
                            label: 'widgets_weather_label_xaxis_axisLabel_formatstring', // translated field label
                            type: 'text',
                            default: "{ee} {hh}:{mm}",
                        },
                    ]
                },
                {


                    name: 'rain', // group name
                    fields: [
                        {
                            name: 'rain_visible',    // name in data structure
                            label: 'widgets_weather_label_rain_visible', // translated field label
                            type: 'checkbox',
                            default: false,
                        },
                        {
                            name: 'rain_color',    // name in data structure
                            label: 'widgets_weather_label_rain_color', // translated field label
                            type: 'color',
                            default: "blue",
                        },
                        {
                            name: 'rain_show_separate',    // name in data structure
                            label: 'widgets_weather_label_rain_show_separate', // translated field label
                            type: 'checkbox',
                            default: false,
                        },
                    ]
                },
                {
                    name: 'temperature', // group name
                    fields: [
                        {
                            name: 'temperature_visible',    // name in data structure
                            label: 'widgets_weather_label_temperature_visible', // translated field label
                            type: 'checkbox',
                            default: false,
                        },
                        {
                            name: 'temperature_color',    // name in data structure
                            label: 'widgets_weather_label_temperature_color', // translated field label
                            type: 'color',
                            default: "red",
                        },
                    ]
                },
                {
                    name: 'clouds', // group name
                    fields: [
                        {
                            name: 'clouds_visible',    // name in data structure
                            label: 'widgets_weather_label_clouds_visible', // translated field label
                            type: 'checkbox',
                            default: false,
                        },
                        {
                            name: 'clouds_color',    // name in data structure
                            label: 'widgets_weather_label_clouds_color', // translated field label
                            type: 'color',
                            default: "yellow",
                        },
                        {
                            name: 'clouds_show_separate',    // name in data structure
                            label: 'widgets_weather_label_clouds_show_separate', // translated field label
                            type: 'checkbox',
                            default: true,
                        },
                        {
                            name: 'sun_or_cloud',    // name in data structure
                            label: 'widgets_weather_label_sunorcloud', // translated field label
                            type: 'select',
                            options: [
                                {
                                    value: 'sun',
                                    label: 'widgets_weather_label_sunorcloud_sun'
                                },
                                {
                                    value: 'cloud',
                                    label: 'widgets_weather_label_sunorcloud_cloud'
                                },
                            ],
                            default: 'sun',
                        },
                    ]
                },
                {
                    name: 'chanceofraining', // group name
                    fields: [
                        {
                            name: 'chanceofraining_visible',    // name in data structure
                            label: 'widgets_weather_label_chanceofraining_visible', // translated field label
                            type: 'checkbox ',
                            default: false,

                            //todo enable for WU
                            hidden: true,
                        },
                    ]
                },
                {
                    name: 'OIDS_general', // group name
                    fields: oid_general_fields
                },
                {
                    name: 'OIDS_rain', // group name
                    fields: oid_rain_fields
                },
                {
                    name: 'OIDS_temp', // group name
                    fields: oid_temp_fields
                },
                {
                    name: 'OIDS_cloud', // group name
                    fields: oid_cloud_fields
                },
                {
                    name: 'OIDS_time', // group name
                    fields: oid_time_fields
                },

            ],
            visDefaultStyle: {
                width: 320,
                height: 182,
                position: 'relative',
            },
            visPrev: 'widgets/vis-2-test/img/vis-widget-weather.png',
        };
    }

    // eslint-disable-next-line class-methods-use-this
    propertiesUpdate() {
        // Widget has 3 important states
        // 1. this.state.values - contains all state values, that are used in widget (automatically collected from widget info).
        //                        So you can use `this.state.values[this.state.rxData.oid + '.val']` to get value of state with id this.state.rxData.oid
        // 2. this.state.rxData - contains all widget data with replaced bindings. E.g. if this.state.data.type is `{system.adapter.admin.0.alive}`,
        //                        then this.state.rxData.type will have state value of `system.adapter.admin.0.alive`
        // 3. this.state.rxStyle - contains all widget styles with replaced bindings. E.g. if this.state.styles.width is `{javascript.0.width}px`,
        //                        then this.state.rxData.type will have state value of `javascript.0.width` + 'px
    }



    async componentDidMount() {
        super.componentDidMount();

        // Update data
        this.propertiesUpdate();
    }

    // Do not delete this method. It is used by vis to read the widget configuration.
    // eslint-disable-next-line class-methods-use-this
    getWidgetInfo() {
        return WeatherWidget.getWidgetInfo();
    }

    // This function is called every time when rxData is changed
    async onRxDataChanged() {

        this.propertiesUpdate();
    }

    // This function is called every time when rxStyle is changed
    // eslint-disable-next-line class-methods-use-this
    onRxStyleChanged() {

    }

    // This function is called every time when some Object State updated, but all changes lands into this.state.values too
    // eslint-disable-next-line class-methods-use-this, no-unused-vars
    onStateUpdated(id, state) {

    }





    /**
     *
     * @returns {echarts.EChartsOption}
     */
    getOption1() {

        console.log("getOption1 ");

        let weatherData;
        if (this.state.rxData['instance'].indexOf("daswetter") > -1) {
            weatherData = this.getWeatherDataDasWetter();
        }
        else if (this.state.rxData['instance'].indexOf("weatherunderground") > -1) {
            weatherData = this.getWeatherDataWU();
        }

        console.log("##got " + JSON.stringify(weatherData[0]));

        let useSecondDiagram = false;

        if ((this.state.rxData['rain_visible'] && this.state.rxData['rain_show_separate'])
            || (this.state.rxData['clouds_visible'] && this.state.rxData['clouds_show_separate'])) {
            useSecondDiagram = true;

        }

        console.log("show second diagram " + useSecondDiagram);

        let location = this.state.values[`${this.state.rxData['oid_location']}.val`];
        let axisLabel_formatstring = "'" + this.state.rxData['xaxis_axisLabel_formatstring'] + "'";
        console.log("##got " + location);
        //let headline = I18n.t("Weather at ") + location;
        let headline = location;

        // min / max 
        const MinMax = weatherData[0][3];
        console.log("min max " + JSON.stringify(MinMax));

        const RainMin = MinMax["RainMin"];
        const RainMax = MinMax["RainMax"];
        const TempMin = MinMax["TempMin"];
        const TempMax = MinMax["TempMax"];
        const CloudMin = MinMax["CloudMin"];
        const CloudMax = MinMax["CloudMax"];

        let legend = [];
        let yaxis = [];
        let series = []

        let cnt = 0;

        if (this.state.rxData['rain_visible'] == true && this.state.rxData['rain_show_separate'] == false && weatherData[0][0].length > 1) {
            legend.push(I18n.t('rain'));

            yaxis.push({
                position: "right",
                type: "value",
                // min max berechnen
                min: RainMin,
                max: RainMax,
                axisLabel: {
                    formatter: '{value} mm'
                }
            });

            series.push({
                name: 'rain',
                type: 'bar',
                data: weatherData[0][0],
                color: this.state.rxData['rain_color'] || "blue",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' mm';
                    }
                },
            },);
            cnt++;
        }
        if (this.state.rxData['temperature_visible'] == true && weatherData[0][1].length > 1) {
            legend.push(I18n.t('temperature'));

            yaxis.push({
                position: "left",
                type: "value",
                // min max berechnen
                min: TempMin,
                max: TempMax,
                axisLabel: {
                    formatter: '{value} °C'
                }
            });

            series.push({
                name: 'temperature',
                type: 'line',
                data: weatherData[0][1],
                color: this.state.rxData['temperature_color'] || "red",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' °C';
                    }
                },
            });
            cnt++

        }
        if (this.state.rxData['clouds_visible'] == true && this.state.rxData['clouds_show_separate'] == false && weatherData[0][2].length > 1) {

            if (this.state.rxData['sun_or_cloud'] == "sun") {
                legend.push(I18n.t('sun'));
            }
            else {
                legend.push(I18n.t('cloud'));
            }
            yaxis.push({
                position: "right",
                type: "value",
                min: CloudMin,
                max: CloudMax,
                axisLabel: {
                    formatter: '{value} %'
                }
            });
            series.push({
                name: this.state.rxData['sun_or_cloud'] == "sun" ? 'sun' : 'cloud',
                type: 'bar',
                data: weatherData[0][2],
                color: this.state.rxData['clouds_color'] || "yellow",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' %';
                    }
                },
            });
            cnt++;
        }

        if (cnt == 0) {
            //add dummy data to show anything on screen

            console.log("add dummy data");

            legend.push(I18n.t('dummy'));
            yaxis.push({
                position: "left",
                type: "value",
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: '{value} %'
                }
            });
            series.push({
                name: 'cloud',
                type: 'bar',
                data: [
                    ["2024-04-30T00:00:00.000Z", 10],
                    ["2024-04-30T03:00:00.000Z", 20],
                    ["2024-04-30T06:00:00.000Z", 20],
                    ["2024-04-30T09:00:00.000Z", 60]

                ],

                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' %';
                    }
                },
            });



        }



        //console.log("legend: " + JSON.stringify(legend) + " yaxis: " + JSON.stringify(yaxis));




        let content = {
            backgroundColor: 'transparent',
            title: {
                text: headline,
            },
            grid: {
                show: true,
                top: 30,
                bottom: useSecondDiagram ? 30 : 60,
                //backgroundColor: '#F5F5F5',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legend,
                orient: 'horizontal',
                right: 10,
                //top: 'center',
            },
            xAxis: {
                type: "time",
                show: useSecondDiagram ? false : true,
                axisLabel: {

                    rotate: 45,
                    //todo format einstellbar
                    formatter: '{ee} {hh}:{mm}',
                    //formatter: axisLabel_formatstring,
                }

            },

            yAxis: yaxis,

            series: series,
        };

        console.log("options: " + JSON.stringify(content));

        return content;
    }

    /**
     *
     * @returns {echarts.EChartsOption}
     */
    getOption2() {

        console.log("getOption2 ");

        let weatherData;
        if (this.state.rxData['instance'].indexOf("daswetter") > -1) {
            weatherData = this.getWeatherDataDasWetter();
        }
        else if (this.state.rxData['instance'].indexOf("weatherunderground") > -1) {
            weatherData = this.getWeatherDataWU();
        }


        console.log("##got " + JSON.stringify(weatherData[0]));

        let axisLabel_formatstring = "'" + this.state.rxData['xaxis_axisLabel_formatstring'] + "'";

        // min / max 
        const MinMax = weatherData[0][3];
        console.log("min max " + JSON.stringify(MinMax));

        const RainMin = MinMax["RainMin"];
        const RainMax = MinMax["RainMax"];
        const TempMin = MinMax["TempMin"];
        const TempMax = MinMax["TempMax"];
        const CloudMin = MinMax["CloudMin"];
        const CloudMax = MinMax["CloudMax"];


        let legend = [];
        let yaxis = [];
        let series = []

        let cnt = 0;

        if (this.state.rxData['rain_visible'] == true && this.state.rxData['rain_show_separate'] == true && weatherData[0][0].length > 1) {
            legend.push(I18n.t('rain'));

            yaxis.push({
                position: "right",
                type: "value",
                //rain min / max berechnen
                min: RainMin,
                max: RainMax,
                axisLabel: {
                    formatter: '{value} mm'
                }
            });

            series.push({
                name: 'rain',
                type: 'bar',
                data: weatherData[0][0],
                color: this.state.rxData['rain_color'] || "blue",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' mm';
                    }
                },
            },);
            cnt++;
        }

        if (this.state.rxData['clouds_visible'] == true && this.state.rxData['clouds_show_separate'] == true && weatherData[0][2].length > 1) {

            if (this.state.rxData['sun_or_cloud'] == "sun") {
                legend.push(I18n.t('sun'));
            }
            else {
                legend.push(I18n.t('cloud'));
            }
            yaxis.push({
                position: "right",
                type: "value",
                min: CloudMin,
                max: CloudMax,
                axisLabel: {
                    formatter: '{value} %'
                }
            });
            series.push({
                name: this.state.rxData['sun_or_cloud'] == "sun" ? 'sun' : 'cloud',
                type: 'bar',
                data: weatherData[0][2],
                color: this.state.rxData['clouds_color'] || "yellow",
                yAxisIndex: cnt,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' %';
                    }
                },
            });
            cnt++;
        }

        if (cnt == 0) {
            //add dummy data to show anything on screen

            console.log("add dummy data");

            legend.push(I18n.t('dummy'));
            yaxis.push({
                position: "left",
                type: "value",
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: '{value} %'
                }
            });
            series.push({
                name: 'cloud',
                type: 'bar',
                data: [
                    ["2024-04-30T00:00:00.000Z", 10],
                    ["2024-04-30T03:00:00.000Z", 20],
                    ["2024-04-30T06:00:00.000Z", 20],
                    ["2024-04-30T09:00:00.000Z", 60]

                ],

                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' %';
                    }
                },
            });
        }

        //console.log("legend: " + JSON.stringify(legend) + " yaxis: " + JSON.stringify(yaxis));

        let content = {
            backgroundColor: 'transparent',
            title: {
                text: "",
            },
            grid: {
                show: true,
                top: 30,
                bottom: 60,
                //backgroundColor: '#F5F5F5',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legend,
                orient: 'horizontal',
                right: 10,
                //top: 'center',
            },
            xAxis: {
                type: "time",

                axisLabel: {

                    rotate: 45,
                    //todo format einstellbar
                    formatter: '{ee} {hh}:{mm}',
                    //formatter: axisLabel_formatstring,
                }

            },

            yAxis: yaxis,

            series: series,
        };

        console.log("options: " + JSON.stringify(content));

        return content;
    }

    getWeatherDataWU() {

        console.log("getWeatherData " + this.state.rxData['instance'] + " / " + this.state.rxData['datastructure']);

        const weatherData = [];
        let max_hours = 36;
        let instanceID = this.state.rxData['instance']

        const rainData = [];
        const tempData = [];
        const cloudData = [];

        let TempMin = 0;
        let TempMax = 20;
        let RainMin = 0;
        let RainMax = 1;


        let cnt = 1;


        for (var h = 0; h < max_hours; h++) {

            const rain_val = this.state.values[`${this.state.rxData['oid_rain_' + cnt]}.val`];
            const temp_val = this.state.values[`${this.state.rxData['oid_temp_' + cnt]}.val`];
            const cloud_val = this.state.values[`${this.state.rxData['oid_cloud_' + cnt]}.val`];
            const time_val = this.state.values[`${this.state.rxData['oid_time_' + cnt]}.val`];

            cnt++;

            if (rain_val > RainMax) { RainMax = rain_val; }
            if (temp_val > TempMax) { TempMax = temp_val; }
            if (temp_val < TempMin) { TempMin = temp_val; }

            if (this.state.rxData['rain_visible'] == true && oDate != null && rain_val != null) {
                rainData.push(
                    [
                        oDate,
                        rain_val
                    ]
                );
            }

            if (this.state.rxData['temperature_visible'] == true && oDate != null && temp_val != null) {
                tempData.push(
                    [
                        oDate,
                        temp_val
                    ]
                );
            }
            if (this.state.rxData['clouds_visible'] == true && oDate != null && cloud_val != null) {

                let value = cloud_val;
                if (this.state.rxData['sun_or_cloud'] == "sun") {
                    value = 100 - cloud_val;
                }

                cloudData.push(
                    [
                        oDate,
                        //bei Sonne 100-cloud_val
                        value
                    ]
                );
            }

        }



        let MinMax = {
            "RainMin": RainMin,
            "RainMax": RainMax,
            "TempMin": TempMin,
            "TempMax": TempMax,
            "CloudMin": 0,
            "CloudMax": 100
        }

        console.log("rainData " + JSON.stringify(rainData));
        console.log("tempData " + JSON.stringify(tempData));
        console.log("cloudData " + JSON.stringify(cloudData));

        //const weatherData = ids.length ? (await this.props.context.socket.getStates(ids)) : {};

        weatherData.push(
            [
                rainData,
                tempData,
                cloudData,
                MinMax
            ]
        );

        return weatherData;
    }


    getWeatherDataDasWetter() {

        console.log("getWeatherData " + this.state.rxData['instance'] + " / " + this.state.rxData['datastructure']);

        const weatherData = [];
        let max_days = 5;
        let max_periods = 23;
        let instanceID = this.state.rxData['instance']

        const rainData = [];
        const tempData = [];
        const cloudData = [];

        let TempMin = 0;
        let TempMax = 20;
        let RainMin = 0;
        let RainMax = 1;


        let cnt = 1;
        for (var d = 1; d <= max_days; d++) {

            //console.log("day " + d);

            const dayData = this.state.values[`${this.state.rxData['oid_general_day_' + d]}.val`];
            let year = 0;
            let month = 0;
            let day = 0;
            let hour = 0;
            let minute = 0;

            //console.log("dayData " + JSON.stringify(dayData));

            if (dayData != null) {
                year = Number(dayData.substring(0, 4));
                month = Number(dayData.substring(4, 6));
                month = month - 1;
                day = Number(dayData.substring(6, 8));
            }

            if (this.state.rxData['datastructure'] == "NextDaysDetailed") {
                max_periods = 8;
            }
            else if (this.state.rxData['datastructure'] == "NextHours") {
                if (d > 3) {
                    max_periods = 8;
                }
                else {
                    max_periods = 23;
                }
            }
            else if (this.state.rxData['datastructure'] == "NextHours2") {
                max_periods = 8;
            }
            else {
                console.log("getWeatherData: unknown data structure");
            }


            for (var p = 1; p <= max_periods; p++) {

                //console.log("period " + p);

                const rain_val = this.state.values[`${this.state.rxData['oid_rain_' + cnt]}.val`];
                const temp_val = this.state.values[`${this.state.rxData['oid_temp_' + cnt]}.val`];
                const cloud_val = this.state.values[`${this.state.rxData['oid_cloud_' + cnt]}.val`];
                const time_val = this.state.values[`${this.state.rxData['oid_time_' + cnt]}.val`];

                cnt++;
                //console.log("got data " + JSON.stringify(rain_val) + " " + JSON.stringify(temp_val) + " " + JSON.stringify(cloud_val) + " " + JSON.stringify(time_val));

                //calc date
                let oDate = null;

                if (time_val != null && year > 0 && month > 0 && day > 0) {
                    let timeData = time_val.split(":");
                    hour = timeData[0];
                    minute = timeData[1];

                    oDate = new Date(year, month, day, hour, minute, 0, 0);
                }

                if (rain_val > RainMax) { RainMax = rain_val; }
                if (temp_val > TempMax) { TempMax = temp_val; }
                if (temp_val < TempMin) { TempMin = temp_val; }


                if (this.state.rxData['rain_visible'] == true && oDate != null && rain_val != null) {
                    rainData.push(
                        [
                            oDate,
                            rain_val
                        ]
                    );
                }

                if (this.state.rxData['temperature_visible'] == true && oDate != null && temp_val != null) {
                    tempData.push(
                        [
                            oDate,
                            temp_val
                        ]
                    );
                }
                if (this.state.rxData['clouds_visible'] == true && oDate != null && cloud_val != null) {

                    let value = cloud_val;
                    if (this.state.rxData['sun_or_cloud'] == "sun") {
                        value = 100 - cloud_val;
                    }

                    cloudData.push(
                        [
                            oDate,
                            //bei Sonne 100-cloud_val
                            value
                        ]
                    );
                }
                //console.log("date " + JSON.stringify(oDate) + " " + year + "." + month + "." + day + " " + hour + ":" + minute);

            }
        }

        let MinMax = {
            "RainMin": RainMin,
            "RainMax": RainMax,
            "TempMin": TempMin,
            "TempMax": TempMax,
            "CloudMin": 0,
            "CloudMax": 100
        }

        console.log("rainData " + JSON.stringify(rainData));
        console.log("tempData " + JSON.stringify(tempData));
        console.log("cloudData " + JSON.stringify(cloudData));

        //const weatherData = ids.length ? (await this.props.context.socket.getStates(ids)) : {};

        weatherData.push(
            [
                rainData,
                tempData,
                cloudData,
                MinMax
            ]
        );

        return weatherData;
    }




    renderWidgetBody(props) {
        super.renderWidgetBody(props);

        //console.log("values" + JSON.stringify(this.state.values));
        //console.log("rxData " + JSON.stringify(this.state.rxData));

        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight/2;
        }

        let useSecondDiagram;
        if ((this.state.rxData['rain_visible'] && this.state.rxData['rain_show_separate'])
            || (this.state.rxData['clouds_visible'] && this.state.rxData['clouds_show_separate'])) {
            useSecondDiagram = true;

        }

        console.log("size " + size + " " + useSecondDiagram);


        //todo zweites diagramm nur wenn notwendig
        const content = <div
            ref={this.refCardContent}
            className={this.props.classes.cardContent}
        >



            {size && <EchartContainer
                option={this.getOption1()}
                theme={this.props.themeType === 'dark' ? 'dark' : ''}
                style={{ height: `${size}px`, width: '100%' }}
                opts={{ renderer: 'svg' }}
            />}

            {useSecondDiagram && size && <EchartContainer
                option={this.getOption2()}
                theme={this.props.themeType === 'dark' ? 'dark' : ''}
                style={{ height: `${size}px`, width: '100%' }}
                opts={{ renderer: 'svg' }}
            />}

        </div>;

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("content only ");
            return content;
        }

        const wrapcontent = this.wrapContent(content, null, { textAlign: 'center' });
        console.log("wrap content ");

        return wrapcontent;
    }
}

WeatherWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default withStyles(styles)(withTheme(WeatherWidget));
