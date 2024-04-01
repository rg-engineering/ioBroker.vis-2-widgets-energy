import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@mui/styles';

import { Card, CardContent } from '@mui/material';

import ReactEchartsCore from 'echarts-for-react';

import { I18n } from '@iobroker/adapter-react-v5';

import Generic from './Generic';

const styles = () => ({
    cardContent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden',
    },
});


class GeneralEChartWidget extends (Generic) {

    constructor(props) {
        super(props);
        this.refCardContent = React.createRef();
        this.timeSelectorRegistered = false;
        this.timeSelectorRegisterInterval = null;
    }


    static getWidgetInfo() {

       


        return {
            id: 'tplGeneralEChartWidget',                 // Unique widget type ID. Should start with `tpl` followed
            visSet: 'vis-2-widgets-weather',        // Unique ID of widget set

            //visset -> see WeatherWidget
            //visSetLabel: 'vis-2-widgets-weather',   // Widget set translated label (should be defined only in one widget of set)
            //visSetColor: '#cf00ff',                 // Color of widget set. it is enough to set color only in one widget of set
            visName: 'GeneralEChart',                     // Name of widget
            visWidgetLabel: 'vis_2_widgets-generalechart', // Label of widget
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
                            name: 'oid_data',    // name in data structure
                            label: 'widgets_echart_label_oiddata', // translated field label
                            type: 'id',

                            default: '',
                        },
                        {
                            name: 'headline',    // name in data structure
                            label: 'widgets_echart_label_headline', // translated field label
                            type: 'text',

                            default: 'headline',
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
               

            ],
            visPrev: 'widgets/vis-2-test/img/vis-widget-echart.png',
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
        return GeneralEChartWidget.getWidgetInfo();
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
    getOption() {

        
        //todo legende von den einstellungen

        //todo Farbe der Graphen einstellbar

        //todo serien einstellbar
        //todo XAchse einstellbar
        return {
            backgroundColor: 'transparent',
            title: {
                text: 'Wetter'
            },
            tooltip: {},
            legend: {
                data: ['rain', 'temperature', 'cloud']
            },
            xAxis: {
                type: "time",

                axisLabel: {

                    rotate: 45,
                    //formatter:'{dd}.{MM} {hh}:{mm}'
                    formatter: '{ee} {hh}:{mm}'
                }

            },
            yAxis: [
                {
                    position: "left",
                    type: "value",
                    min: 0,
                    max: 30,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                {
                    position: "right",
                    type: "value",
                    min: 0,
                    max: 10,
                    axisLabel: {
                        formatter: '{value} mm'
                    }
                }
            ],
            series: [
                {
                    name: 'rain',
                    type: 'bar',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' mm';
                        }
                    },
                    data: //[5, 20, 36, 10, 10, 20]
                        [["2024-04-30T00:00:00.000Z", 0], ["2024-04-30T03:00:00.000Z", 0], ["2024-04-30T06:00:00.000Z", 0], ["2024-04-30T09:00:00.000Z", 0], ["2024-04-30T12:00:00.000Z", 0], ["2024-04-30T15:00:00.000Z", 0], ["2024-04-30T18:00:00.000Z", 0], ["2024-04-30T21:00:00.000Z", 0], ["2024-04-30T23:00:00.000Z", 0], ["2024-05-01T01:00:00.000Z", 0], ["2024-05-01T02:00:00.000Z", 0], ["2024-05-01T03:00:00.000Z", 0], ["2024-05-01T04:00:00.000Z", 0], ["2024-05-01T05:00:00.000Z", 0], ["2024-05-01T06:00:00.000Z", 0], ["2024-05-01T07:00:00.000Z", 0], ["2024-05-01T00:00:00.000Z", 0], ["2024-05-01T03:00:00.000Z", 0], ["2024-05-01T06:00:00.000Z", 0.2], ["2024-05-01T09:00:00.000Z", 0], ["2024-05-01T12:00:00.000Z", 0], ["2024-05-01T15:00:00.000Z", 0], ["2024-05-01T18:00:00.000Z", 0], ["2024-05-01T21:00:00.000Z", 0], ["2024-05-02T00:00:00.000Z", 0], ["2024-05-02T03:00:00.000Z", 0], ["2024-05-02T06:00:00.000Z", 0], ["2024-05-02T09:00:00.000Z", 0.3], ["2024-05-02T12:00:00.000Z", 0.7], ["2024-05-02T15:00:00.000Z", 0.3], ["2024-05-02T18:00:00.000Z", 0], ["2024-05-02T21:00:00.000Z", 0], ["2024-05-03T00:00:00.000Z", 0.4], ["2024-05-03T03:00:00.000Z", 0], ["2024-05-03T06:00:00.000Z", 0], ["2024-05-03T09:00:00.000Z", 0], ["2024-05-03T12:00:00.000Z", 0], ["2024-05-03T15:00:00.000Z", 0.5], ["2024-05-03T18:00:00.000Z", 0], ["2024-05-03T21:00:00.000Z", 0.8]]
                },
                {
                    name: 'temperature',
                    type: 'line',
                    yAxisIndex: 0,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' °C';
                        }
                    },
                    data:
                        [["2024-04-30T00:00:00.000Z", 13], ["2024-04-30T03:00:00.000Z", 14], ["2024-04-30T06:00:00.000Z", 15], ["2024-04-30T09:00:00.000Z", 18], ["2024-04-30T12:00:00.000Z", 21], ["2024-04-30T15:00:00.000Z", 18], ["2024-04-30T18:00:00.000Z", 15], ["2024-04-30T21:00:00.000Z", 14], ["2024-04-30T23:00:00.000Z", 13], ["2024-05-01T01:00:00.000Z", 12], ["2024-05-01T02:00:00.000Z", 12], ["2024-05-01T03:00:00.000Z", 11], ["2024-05-01T04:00:00.000Z", 10], ["2024-05-01T05:00:00.000Z", 10], ["2024-05-01T06:00:00.000Z", 10], ["2024-05-01T07:00:00.000Z", 12], ["2024-05-01T00:00:00.000Z", 12], ["2024-05-01T03:00:00.000Z", 12], ["2024-05-01T06:00:00.000Z", 11], ["2024-05-01T09:00:00.000Z", 12], ["2024-05-01T12:00:00.000Z", 10], ["2024-05-01T15:00:00.000Z", 11], ["2024-05-01T18:00:00.000Z", 9], ["2024-05-01T21:00:00.000Z", 7], ["2024-05-02T00:00:00.000Z", 6], ["2024-05-02T03:00:00.000Z", 5], ["2024-05-02T06:00:00.000Z", 6], ["2024-05-02T09:00:00.000Z", 9], ["2024-05-02T12:00:00.000Z", 10], ["2024-05-02T15:00:00.000Z", 11], ["2024-05-02T18:00:00.000Z", 8], ["2024-05-02T21:00:00.000Z", 6], ["2024-05-03T00:00:00.000Z", 6], ["2024-05-03T03:00:00.000Z", 5], ["2024-05-03T06:00:00.000Z", 6], ["2024-05-03T09:00:00.000Z", 11], ["2024-05-03T12:00:00.000Z", 12], ["2024-05-03T15:00:00.000Z", 10], ["2024-05-03T18:00:00.000Z", 8], ["2024-05-03T21:00:00.000Z", 8]]
                }
            ]
        };
    }




   

    renderWidgetBody(props) {
        super.renderWidgetBody(props);


        let size;
        if (!this.refCardContent.current) {
            setTimeout(() => this.forceUpdate(), 50);
        } else {
            size = this.refCardContent.current.offsetHeight;
        }

        console.log("echart: size " + size);


        const content = <div
            ref={this.refCardContent}
            className={this.props.classes.cardContent}
        >
            {size && <ReactEchartsCore
                option={this.getOption()}
                theme={this.props.themeType === 'dark' ? 'dark' : ''}
                style={{ height: `${size}px`, width: '100%' }}
                opts={{ renderer: 'svg' }}
            />}
        </div>;

        if (this.state.rxData.noCard || props.widget.usedInWidget) {
            console.log("nur content");
            return content;
        }

        console.log("echart: wrap content");

        return this.wrapContent(content, null, { textAlign: 'center' });
    }
}

GeneralEChartWidget.propTypes = {
    socket: PropTypes.object,
    themeType: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
};

export default withStyles(styles)(withTheme(GeneralEChartWidget));

