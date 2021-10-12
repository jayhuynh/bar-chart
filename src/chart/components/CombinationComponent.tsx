import {extractData, getMonthLabel} from "../util/helper";
import CombinationReChart from "../combination/CombinationReChart";
import customTheme from "../theme";
import React, {useEffect, useState} from "react";
import {
    HorizontalGroup,
    InlineField,
    RangeSlider,
    Form,
    FieldArray,
    ColorPicker,
    Button,
    Input,
    Field,
    IconButton,
    VerticalGroup, Select, AsyncSelect
} from "@grafana/ui";
import _ from "lodash";
import {SelectableValue} from "@grafana/data";
import {getParty, getTarget, searchFundingEntities} from "../util/requester";

const CombinationComponent = ({data, size}: any) => {
    const monthRange = {
        max: 12,
        step: 1,
        min: 1
    }
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

    const [monthSlider, setMonthSlider] = useState([1, 12]);
    const [combinationChartData, setCombinationChartData] = useState({
        data: [] as any[],
        category: [] as any[],
    });
    const defaultValues: any = {
        target: [
            {
                targetType: {label: 'Party', value: 0},
                targetName: {label: 'Democratic', value: 'Democratic'},
                color: customTheme.customColor.blue
            },
            {
                targetType: {label: 'Party', value: 0},
                targetName: {label: 'Republican', value: 'Republican'},
                color: customTheme.customColor.red
            },
            {
                targetType: {label: 'Party', value: 0},
                targetName: {label: 'Other', value: 'Other'},
                color: customTheme.customColor.yellow
            },
        ],
    };

    const chartWidth = size.width * 0.7;
    const panelWidth = size.width - chartWidth;

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

    const loadNewData = async (values: any) => {
        const result = await Promise.all(values.target.map(async (val) => {
            return {
                ...await getTarget(val.targetType.value, val.targetName.value, monthSlider[0], monthSlider[1]),
                color: val.color,
            }
        }));

        const tempData: any[] = [];
        const tempLabel: any[] = [];

        result.map((target: any) => {
            tempLabel.push({
                label: target.name as string,
                color: target.color,
            })
        })

        for (let i = monthSlider[0] - 1; i < monthSlider[1]; i += 1) {
            const newRecord: any = {
                month: getMonthLabel(i),
            }
            result.map((target: any) => {
                newRecord[target.name as string] = {
                    ...target.timeLine[i]
                }
            })
            tempData.push(newRecord);
        }
        setCombinationChartData({
            data: tempData,
            category: tempLabel,
        })
    }

    useEffect(() => {
        (async () => {
            const combination = [];

            for (let i = 0; i < 12; i += 1) {
                combination.push({
                    month: getMonthLabel(i),
                    Democratic: (await getParty('Democratic', 1, 12)).data.timeLine[i],
                    Republican: (await getParty('Republican', 1, 12)).data.timeLine[i],
                    Other: (await getParty('Other', 1, 12)).data.timeLine[i],
                });
            }

            const category = [
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
            ];

            setCombinationChartData({
                data: combination,
                category: category,
            })
        })()
    }, [])

    return (
        <>
            <HorizontalGroup>
                <div style={{width: chartWidth, height: size.height}}>
                    <CombinationReChart data={combinationChartData.data}
                                        category={combinationChartData.category}
                                        x={'month'}
                                        leftY={'ads'} rightY={'spend'}/>
                </div>
                <div style={{width: panelWidth, height: size.height}}>
                    <VerticalGroup
                        justify={"flex-start"}
                        align={"center"}
                        spacing={'lg'}>
                        <div style={{width: panelWidth * 0.9}}>
                            <InlineField label={'Month range'} grow>
                                <RangeSlider
                                    step={monthRange.step}
                                    onChange={(values: number[]) => {
                                        setMonthSlider(values);
                                    }}
                                    value={monthSlider}
                                    min={monthRange.min}
                                    max={monthRange.max}/>
                            </InlineField>
                        </div>
                        <div style={{width: panelWidth * 0.9}}>
                            <Form onSubmit={loadNewData} defaultValues={defaultValues}>
                                {({control, register, watch, setValue}) => (
                                    <div>
                                        <FieldArray control={control} name="target">
                                            {({fields, append, remove}) => (
                                                <>
                                                    <div style={{marginBottom: '1rem'}}>
                                                        <VerticalGroup spacing={"lg"}>
                                                            {fields.map((field, index) => (
                                                                <HorizontalGroup key={field.id}>
                                                                    <ColorPicker
                                                                        key={field.id}
                                                                        color={((): string => {
                                                                            register(`target.${index}.color` as const);
                                                                            return watch(`target.${index}.color` as const);
                                                                        })()}
                                                                        onChange={(color) => {
                                                                            setValue(`target.${index}.color` as const, color)
                                                                        }}
                                                                    />
                                                                    <Field label={'Type'}>
                                                                        <Select
                                                                            key={field.id}
                                                                            options={targetTypeOptions}
                                                                            menuShouldPortal={true}
                                                                            value={(() => {
                                                                                register(`target.${index}.targetType` as const);
                                                                                return watch(`target.${index}.targetType` as const);
                                                                            })()}
                                                                            onChange={(v) => {
                                                                                setValue(`target.${index}.targetType` as const, v)
                                                                            }}
                                                                        />
                                                                    </Field>
                                                                    <Field label={'Name'}>
                                                                        {watch(`target.${index}.targetType` as const).value === 0 ?
                                                                            <Select
                                                                                options={targetNamePartiesOptions}
                                                                                menuShouldPortal={true}
                                                                                value={(() => {
                                                                                    register(`target.${index}.targetName` as const);
                                                                                    return watch(`target.${index}.targetName` as const);
                                                                                })()}
                                                                                onChange={(v) => {
                                                                                    setValue(`target.${index}.targetName` as const, v)
                                                                                }}
                                                                            /> : <AsyncSelect
                                                                                loadOptions={loadFundingEntityOption}
                                                                                menuShouldPortal={true}
                                                                                value={(() => {
                                                                                    register(`target.${index}.targetName` as const);
                                                                                    return watch(`target.${index}.targetName` as const);
                                                                                })()}
                                                                                onChange={(v) => {
                                                                                    setValue(`target.${index}.targetName` as const, v)
                                                                                }}
                                                                            />}
                                                                    </Field>
                                                                    <IconButton
                                                                        size="lg"
                                                                        onClick={() => {
                                                                            remove(index);
                                                                        }}
                                                                        variant="destructive"
                                                                        name="times"/>
                                                                </HorizontalGroup>
                                                            ))}
                                                        </VerticalGroup>
                                                    </div>
                                                    <Button
                                                        style={{marginRight: '1rem'}}
                                                        onClick={() => append({
                                                            targetType: {},
                                                            targetName: {},
                                                            color: ''
                                                        })}
                                                    >
                                                        Add another
                                                    </Button>
                                                </>
                                            )}
                                        </FieldArray>
                                        <Button type="submit">Submit</Button>
                                    </div>
                                )}
                            </Form>
                        </div>
                    </VerticalGroup>
                </div>


            </HorizontalGroup>
        </>
    );
}

export default CombinationComponent;
