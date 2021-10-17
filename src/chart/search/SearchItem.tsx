import {Collapse} from "@grafana/ui";
import React, {useState} from "react";

const SearchItem = ({data}: any) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapse
            collapsible
            label={`${data._source.id ?? ''}: ${data._source.ad_creative_link_title ?? ''} - ${data._source.page_name ?? ''} - ${data._source.funding_entity ?? ''}`}
            isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}
        >
            <pre>{JSON.stringify(data._source.ad_creative_body, null, 2)}</pre>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </Collapse>
    );
}

export default SearchItem;
