'use client';
import { useState } from 'react';
import Graph from './Graph';
export default function GraphPage() {
    const [selectedPrefCodes] = useState([]);
    return (<div>
      <h1>人口推移グラフ</h1>
      <Graph selectedPrefCodes={selectedPrefCodes}/>
    </div>);
}
