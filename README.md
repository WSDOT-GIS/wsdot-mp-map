# [WSDOT] Milepost Map App

:world_map: **[Try on Github Pages](https://wsdot-gis.github.io/wsdot-mp-map/)**

Allows users to locate mileposts in two ways:

* Click on map to get the nearest milepost on a route.
* Enter a route ID and milepost to place it on the map.

Please refer to [LRS Storymap] for an explanation of the WSDOT LRS and milepost system.

## Project Status

The badges in the table indicate the status of various tasks related to this project.

| Type   | Status                                                                                                            |
|--------|-------------------------------------------------------------------------------------------------------------------|
| CI     | [![badge][Node.js CI svg]][Node.js CI Workflow] [![pages-build-deployment][gh-pages-badge]][gh-pages-deployment]  |
| Issues | [![issues][issues badge]][issues] [![enhancements][enhancements badge]][enhancements] [![bugs][bugs badge]][bugs] |

[Node.js CI svg]:https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml/badge.svg
[Node.js CI Workflow]:https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml

[issues badge]:https://img.shields.io/github/issues/WSDOT-GIS/wsdot-mp-map?logo=github&label=all+issues
[issues]:https://github.com/WSDOT-GIS/wsdot-mp-map/issues

[enhancements badge]:https://img.shields.io/github/issues/WSDOT-GIS/wsdot-mp-map/enhancement?logo=github
[enhancements]:https://github.com/WSDOT-GIS/wsdot-mp-map/issues?q=label:enhancement

[bugs badge]:https://img.shields.io/github/issues/WSDOT-GIS/wsdot-mp-map/bug?logo=github
[bugs]:https://github.com/WSDOT-GIS/wsdot-mp-map/issues?q=label:bug

[gh-pages-badge]:https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages
[gh-pages-deployment]:https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/pages/pages-build-deployment

## Design Goals

* UI needs to be simple. Similar features in [Geoportal] are more complicated to use due to Geoportal's other features.

## References

| Name      | Description                                                                                                                                                                        |
|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Leaflet] | Mapping library used by this app                                                                                                                                                   |
| [GeoURI]  | Used for creating a hyperlink to a set of latitude + longitude coordinates that is used by phones to open the user's default mapping app at those coordinates.                     |
| [GeoHack] | Given a set of coordinates, this site provides numerous links for that location for other mapping websites. Popups will contain URLs to this website for corresponding coordinate. |
| [BEM]     | The Block-Element-Modifier naming convention is used for naming CSS classes in this app.                                                                                           |
| [Vite]    | This project is built with [Vite].                                                                                                                                                 |
| [Vitest]  | This project uses [Vitest] for its unit testing.                                                                                                                                   |

[GeoURI]:https://geouri.org/
[GeoHack]:https://www.mediawiki.org/wiki/GeoHack
[GeoPortal]:https://www.wsdot.wa.gov/data/tools/geoportal/
[BEM]:https://getbem.com/
[Leaflet]:https://leafletjs.com/
[LRS Storymap]:https://storymaps.arcgis.com/stories/3563e01d91b8444f875af320564fef7b
[Vite]:https://vitejs.dev/
[Vitest]:https://vitest.dev/
[WSDOT]:https://wsdot.wa.gov
