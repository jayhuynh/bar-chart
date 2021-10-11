import {ResponsiveBarCanvas, ResponsiveBar} from '@nivo/bar'
import customTheme from "../theme";
import React from "react";
import {ResponsiveContainer} from "recharts";


export interface BarNivoProps {
    data: any[];
    props: {
        indexBy: string;
        keys: string[];
        groupMode?: 'stacked' | 'grouped';
        colors?: any;
    }
    labelX: string;
    labelY: string;
}

const BarNivo = ({data, props, labelX, labelY}: BarNivoProps) => {
    return (
        <ResponsiveBar
            data={data}
            margin={{top: 50, right: 130, bottom: 50, left: 60}}
            padding={0.2}
            valueScale={{type: 'linear'}}
            indexScale={{type: 'band', round: true}}
            valueFormat={''}
            colors={{scheme: 'nivo'}}
            borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
            axisTop={undefined}
            axisRight={undefined}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: labelX,
                legendPosition: 'middle',
                legendOffset: 40
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: labelY,
                legendPosition: 'middle',
                legendOffset: -50
            }}
            labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
            theme={customTheme.themeConfig}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 30,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 23,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            {...props}
        />
    );
}

export default BarNivo;
