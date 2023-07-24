# <abbrev title='Washington State Department of Transportation'>WSDOT</abbrev> Milepost Map repository

This is the repository for the WSDOT Milepost map, an interactive map application for locating Mileposts along Washington's State Routes. See this [story map] for an introduction to the WSDOT <abbrev title='Linear Referencing System'>LRS</abbrev>.

Recommended development environment is [Visual Studio Code] or [VSCodium]

The code is a "monorepo" utilizing [NPM workspaces].

* The application code is in the `packages/arcgis-mp` folder, written with the [ArcGIS Maps SDK for JavaScript].
* Code that is not specific to ArcGIS is in the `packages/common` workspace. Keeping it separate will make it easier to switch to a different mapping library if that becomes necessary.

[ArcGIS Maps SDK for JavaScript]:https://developers.arcgis.com/javascript
[story map]:https://storymaps.arcgis.com/stories/3563e01d91b8444f875af320564fef7b
[NPM Workspaces]:https://docs.npmjs.com/cli/using-npm/workspaces/
[Visual Studio Code]:https://code.visualstudio.com/
[VSCodium]:https://vscodium.com/
