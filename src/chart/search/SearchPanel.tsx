import {
    Alert,
    AsyncSelect,
    Collapse,
    HorizontalGroup,
    InlineField, Input,
    RangeSlider,
    Form,
    VerticalGroup, Button, Select
} from "@grafana/ui";
import React, {useEffect, useState} from "react";
import SearchItem from "./SearchItem";
import {numberWithCommas} from "../util/helper";
import _ from "lodash";
import {useNavigate} from "../../routes/useNavigate";
import {useQuery} from "../../routes/useQuery";
import {getTopicList, searchTopic} from "../util/requester";
import SearchInfo from "./SearchInfo";
import {SelectableValue} from "@grafana/data";

interface SearchDTO {
    q: string;
}

const defaultSearch: Partial<SearchDTO> = {
    q: '',
}

const SearchPanel = ({size}: any) => {
    const obj = {
        hello: 'asdfasd',
        abb: 'asdfasd',
        awewe: 'asdfasd',
        test: 1,
        test2: {
            a: 1,
            b: 1,
            c: 1,
            d: 1,
        }
    };
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
        const query = queryDictionary();
        console.log(query);
    }, [queryDictionary])

    // const searchQuery = async (values: any) => {
    //     replace(undefined, mergeQuery({
    //         q: values.q,
    //         ccFrom: monthSlider[0],
    //         ccTo: monthSlider[1],
    //     }))
    //
    //     const result = (await searchTopic(values.q, monthSlider[0], monthSlider[1])).data;
    //     setData(result);
    //     console.log(result);
    // }

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
                    <div style={{width: panelWidth * 0.75}}>
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
                        <SearchInfo
                            totalImpression={numberWithCommas(_.get(data, 'aggregations.impression_agg.value', 0))}
                            totalSpend={numberWithCommas(_.get(data, 'aggregations.spend_agg.value', 0))}
                            totalAds={numberWithCommas(_.get(data, 'hits.total.value', 0))} />
                    </div>
                </VerticalGroup>
            </div>
            <div style={{overflowY: 'scroll', maxHeight: size.height, width: listWidth}}>
                { _.get(data, 'hits.hits', []).map((val: any) => {
                    return <SearchItem key={val._id} data={val}/>
                }) }
            </div>
        </HorizontalGroup>
    );
}

export default SearchPanel;
