# <abbrev title='Washington State Department of Transportation'>WSDOT</abbrev> Milepost Map repository

[![Node.js CI](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml/badge.svg)](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml) [![pages-build-deployment](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/pages/pages-build-deployment) [![CodeQL](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/codeql.yml/badge.svg)](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/codeql.yml)

This is the repository for the WSDOT Milepost map, an interactive map application for locating Mileposts along Washington's State Routes. See this [story map] for an introduction to the WSDOT <abbrev title='Linear Referencing System'>LRS</abbrev>.

Recommended development environment is [Visual Studio Code] or [VSCodium]

- Code that is not specific to the [ArcGIS Maps SDK for JavaScript] is in the `src/common` workspace. Keeping it separate will make it easier to switch to a different mapping library if that becomes necessary.

[ArcGIS Maps SDK for JavaScript]: https://developers.arcgis.com/javascript
[story map]: https://storymaps.arcgis.com/stories/3563e01d91b8444f875af320564fef7b
[Visual Studio Code]: https://code.visualstudio.com/
[VSCodium]: https://vscodium.com/
