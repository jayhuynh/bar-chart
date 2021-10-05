import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, ResponsiveContainer,
    LabelList
} from "recharts";
import customTheme from "../theme";
import React from "react";


export interface CombinationReChart {
    data: any[];
    x: string;
    leftY: string
    rightY: string
    category: {
        label: string
        color: any;
    }[]
}

const CombinationReChart = ({data, x, leftY, rightY, category}: CombinationReChart) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                data={data}
                barCategoryGap={'20%'}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                }}
            >
                <CartesianGrid stroke={customTheme.themeConfig.grid.line.stroke} vertical={false}/>
                <XAxis dataKey={x} scale="band"/>
                <YAxis yAxisId="left" orientation="left" stroke={customTheme.customColor.yellow}/>
                <YAxis yAxisId="right" orientation="right" stroke={customTheme.customColor.pink}/>
                <Tooltip/>
                <Legend/>
                {
                    category.map((cate) => (
                        <Bar yAxisId="left"
                             dataKey={`${cate.label}.${leftY}`}
                             key={`${cate.label}.${leftY}`}
                             fill={cate.color}
                             stackId={'a'}>
                            <LabelList dataKey={`${cate.label}.${leftY}`}
                                       fill={cate.color}
                                       position="top"/>
                        </Bar>
                    ))
                }
                {
                    category.map((cate) => (
                        <Line type="linear"
                              strokeWidth={5}
                              dot={{strokeWidth: 10}}
                              key={`${cate.label}.${rightY}`}
                              yAxisId="right"
                              stroke={cate.color}
                              dataKey={`${cate.label}.${rightY}`}>
                            <LabelList dataKey={`${cate.label}.${rightY}`}
                                       offset={10}
                                       fill={cate.color}
                                       position="top"/>
                        </Line>
                    ))
                }


                {/*<Bar yAxisId="left"*/}
                {/*     dataKey={leftY}*/}
                {/*     stackId={'a'}*/}
                {/*     fill={customTheme.customColor.yellow}>*/}
                {/*    <LabelList dataKey={leftY} fill={customTheme.customColor.yellow} position="top"/>*/}
                {/*</Bar>*/}
                {/*<Line type="linear"*/}
                {/*      strokeWidth={5}*/}
                {/*      dot={{strokeWidth: 10}}*/}
                {/*      yAxisId="right"*/}
                {/*      dataKey="test[0].a"*/}
                {/*      stroke={customTheme.customColor.pink}>*/}
                {/*    <LabelList dataKey={rightY}*/}
                {/*               offset={10}*/}
                {/*               fill={customTheme.customColor.pink}*/}
                {/*               position="top"/>*/}
                {/*</Line>*/}
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default CombinationReChart;

