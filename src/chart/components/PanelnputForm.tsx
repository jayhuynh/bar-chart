import React, {useState} from "react";
import {Card,
    VerticalGroup,
    Form,
    Field,
    Input,
    HorizontalGroup,
    Select,
    AsyncSelect,
    RangeSlider,
    InlineField
} from "@grafana/ui";
import {SelectableValue} from "@grafana/data";
import {searchFundingEntities} from "../util/requester";

const PanelnputForm = ({ data, width }: any) => {

    const targetTypeOptions = [
        {label: 'Party', value: 0},
        {label: 'FundingEntity', value: 1},
    ];

    const monthRange = {
        max: 12,
        step: 1,
        min: 1
    }

    const [targetType, setTargetType] = useState<SelectableValue<number>>(targetTypeOptions[0]);
    const [targetName, setTargetName] = useState<SelectableValue<string>>();
    const [monthSlider, setMonthSlider] = useState([1, 12]);

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
        console.log(values)
        setMonthSlider(values);
    }

    return (
        <VerticalGroup spacing={'lg'}>
            <div style={{ width: width*0.75 }}>
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
                <div style={{ width: width*0.25 }}>
                    <InlineField label={'Target type'} grow>
                        <Select
                            options={targetTypeOptions}
                            menuShouldPortal={true}
                            value={targetType}
                            onChange={(v) => {
                                console.log(v)
                                setTargetType(v)
                            }}
                        />
                    </InlineField>
                </div>
                <div style={{ width: width*0.5 }}>
                    <InlineField grow label={'Target name'}>
                        <AsyncSelect
                            loadOptions={loadFundingEntityOption}
                            menuShouldPortal={true}
                            value={targetName}
                            onChange={(v) => {
                                console.log(v)
                                setTargetName(v)
                            }}
                        />
                    </InlineField>
                </div>
            </HorizontalGroup>
        </VerticalGroup>
    );
}


export default PanelnputForm
