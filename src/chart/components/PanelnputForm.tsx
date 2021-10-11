import React, {useEffect, useState} from "react";
import {
    VerticalGroup,
    HorizontalGroup,
    Select,
    AsyncSelect,
    RangeSlider,
    InlineField,
    Alert,
} from "@grafana/ui";
import {SelectableValue} from "@grafana/data";
import {
    getFundingEntity,
    getParty,
    intervalGetRequest,
    REQUEST_INTERVAL,
    searchFundingEntities
} from "../util/requester";
import _ from 'lodash';
import {useNavigate} from "../../routes/useNavigate";
import {numberWithCommas} from "../util/helper";

const PanelnputForm = ({width}: any) => {
    const {replace, mergeQuery} = useNavigate();

    const targetTypeOptions = [
        {label: 'Party', value: 0},
        {label: 'FundingEntity', value: 1},
    ];

    const targetNamePartiesOptions = [
        {label: 'All', value: 'all'},
        {label: 'Republican', value: 'Republican'},
        {label: 'Democratic', value: 'Democratic'},
        {label: 'Other', value: 'Other'},
    ];

    const monthRange = {
        max: 12,
        step: 1,
        min: 1
    }

    const [targetType, setTargetType] = useState<SelectableValue<number>>(targetTypeOptions[0]);
    const [targetName, setTargetName] = useState<SelectableValue<string>>(targetNamePartiesOptions[0]);
    const [monthSlider, setMonthSlider] = useState([1, 12]);
    const [data, setData] = useState<any>({});

    const loadFundingEntityOption = (query: string) => {
        return new Promise<Array<SelectableValue<string>>>((resolve) => {
            (async () => {
                const result: any[] = (await searchFundingEntities(query)).data;
                const opts = result.map((v) => {
                    return {
                        label: `${v._source.funding_entity} (${v._source.party})`,
                        value: v._id
                    }
                })
                resolve(opts);
            })();
        })
    }

    const updateMonthSlider = (values: number[]) => {
        setMonthSlider(values);
    }

    useEffect(() => {
        replace(undefined, mergeQuery({
            targetType: targetType.value,
            targetName: targetName.value,
            ccFrom: monthSlider[0],
            ccTo: monthSlider[1],
        }))

        const interval = intervalGetRequest(
            targetType.value || 0,
            targetName.value || 'all',
            monthSlider[0],
            monthSlider[1],
            setData)

        return () => clearInterval(interval);
    }, [targetType, targetName, monthSlider])

    return (
        <VerticalGroup spacing={'lg'}>
            <div style={{width: width * 0.75}}>
                <InlineField label={'Month range'} grow>
                    <RangeSlider
                        step={monthRange.step}
                        onChange={updateMonthSlider}
                        value={monthSlider}
                        min={monthRange.min}
                        max={monthRange.max}/>
                </InlineField>
            </div>
            <HorizontalGroup>
                <div style={{width: width * 0.25}}>
                    <InlineField label={'Target type'} grow>
                        <Select
                            options={targetTypeOptions}
                            menuShouldPortal={true}
                            value={targetType}
                            onChange={(v) => {
                                setTargetType(v)
                            }}
                        />
                    </InlineField>
                </div>
                <div style={{width: width * 0.5}}>
                    <InlineField grow label={'Target name'}>
                        {targetType.value === 0 ? <Select
                            options={targetNamePartiesOptions}
                            menuShouldPortal={true}
                            value={targetName}
                            onChange={(v) => {
                                setTargetName(v)
                            }}
                        /> : <AsyncSelect
                            loadOptions={loadFundingEntityOption}
                            menuShouldPortal={true}
                            value={targetName}
                            onChange={(v) => {
                                setTargetName(v)
                            }}
                        />}
                    </InlineField>
                </div>
            </HorizontalGroup>
            <div style={{width: width * 0.75}}>
                <Alert
                    severity="info"
                    title={'Overview information'}>
                    <VerticalGroup spacing="lg">
                        <div>
                            Total ads: <h3>{numberWithCommas(_.get(data, 'stat.ads', 0))}</h3>
                        </div>
                        <div>
                            Total spend: <h3>{numberWithCommas(_.get(data, 'stat.spend', 0))} $</h3>
                        </div>
                        <div>
                            Total impession: <h3>{numberWithCommas(_.get(data, 'stat.impression', 0))}</h3>
                        </div>
                    </VerticalGroup>
                </Alert>
            </div>
        </VerticalGroup>
    );
}


export default PanelnputForm
