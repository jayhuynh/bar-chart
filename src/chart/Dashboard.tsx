import ChoroplethMap, {ChoroplethMapData} from "./map/ChoroplethMap";
import PieNivo, {PieNivoData} from "./pie/PieNivo";
import BarNivo from "./bar/BarNivo";
import customTheme from "./theme";
import CombinationReChart from "./combination/CombinationReChart";
import React from "react";
import {extractData, getMonthLabel, roundTo} from "./util/helper";
import _ from "lodash";

const mapData: ChoroplethMapData[] = [
    {
        "id": "01",
        "value": 685849
    },
    {
        "id": "06",
        "value": 733895
    },
    {
        "id": "12",
        "value": 847004
    },
    {
        "id": "18",
        "value": 229583
    },
    {
        "id": "34",
        "value": 204245
    },
    {
        "id": "42",
        "value": 229544
    },
    {
        "id": "02",
        "value": 40323
    },
    {
        "id": "18",
        "value": 229584
    },
    {
        "id": "49",
        "value": 202234
    },
    {
        "id": "38",
        "value": 229583
    },
    {
        "id": "38",
        "value": 229583
    },
    {
        "id": "28",
        "value": 2029244
    }
];


const fundingEntities: any[] = [
    {
        funding: 'COMMITTEE TO ELECT ELISABETH M MULLINS FOR JUDGE',
        democratic: 0.579561,
    },
    {
        funding: 'A New Way - Dante Swinton For Baltimore City Mayor',
        republican: 0.379561,
    },
    {
        funding: 'A WHOLE LOT OF FOLKS FOR WILMOT COLLINS',
        other: 0.179561,
    },
]

const partiesDistributionComponent = (data: any) => {
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

    return (
        <PieNivo data={pieData} props={{
            colors: (pie: any) => pie.data.color,
        }}/>
    );
}

const demographicDistributionComponent = (data: any) => {
    const demographic = extractData(data).Democratic.stat.demographic;
    const barData = Object.keys(demographic).map((key) => {
        return {
            age: key,
            male: roundTo(demographic[key].male, 2),
            female: roundTo(demographic[key].female, 2),
            unknown: roundTo(demographic[key].unknown, 2),
        };
    });

    return (
        <BarNivo data={barData}
                 props={{
                     keys: ['female', 'male', 'unknown'],
                     groupMode: 'grouped',
                     indexBy: 'age'
                 }}
                 labelY={'Count'}
                 labelX={'Age'}/>
    );
}

const regionMapComponent = (data: any) => {
    return (
        <ChoroplethMap data={mapData}/>
    );
}

const combinationDistributionComponent = (data: any) => {
    const extracted = extractData(data);
    const combination = [];
    console.log(extracted)
    for (let i = 0; i < 12; i += 1) {
        combination.push({
            month: getMonthLabel(i),
            Democratic: extracted.Democratic.timeLine[i],
            Republican: extracted.Republican.timeLine[i],
            Other: extracted.Other.timeLine[i],
        });
    }

    return (
        <CombinationReChart data={combination}
                            category={[
                                {
                                    label: 'Democratic',
                                    color: customTheme.customColor.blue,
                                },
                                {
                                    label: 'Republican',
                                    color: customTheme.customColor.red,
                                },
                                {
                                    label: 'Other',
                                    color: customTheme.customColor.yellow,
                                }
                            ]}
                            x={'month'}
                            leftY={'ads'} rightY={'spend'}/>
    );
}

export const Dashboard = (props: any) => {
    const {chartType, data} = props;

    switch (chartType) {
        case 'party_dis':
            return partiesDistributionComponent(data);
        case 'demo_dis':
            return demographicDistributionComponent(data);
        case 'region_map':
            return regionMapComponent(data);
        case 'combine_dis':
            return combinationDistributionComponent(data);
        default:
            return <></>;
    }
}
