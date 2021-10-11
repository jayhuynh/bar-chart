import {extractData, roundTo} from "../util/helper";
import ChoroplethMap, {ChoroplethMapData, mapRegionToId} from "../map/ChoroplethMap";
import React from "react";

const RegionComponent = ({data}: any) => {
    const extracted = extractData(data);
    const regions = extracted.Dashboard.stat.region
    const mapData: ChoroplethMapData[] = [];

    Object.keys(regions).map((key: string) => {
        const id = mapRegionToId(key);
        if (id) {
            mapData.push({
                id,
                value: roundTo(regions[key], 2)
            })
        }
    });

    const max = mapData.reduce((a, b) => {
        return Math.max(a, b.value);
    }, 0)

    return (
        <ChoroplethMap data={mapData}/>
    );
}

export default RegionComponent;
