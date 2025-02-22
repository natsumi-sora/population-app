'use client';

import { useState } from 'react';
import Graph from './Graph';

export default function GraphPage() {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);

  return (
    <div>
      <h1>人口推移グラフ</h1>
      <Graph selectedPrefCodes={selectedPrefCodes} />
    </div>
  );
}
