import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import React, { useState, useEffect } from "react";
import { ResponsiveContainer } from 'recharts';
import { Label } from 'recharts';

export default function Chartpage() {

    const [statistics, setStatistics] = useState([])

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setStatistics(data))
    }

    const _ = require("lodash");

    const groupedData = _.groupBy(statistics, 'activity');
    const summedData = _.map(groupedData, g => {
        return {
            activity: g[0].activity,
            duration: _.sumBy(g, 'duration')
        };
    });

    return (
        <div className='statistics-header'>
            <h1>Statistics page</h1>
            <div className='statistics-table'>
                <ResponsiveContainer width="100%" height={700} margin={10}>
                <BarChart data={summedData}>
                    <XAxis dataKey="activity" stroke="black" />
                    <YAxis stroke="black">
                        <Label
                            style={{
                                textAnchor: "middle",
                                fontSize: "130%",
                                fill: "black",
                            }}
                            position="insideLeft"
                            angle={270}
                            value={"Duration (min)"}
                        />
                        </YAxis>
                    <Tooltip wrapperStyle={{ width: 150, backgroundColor: '#ccc' }} />
                    <Legend width={200} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                    <Bar dataKey="duration" fill="lightblue" barSize={100} />
                </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}