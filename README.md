# WSDOT Milepost Map App

[![Node.js CI](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml/badge.svg)](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml)

## Goals

- UI needs to be simple. Similar features in Geoportal are more complicated to use due to Geoportal's other features.

## Required Features

### Location

- [x] Click on map and get SR & SRMP
- [ ] Search: Get location by inputting SR and SRMP
- [x] Popup contains [GeoURI].
- [ ] Generate link to SR, SRMP location. Link will open this app at that location.

#### Required info for each location

- [x] State Route ID
- [x] Milepost (SRMP)
- [x] Is route Increase or Decrease?
- [x] Lat./Long.
- [ ] Which **\_\_** is the point in?
  - [ ] County
  - [ ] Township
  - [ ] Range

[GeoURI]: https://geouri.org/
