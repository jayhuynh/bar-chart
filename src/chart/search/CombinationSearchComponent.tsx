import {getMonthLabel} from "../util/helper";
import CombinationReChart from "../combination/CombinationReChart";
import React, {useEffect, useState} from "react";
import {
    HorizontalGroup,
    InlineField,
    RangeSlider,
    Form,
    FieldArray,
    ColorPicker,
    Button,
    Field,
    IconButton,
    VerticalGroup, Select
} from "@grafana/ui";
import _ from "lodash";
import {getTarget, getTopicList, searchTopic} from "../util/requester";

const CombinationSearchComponent = ({data, size}: any) => {
    const monthRange = {
        max: 12,
        step: 1,
        min: 1
    }

    const [monthSlider, setMonthSlider] = useState([1, 12]);
    const [combinationChartData, setCombinationChartData] = useState({
        data: [] as any[],
        category: [] as any[],
    });
    const [topicList, setTopicList] = useState<any[]>();

    useEffect(() => {
        (async () => {
            const result = await getTopicList();
            setTopicList(result.data.map(topic => ({
                label: topic,
                value: topic,
            })));
        })();
    }, [])

    const defaultValues: any = {
        target: [
        ],
    };


    const chartWidth = size.width * 0.7;
    const panelWidth = size.width - chartWidth;

    const loadNewData = async (values: any) => {
        const result = await Promise.all(values.target.map(async (val) => {
            return {
                ...(await searchTopic(val.topic.value, monthSlider[0], monthSlider[1])).data,
                color: val.color,
            }
        }));

        const tempData: any[] = [];
        const tempLabel: any[] = [];

        result.map((target: any) => {
            tempLabel.push({
                label: target.q as string,
                color: target.color,
            })
        })

        const startIdx = monthSlider[0] - 1;
        const endIdx = monthSlider[1];
        for (let i = startIdx; i < endIdx; i += 1) {
            const newRecord: any = {
                month: getMonthLabel(i),
            }
            result.map((target: any) => {
                newRecord[target.q as string] = {
                    ...target.timeLine[i - startIdx]
                }
            })
            tempData.push(newRecord);
        }
        setCombinationChartData({
            data: tempData,
            category: tempLabel,
        })
    }

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
                                                                    <div style={{width: panelWidth * 0.9 * 0.70}}>
                                                                        <Field label={'Query'}>
                                                                            <Select
                                                                                key={field.id}
                                                                                options={topicList}
                                                                                menuShouldPortal={true}
                                                                                value={(() => {
                                                                                    register(`target.${index}.topic` as const);
                                                                                    return watch(`target.${index}.topic` as const);
                                                                                })()}
                                                                                onChange={(v) => {
                                                                                    setValue(`target.${index}.topic` as const, v)
                                                                                }}
                                                                            />
                                                                        </Field>
                                                                    </div>
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
                                                        type="button"
                                                        onClick={(e) => append({
                                                            topic: {},
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

export default CombinationSearchComponent;
