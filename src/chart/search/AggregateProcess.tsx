import React, {useEffect, useState} from "react";
import {Collapse, LoadingPlaceholder} from "@grafana/ui";
import {getTopicProgress, intervalAggListRequest, intervalSearchQueryRequest} from "../util/requester";

const AggregateProcess = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [aggregatingList, setAggregatingList] = useState([]);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const interval = intervalAggListRequest(
            setAggregatingList)

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        (async () => {
            const newData = await Promise.all(aggregatingList.map(async (q) => {
                const progress = (await getTopicProgress(q)).data;
                return {
                    progress: progress,
                    label: q,
                }
            }));
            setData(newData);
        })();
    }, [aggregatingList])


    return (
        <Collapse
            collapsible
            label={`Aggregating`}
            isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}
        >
            {data.map((ele) => (
                <LoadingPlaceholder text={`${ele.progress} ${ele.label}`}/>
            ))}
        </Collapse>
    );
}

export default AggregateProcess;
