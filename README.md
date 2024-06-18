# <abbr title='Washington State Department of Transportation'>WSDOT</abbr> Milepost Map repository

<!-- #region badges -->

[![Node.js CI](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml/badge.svg)](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/node.js.yml) [![pages-build-deployment](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/pages/pages-build-deployment) [![CodeQL](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/codeql.yml/badge.svg)](https://github.com/WSDOT-GIS/wsdot-mp-map/actions/workflows/codeql.yml)

<!-- #endregion badges -->

This is the repository for the WSDOT Milepost map, an interactive map application for locating Mileposts along Washington's State Routes. See this [story map] for an introduction to the WSDOT <abbr title='Linear Referencing System'>LRS</abbr>.

Recommended development environment is [Visual Studio Code] or [VSCodium]

Uses [ArcGIS Maps SDK for JavaScript] for map components.

## URL Search Parameters

## Creating Map Links

- Creating a hyperlink to a State Route location is simple. Mimic the url structure for the following link and modify the SR and MP values to your desired location. Example:
  `https://example.com/LocateMP/?SR=542&MP=57.17`
- To create a hyperlink to a route with unique directional milepost data, such as an interstate, use the following url structure. DIR represents direction. The options are I for increasing milepost or D for decreasing milepost.
  `https://example.com/LocateMP/?SR=5&MP=257.70&DIR=I`
- To create a hyperlink to a route with a specific route type, such as a "SPUR", use the following url structure. RT represents Route Type. The options are SP for Spur, CO for Couplet and AR for Alternate.
  `https://example.com/LocateMP/?SR=503&MP=35.23&RT=SP`

[ArcGIS Maps SDK for JavaScript]: https://developers.arcgis.com/javascript
[story map]: https://storymaps.arcgis.com/stories/3563e01d91b8444f875af320564fef7b
[Visual Studio Code]: https://code.visualstudio.com/
[VSCodium]: https://vscodium.com/
