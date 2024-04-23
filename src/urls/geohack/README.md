# GeoHack URLs

An excerpt from the [GeoHack documentation](https://www.mediawiki.org/wiki/GeoHack). Some of the info is specific to MediaWiki and is not relevant for our purposes.

> ## Query
>
> ### language
>
> The requested language version (e.g., `_language_.wikipedia.org`), falls back to English if the template page does not exist.
>
> ### pagename
>
> The full title of the referring article. If not supplied, GeoHack will attempt to read the values from the [HTTP referer](https://en.wikipedia.org/wiki/HTTP_referer "w:HTTP referer").
>
> ### params
>
> Coordinates, optionally followed by other location-related parameters (underscore-separated, in a `key:value` fomat). Example: `1.292836_N_103.856878_E_type:landmark_dim:500`
>
> The coordinates are in one of the formats `D_M_S_N_D_M_S_E`, `D_M_N_D_M_E`, `D_N_D_E`, or `D;D` where `D` is degrees, `M` is minutes, `S` is seconds, and `NS/EWO` are the directions. Decimal numbers are accepted, especially for the last position.
>
> _TODO Document me_: boxed range syntax `D_N_D_E_to_D_N_D_E`
>
> Restrictions:
>
> - Should be compatible with MediaWiki titles: a 255 byte length limit, `< > [ ] |` are invalid, and spaces and underscore are treated the same.
> - `&` causes problems if it not percent encoded in the URL.
> - Avoid non-ASCII characters, as some browsers incorrectly handle copying and pasting.
> - Avoid the equal sign (=) since it causes issues with unnamed template parameters (e.g., {{[Coord](https://en.wikipedia.org/wiki/en:Template:Coord "w:en:Template:Coord")}})
> - The characters `& < > "` are escaped in the HTML to prevent exploits.
>
> #### default
>
> Default scale: for use in templates, is overridden by `dim:`, `scale:`, `type:` parameters.
>
> #### dim
>
> The size of the object in meters.
>
> ...

<!-- // We're always going to be using Earth.
> #### globe
>
> Specify a different globe, defaults to Earth. The Argument value is used for the subpage name, e.g., globe:moon will load [Template:GeoTemplate/_moon_](https://en.wikipedia.org/wiki/Template:GeoTemplate/moon "w:Template:GeoTemplate/moon").
> -->

> #### page
>
> _(disabled)_ Specify a subpage for map sources.
>
> #### region
>
> _(deprecated)_ The [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166 "w:ISO 3166") code with an optional subdivision to highlight region specific services, see [Section codes](https://www.mediawiki.org/wiki/GeoHack#Nice_URLs#Section_codes) below. If not supplied, GeoHack will attempt to [find the region using the coordinates](https://www.mediawiki.org/w/index.php?title=Toolserver:Tools:~para/region.php&action=edit&redlink=1 "Toolserver:Tools:~para/region.php (page does not exist)").
>
> scale
>
> Set the relative [map scale](<https://en.wikipedia.org/wiki/Scale_(map)> "w:Scale (map)") as 1:_N_. The OGC's "standard rendering pixel size" of 0.28 mm × 0.28 mm (90.7 dpi) is assumed and derived for all size calculations. Since the actual value can vary significantly (e.g. [iPhone 4](https://en.wikipedia.org/wiki/iPhone_4 "w:iPhone 4")) it is recommended to use the display independent **dim:**.
>
> type
>
> The following are types GeoHack recognizes along with the calculated default scale.
>
> **TODO** Provide definitions for each type.
>
> | type:                                          | ratio          | m / pixel | {scale}  | {mmscale} | {span} | {altitude} | {zoom} | {osmzoom} |
> | ---------------------------------------------- | -------------- | --------- | -------- | --------- | ------ | ---------- | ------ | --------- |
> | country, satellite                             | 1 : 10,000,000 | 3528      | 10000000 | 10000000  | 10.0   | 1430       | 1      | 5         |
> | state                                          | 1 : 3,000,000  | 1058      | 3000000  | 4000000   | 3.0    | 429        | 3      | 7         |
> | adm1st                                         | 1 : 1,000,000  | 353       | 1000000  | 1000000   | 1.0    | 143        | 4      | 9         |
> | adm2nd (_default_)                             | 1 : 300,000    | 106       | 300000   | 200000    | 0.3    | 42         | 5      | 11        |
> | adm3rd, city, mountain, isle, river, waterbody | 1 : 100,000    | 35.3      | 100000   | 100000    | 0.1    | 14         | 6      | 12        |
> | event, forest, glacier                         | 1 : 50,000     | 17.6      | 50000    | 50000     | 0.05   | 7          | 7      | 13        |
> | airport                                        | 1 : 30,000     | 10.6      | 30000    | 25000     | 0.03   | 4          | 7      | 14        |
> | camera, edu, pass, landmark, railwaystation    | 1 : 10,000     | 3.53      | 10000    | 10000     | 0.01   | 1          | 8      | 15        |
>
> zoom
>
> _Deprecated_ Provided for compatibility with the Dutch maps.asp software. The scale is calibrated differently (`SCALE = POWER(2, 12 - ZOOM) * 100 000`, roughly equivalent to `{osmzoom}`) and conflicts with the replacement variable `{zoom}`
>
> ### project
>
> Request for a different project. If requesting the OpenStreetMaps (project=osm) page it will retrieve it from a template on meta: [http://meta.wikimedia.org/wiki/Template:GeoTemplate/osm](https://meta.wikimedia.org/wiki/Template:GeoTemplate/osm)
>
> ### title
>
> Set this if the page is not an appropriate title, such as when referring to a location in the article such as a particular curve on a road.
