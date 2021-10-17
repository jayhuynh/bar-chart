import {extractData, roundTo} from "../util/helper";
import ChoroplethMap, {ChoroplethMapData, mapRegionToId} from "../map/ChoroplethMap";
import React, {useEffect, useState} from "react";
import {HorizontalGroup, IconButton, InlineField, Label, RangeSlider, VerticalGroup} from "@grafana/ui";
import {useQuery} from "../../routes/useQuery";
import _ from "lodash";
import {intervalGetRequest, intervalSearchQueryRequest} from "../util/requester";

const Navigator = ({ setPosition, scale, currrentPosition }: any) => {
    return (
        <HorizontalGroup>
            <Label>Navigation: </Label>
            <IconButton
                variant="destructive"
                size={'xxl'}
                onClick={() => {setPosition({
                    ...currrentPosition,
                    y: currrentPosition.y - scale
                })}}
                name={'angle-up'}/>
            <IconButton
                variant="destructive"
                size={'xxl'}
                onClick={() => {setPosition({
                    ...currrentPosition,
                    y: currrentPosition.y + scale
                })}}
                name={'angle-down'}/>
            <IconButton
                variant="destructive"
                size={'xxl'}
                onClick={() => {setPosition({
                    ...currrentPosition,
                    x: currrentPosition.x - scale
                })}}
                name={'angle-left'}/>
            <IconButton
                variant="destructive"
                size={'xxl'}
                onClick={() => {setPosition({
                    ...currrentPosition,
                    x: currrentPosition.x + scale
                })}}
                name={'angle-right'}/>
        </HorizontalGroup>
    );
}

const RegionComponent = ({data , size}: any) => {
    const {queryDictionary} = useQuery();
    const [data, setData] = useState();
    const [mapPosition, setMapPosition] = useState({
        x: 2.0,
        y: 1.4,
    })
    const [legendPosition, setLegendPosition] = useState({
        x: 10,
        y: 0,
    })

    const toMapData = (regions: any[]): ChoroplethMapData[] => {
        const mapData: ChoroplethMapData[] = []
        if (!regions) return [];
        Object.keys(regions).map((key: any) => {
            const id = mapRegionToId(key);
            if (id) {
                mapData.push({
                    id,
                    value: roundTo(regions[key], 2)
                })
            }
        });
        return mapData;
    }

    const getMax = (mapData: ChoroplethMapData[]) => {
        const max = mapData.reduce((a, b) => {
            return Math.max(a, b.value);
        }, 0)
        return max
    }

    useEffect(() => {
        const query = queryDictionary();

        if (!_.isEmpty(query.q)) {
            const interval = intervalSearchQueryRequest(
                query.q as string,
                Number(query.ccFrom),
                Number(query.ccTo),
                setData)

            return () => clearInterval(interval);
        }

        if (!_.isEmpty(query.targetType) && !_.isEmpty(query.targetName)) {
            const interval = intervalGetRequest(
                Number(query.targetType),
                query.targetName as string,
                Number(query.ccFrom),
                Number(query.ccTo),
                setData)

            return () => clearInterval(interval);
        }
    }, [queryDictionary])





    const mapHeight = size.height * 0.85;
    const controlHeight = size.height - mapHeight;

    return (
        <VerticalGroup>
            <div style={{width: size.width, height: controlHeight}}>
                <Navigator
                    scale={0.1}
                    currrentPosition={...mapPosition}
                    setPosition={setMapPosition}/>
            </div>
            <div style={{width: size.width, height: mapHeight}}>
                <ChoroplethMap
                    mapPosition={...mapPosition}
                    legendPosition={...legendPosition}
                    data={toMapData(data?.stat?.region)}
                    max={getMax(toMapData(data?.stat?.region))}/>
            </div>
        </VerticalGroup>
    );
}

export default RegionComponent;
