import { ResponsiveChoropleth } from '@nivo/geo'
import country from "./usmap.json";
import customTheme from "../theme";
import React from "react";

export interface ChoroplethMapData {
    id: string;
    value: number
}

export interface ChoroplethMapProps {
    data: ChoroplethMapData[];
}

const ChoroplethMap = ({ data }: ChoroplethMapProps) => {
    return (
        <ResponsiveChoropleth
            data={data}
            features={country.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="blues"
            domain={[0, 1000000]}
            unknownColor="#AAAEB0"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={800}
            projectionTranslation={[1.95, 1.4]}
            projectionRotation={[0, 0, 0]}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            theme={customTheme.themeConfig}
            onClick={(feature, event) => { console.log(feature); console.log(event); }}
            legends={[
                {
                    anchor: 'bottom-left',
                    direction: 'column',
                    justify: true,
                    translateX: 20,
                    translateY: -100,
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