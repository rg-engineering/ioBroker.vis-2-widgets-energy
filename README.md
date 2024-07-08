![Logo](admin/vis-2-widgets-weather.png)
# ioBroker.vis-2-widgets-weather



![Number of Installations](http://iobroker.live/badges/vis-2-widgets-weather-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-2-widgets-weather-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-weather.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-weather)
[![NPM version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-weather.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-weather)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.vis-2-widgets-weather/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.vis-2-widgets-weather)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.vis-2-widgets-weather/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-weather.png?downloads=true)](https://nodei.co/npm/iobroker.vis-2-widgets-weather/)

![node-lts](https://img.shields.io/node/v-lts/iobroker.vis-2-widgets-weather?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.vis-2-widgets-weather?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.vis-2-widgets-weather?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.vis-2-widgets-weather?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.vis-2-widgets-weather?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.vis-2-widgets-weather?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/rg-engineering/ioBroker.vis-2-widgets-weather?logo=github&style=flat-square)


**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC) 

This vis-2-widget shows weather forecast data from DasWetter.com or weatherunderground.
You need DasWetter-Adapter or weatherunderground-Adapter running on your system.

## weather
![widget_weather.PNG](./doc/widget_weather.PNG)

* OID's are automatically set based on general settings
* x axis labels can be configured according [momentjs docu](http://momentjs.com/docs/#/displaying/format/) 

## weather day
![widget_weather_day.PNG](./doc/widget_weather_day.PNG)


* OID's are automatically set based on general settings
* icon set's are changeable

## general chart

![widget_general_chart.PNG](./doc/widget_general_chart.PNG)



### input data for general chart

* "OID data serie" should point to data point like "sbfspot.0.xxxxxxxx.history.years"
* data point should contain key / value pairs like

> [{"year":"2008","value":7000},{"year":"2009","value":2309000},{"year":"2010","value":4445000},{"year":"2011","value":7019000},{"year":"2012","value":9371000},{"year":"2013","value":11393000},{"year":"2014","value":13666000},{"year":"2015","value":16034000},{"year":"2016","value":17826790}]

* it's possible to auto calculate and show differences of values. Just tick "difference calculation" in settings.

* it supports adapter sbfspot and ebus: just select instance and basic adjustments are done automitcally

<!--
    ### **WORK IN PROGRESS**
-->
## Changelog

 ### **WORK IN PROGRESS**
 * (René) Heating Rooms Overview widget completed
 * (René) Heating Windows Status Overview widget completed
 * (René) Heating Room widget completed

### 0.3.2 (2024-06-30)
* (René) Heating General Params widget added
* (René) Heating Room widget adde
* (René) Heating Rooms Overview widget added
* (René) Heating Room Profile Params widget added
* (René) Heating Windows Status Overview widget added

### 0.3.1 (2024-06-08)
* (René) translations

### 0.3.0 (2024-06-08)
* (René) Heating TimeSchedule widget added

### 0.2.10 (2024-05-24)
* (René) general diagram widget: support ebus (needs ebus version 3.3.0)
* (René) general diagram widget: auto unit calculation as an option

### 0.2.9 (2024-05-23)
* (René) general diagram widget: x axis label format adjustable
* (René) general diagram widget: support sbfspot (needs sbfspot version 4.3.1)

### 0.2.8 (2024-05-19)
* (René) X axis label format adjustable

### 0.2.7 (2024-05-19)
* (René) adaption for weatherunderground
* (René) bug fix: show legend in graph again, was missing after translations
* (René) smaller bug fixes
* (René) dependencies updated

### 0.2.4 (2024-05-04)
* (René) ready for first deployment

### 0.2.1 (2024-05-01)
* (René) translations and icons

### 0.2.0 (2024-04-26)
* (René) initial release

## License
The MIT License (MIT)

Copyright (c) 2024 rg-engineering <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.