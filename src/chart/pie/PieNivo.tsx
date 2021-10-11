import { ResponsivePie } from '@nivo/pie';
import React from "react";


export interface PieNivoData {
    id: string;
    label: string;
    value: number;
    color: string;
}

export interface PieNivoProps {
    data: PieNivoData[];
    props?: {
        colors?: any
    }
}


const PieNivo = ({ data, props }: PieNivoProps) => {
    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
            sortByValue={true}
            innerRadius={0.05}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextOffset={10}
            arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
            arcLinkLabelsDiagonalLength={21}
            arcLinkLabelsThickness={5}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#333333"
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 150,
                    itemsSpacing: 2,
                    itemWidth: 60,
                    itemHeight: 14,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 14,
                    symbolShape: 'circle'
                }
            ]}
            { ...props }
        />
    );
}

export default PieNivo;
