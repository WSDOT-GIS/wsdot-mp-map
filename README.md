# WSDOT Milepost Map App

[![Node.js CI](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml/badge.svg)](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml)

## Goals

* UI needs to be simple. Similar features in Geoportal are more complicated to use due to Geoportal's other features.

## Required Features

### Location

* Click on map and get SR & SRMP
* Search: Get location by inputting SR and SRMP
* Generate link to SR, SRMP location. Link will open this app at that location.

#### Required info for each location

* State Route ID
* Milepost (SRMP)
* Is route Increase or Decrease?
* Lat./Long.
* Which ______ is the point in?
  * County
  * Township
  * Range
