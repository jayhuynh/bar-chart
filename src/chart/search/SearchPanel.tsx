import {
    Alert,
    AsyncSelect,
    Collapse,
    HorizontalGroup,
    InlineField, Input,
    RangeSlider,
    Form,
    VerticalGroup, Button, Select, Field, LoadingPlaceholder, Switch, TabsBar, TabContent, Tab
} from "@grafana/ui";
import React, {useEffect, useState} from "react";
import SearchItem from "./SearchItem";
import {numberWithCommas} from "../util/helper";
import _ from "lodash";
import {useNavigate} from "../../routes/useNavigate";
import {useQuery} from "../../routes/useQuery";
import {
    createTopicReuqest,
    getTopicList,
    intervalGetRequest,
    intervalSearchQueryRequest,
    searchTopic
} from "../util/requester";
import SearchInfo from "./SearchInfo";
import {SelectableValue} from "@grafana/data";
import AggregateProcess from "./AggregateProcess";

interface SearchDTO {
    q: string;
}

const defaultSearch: Partial<SearchDTO> = {
    q: '',
}

const SearchPanel = ({size}: any) => {
    const {replace, mergeQuery} = useNavigate();
    const {queryDictionary} = useQuery();


    const monthRange = {
        max: 12,
        step: 1,
        min: 1
    }
    const [monthSlider, setMonthSlider] = useState([1, 12]);
    const [topic, setTopic] = useState<SelectableValue<string>>();
    const [topicList, setTopicList] = useState<any[]>();
    const [data, setData] = useState<any>();
    const tabs = [
        {
            label: 'Results',
            active: true,
        },
        {
            label: 'Query aggregation tasks',
            active: false,
        }
    ]
    const [state, updateState] = useState(tabs);




    const listWidth = size.width * 0.5;
    const panelWidth = (size.width - listWidth);

    useEffect(() => {
        (async () => {
            const result = await getTopicList();
            setTopicList(result.data.map(topic => ({
                label: topic,
                value: topic,
            })));
        })();
    }, [])

    useEffect(() => {
        replace(undefined, mergeQuery({
            q: topic?.value,
            ccFrom: monthSlider[0],
            ccTo: monthSlider[1],
        }))
    }, [topic, monthSlider])

    useEffect(() => {
        const query = queryDictionary();
        const interval = intervalSearchQueryRequest(
            query.q as string,
            Number(query.ccFrom),
            Number(query.ccTo),
            setData)

        return () => clearInterval(interval);
    }, [queryDictionary])

    const createTopic = async (data: SearchDTO) => {
        await createTopicReuqest(data.q);
    }

    return (
        <HorizontalGroup>
            <div style={{width: panelWidth, height: size.height * 0.9}}>
                <VerticalGroup spacing={'lg'}>
                    <div style={{width: panelWidth * 0.75}}>
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
                    <div style={{width: panelWidth * 0.7}}>
                        <InlineField label={'Query'} grow>
                            <Select
                                options={topicList}
                                menuShouldPortal={true}
                                value={topic}
                                onChange={(v) => {
                                    setTopic(v)
                                }}
                            />
                        </InlineField>
                    </div>
                    <div style={{width: panelWidth * 0.75}}>
                        <Form onSubmit={createTopic}>
                            {({register, errors}) => {
                                return (
                                    <HorizontalGroup>
                                        <div style={{width: panelWidth * 0.5}}>
                                            <InlineField label={'Query aggregate'}>
                                                <Input {...register("q")}/>
                                            </InlineField>
                                        </div>
                                        <Button type="submit">Create query task</Button>
                                    </HorizontalGroup>
                            )
                            }}
                        </Form>
                    </div>
                    <div style={{width: panelWidth * 0.75}}>
                        <SearchInfo
                            totalAds={numberWithCommas(_.get(data, 'stat.ads', 0))}
                            totalSpend={numberWithCommas(_.get(data, 'stat.spend', 0))}
                            totalImpression={numberWithCommas(_.get(data, 'stat.impression', 0))} />
                    </div>
                </VerticalGroup>
            </div>
            <div style={{ width: listWidth, height: size.height}}>
                <VerticalGroup>
                    <TabsBar>
                        {state.map((tab, index) => {
                            return (
                                <Tab
                                    key={index}
                                    label={tab.label}
                                    active={tab.active}
                                    onChangeTab={() => updateState(state.map((tab, idx) => ({ ...tab, active: idx === index })))}
                                />
                            );
                        })}
                    </TabsBar>
                    <TabContent>
                        {state[0].active && <div style={{overflowY: 'scroll', maxHeight: size.height * 0.9, width: listWidth}}>
                            { _.get(data, 'documents', []).map((val: any) => {
                                return <SearchItem key={val._id} data={val}/>
                            }) }
                        </div>}
                        {state[1].active && <div style={{overflowY: 'scroll', maxHeight: size.height * 0.9, width: listWidth}}>
                            <AggregateProcess/>
                        </div>}
                    </TabContent>
                </VerticalGroup>
            </div>

        </HorizontalGroup>
    );
}

export default SearchPanel;
