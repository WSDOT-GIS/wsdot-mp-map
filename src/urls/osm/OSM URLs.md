# OpenStreetMap URLs

See <https://wiki.openstreetmap.org/wiki/Browsing#Sharing_a_link_to_the_maps>

> ## Other URL tricks
>
> Note that some URL parameters may not be supported long term. We offer no guarantees.
>
> The URL is constructed like this:
>
> `http[s]://www.openstreetmap.org
[/node|way|relation/<number>[/history[#<version>]]]
/?
[&mlat=<latitude>&mlon=<longitude>]
[#map=<zoom level>/<latitude>/<longitude>]
[&bbox=<min longitude>,<min latitude>,<max longitude>,<max latitude>]
[&layers=<layer code>]`
>
> - The parameters `mlat` and `mlon` are used to indicate the position of the red marker. Please note that your marker may be outside the shown map part.
> - The `layers` URL parameter takes a special Layer Code representing your layer selection. The parameter is optional and if you leave it out, we will default to showing our "standard" map style. See [Layer URL parameter] for more information.
>
> ## Layer code structure
>
> \[From [Layer URL parameter]\]
>
> The layer code currently works as follows:
>
> | Code           |                  |                       |
> | -------------- | ---------------- | --------------------- |
> | No suffix or M |                  | [Standard tile layer] |
> | C              | Cyclemap         | [Cycle Map]           |
> | Y              | CyclOSM          | [CyclOSM]             |
> | H              | Humanitarian     | [Humanitarian]        |
> | O              | ÖPNVKarte        | [ÖPNVKarte]           |
> | P              | Tracestrack Topo | [Tracestrack]         |
> | T              | Transport Map    | [Transport Map]       |
>
> Additionally...
>
> - N = Notes - Enables the [Notes](https://wiki.openstreetmap.org/wiki/Notes "Notes") overlay (this is as an alternative to adding notes=yes in the URL)
> - D = Data - Enables the [Data layer](https://wiki.openstreetmap.org/wiki/Data_layer "Data layer") overlay
>   Because these are optional overlays they can be combined e.g. `layers=CND` means show the Cyclemap with Notes and Data overlays added.

[Layer URL parameter]: https://wiki.openstreetmap.org/wiki/Layer_URL_parameter
[Standard tile layer]: https://wiki.openstreetmap.org/wiki/Standard_tile_layer
[CyclOSM]: https://wiki.openstreetmap.org/wiki/CyclOSM
[Cycle Map]: https://wiki.openstreetmap.org/wiki/OpenCycleMap
[Transport Map]: https://wiki.openstreetmap.org/wiki/Transport_Map
[Tracestrack]: https://wiki.openstreetmap.org/wiki/Tracestrack
[ÖPNVKarte]: https://wiki.openstreetmap.org/wiki/%C3%96PNVKarte
[Humanitarian]: https://wiki.openstreetmap.org/wiki/Humanitarian
