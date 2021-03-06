import {ResponsiveChoropleth} from '@nivo/geo'
import country from "./usmap.json";
import customTheme from "../theme";
import React from "react";

export interface ChoroplethMapData {
    id: string;
    value: number
}

export interface ChoroplethMapProps {
    data: ChoroplethMapData[];
    max: number;
    mapPosition: {
        x: number;
        y: number;
    };
    legendPosition: {
        x: number;
        y: number;
    };
}

export const mapRegionToId = (region: string) => {
    const features: any[] = country.features;
    for (let record of features) {
        const condition = region
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(record?.properties?.name
                .toLowerCase()
                .replace(/\s/g, "")) ||
            record?.properties?.name
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(region
                    .toLowerCase()
                    .replace(/\s/g, ""))

        if (condition) return record?.id;
    }
    return null;
}

const ChoroplethMap = ({data, max, mapPosition, legendPosition}: ChoroplethMapProps) => {
    return (
        <ResponsiveChoropleth
            data={data}
            features={country.features}
            margin={{top: 0, right: 0, bottom: 0, left: 0}}
            colors="blues"
            domain={[0, max]}
            unknownColor="#AAAEB0"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={600}
            projectionTranslation={[mapPosition.x, mapPosition.y]}
            projectionRotation={[0, 0, 0]}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            theme={customTheme.themeConfig}
            onClick={(feature, event) => {
                console.log(feature);
                console.log(event);
            }}
            legends={[
                {
                    anchor: 'bottom-left',
                    direction: 'column',
                    justify: true,
                    translateX: legendPosition.x,
                    translateY: legendPosition.y,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemTextColor: 'white',
                    itemBackground: '#42637F',
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#FFC400',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
}

export default ChoroplethMap;
