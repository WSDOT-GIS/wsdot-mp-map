import findNearestHar from "./localhost_arcgis_rest_services_Shared_ElcRestSOE_MapServer_exts_ElcRestSoe_Find_20Nearest_20Route_20Locations__Archive [25-02-18 08-32-26].har.json";
import findHar from "./localhost_arcgis_rest_services_Shared_ElcRestSOE_MapServer_exts_ElcRestSoe_Find_20Route_20Locations__Archive [25-02-18 08-32-36].har.json";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

interface ElcGeometry<T extends "Point" | "Polyline" = "Point"> {
	__type: `${T}:#Wsdot.Geometry.Contracts`;
	spatialReference: {
		wkid: number;
	};
}

interface ElcPointGeometry extends ElcGeometry<"Point"> {
	x: number;
	y: number;
}

interface ELCResponse<
	EP extends Required<Pick<Point, "x" | "y">> = Point,
	RG extends Required<Pick<Point, "x" | "y" | "spatialReference">> = Point,
> {
	Angle?: number;
	Arm?: number;
	ArmCalcReturnCode?: number;
	ArmCalcReturnMessage?: string;
	Back?: boolean;
	Decrease?: boolean;
	Distance?: number;
	EventPoint?: EP;
	Id?: number;
	RealignmentDate?: string;
	ReferenceDate?: string;
	ResponseDate?: string;
	Route?: string;
	RouteGeometry?: RG;
	Srmp?: number;
}

const attributeNames = [
	"Angle",
	"Arm",
	"ArmCalcReturnCode",
	"ArmCalcReturnMessage",
	"Back",
	"Decrease",
	"Distance",
	// "EventPoint",
	"Id",
	"RealignmentDate",
	"ReferenceDate",
	"ResponseDate",
	"Route",
	// "RouteGeometry",
	"Srmp",
];

let spatialReference: SpatialReference | undefined;

const reviver: Parameters<typeof JSON.parse>[1] = function (
	this,
	key: string,
	value: unknown,
) {
    if (key === "spatialReference" && (value as __esri.SpatialReferenceProperties).wkid === 2927) {
        console.warn("wkid should not be 2927", this);
    }
	if (key === "spatialReference") {
		spatialReference = new SpatialReference(
			value as __esri.SpatialReferenceProperties,
		);
		return spatialReference;
	}
	if (key === "RouteGeometry") {
		const geometry = new Point(value as ElcPointGeometry);
		return geometry;
	}
	if (key === "EventPoint" && value != null) {
		return new Point(value as ELCResponse["EventPoint"]);
	}
	return value;
};

function isElcResponse(obj: unknown): obj is ELCResponse<Point, Point> {
	console.group(isElcResponse.name, { obj });
	console.log("is not null or undefined", obj != null);
	console.log("is an object", typeof obj === "object");
	console.log(
		"has own 'RouteGeometry'",
		Object.hasOwn(obj as object, "RouteGeometry"),
	);
	return (
		obj != null &&
		typeof obj === "object" &&
		Object.hasOwn(obj, "RouteGeometry")
	);
}

function getResponseJson(har: typeof findHar | typeof findNearestHar) {
	console.group(getResponseJson.name, { har });
	const jsonText = har.log.entries[0].response.content.text;
	console.log("json text", jsonText);
	const output = JSON.parse(jsonText, reviver);
	console.log("parsed json", output);
	console.groupEnd();
	if (Array.isArray(output) && output.every(isElcResponse)) {
		return output;
	}
	throw new TypeError("Response is not an array of ELC responses.");
}

const nearestHarResponse = getResponseJson(findNearestHar)[0];
const harResponse = getResponseJson(findHar)[0];

const {
	RouteGeometry: findNearestPointOnRoute,
	EventPoint: findNearestEventPoint,
} = nearestHarResponse;

console.log({ nearestHarResponse, harResponse });

console.log({ findNearestPointOnRoute, findNearestEventPoint });

const paths = [
	[findNearestEventPoint, findNearestPointOnRoute]
		.map((p) => {
			if (p != null) {
				const { x, y } = p;
				return [x, y];
			}
		})
		.filter((p) => p != null),
];

const polyline = new Polyline({
	paths: paths,
	spatialReference: findNearestPointOnRoute?.spatialReference,
});

const attributes: Omit<ELCResponse, "EventPoint" | "RouteGeometry"> =
	Object.fromEntries(
		Object.entries(nearestHarResponse).filter(([key]) =>
			attributeNames.includes(key),
		),
	);
const nearestGraphic = new Graphic({
	geometry: polyline,
	attributes: attributes,
});

export { nearestGraphic };

console.group("imported from HAR files");
console.log(nearestHarResponse);
console.log(harResponse);
console.groupEnd();
