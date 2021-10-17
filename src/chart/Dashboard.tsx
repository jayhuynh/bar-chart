import ChoroplethMap, {ChoroplethMapData, mapRegionToId} from "./map/ChoroplethMap";
import PieNivo, {PieNivoData} from "./pie/PieNivo";
import BarNivo from "./bar/BarNivo";
import customTheme from "./theme";
import CombinationReChart from "./combination/CombinationReChart";
import React from "react";
import {extractData, getMonthLabel, roundTo} from "./util/helper";
import {HorizontalGroup} from "@grafana/ui";
import PanelnputForm from "./components/PanelnputForm";
import DemographicComponent from "./components/DemographicComponent";
import RegionComponent from "./components/RegionComponent";
import CombinationComponent from "./components/CombinationComponent";
import SearchPanel from "./search/SearchPanel";
import CombinationSearchComponent from "./search/CombinationSearchComponent";

const partiesDistributionComponent = (data: any, size: any) => {
    const extracted = extractData(data);
    const total = extracted.Republican.stat.ads + extracted.Democratic.stat.ads + extracted.Other.stat.ads
    const pieData: PieNivoData[] = [
        {
            "id": "Republican",
            "label": "Republican",
            "value": roundTo((extracted.Republican.stat.ads / total) * 100, 2),
            "color": customTheme.customColor.red
        },
        {
            "id": "Democratic",
            "label": "Democratic",
            "value": roundTo((extracted.Democratic.stat.ads / total) * 100, 2),
            "color": customTheme.customColor.blue
        },
        {
            "id": "Other",
            "label": "Other",
            "value": roundTo((extracted.Other.stat.ads / total) * 100, 2),
            "color": customTheme.customColor.yellow
        }
    ];

    const pieWidth = size.width * 0.5;

    return (
        <>
            <HorizontalGroup>
                <div style={{width: pieWidth, height: size.height}}>
                    <PieNivo data={pieData} props={{
                        colors: (pie: any) => pie.data.color,
                    }}/>
                </div>
                <PanelnputForm width={size.width - pieWidth}/>
            </HorizontalGroup>
        </>
    );
}

export const Dashboard = (props: any) => {
    const {chartType, data, size} = props;

    switch (chartType) {
        case 'party_dis':
            return partiesDistributionComponent(data, size);
        case 'demo_dis':
            return <DemographicComponent/>;
        case 'region_map':
            return <RegionComponent data={data} size={size}/>;
        case 'combine_dis':
            return <CombinationComponent data={data} size={size} />;
        case 'combine_search':
            return <CombinationSearchComponent data={data} size={size} />;
        case 'search_panel':
            return <SearchPanel size={size} />;
        default:
            return <></>;
    }
}
