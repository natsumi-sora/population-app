'use client';

import { Graph } from './Graph';

interface GraphPageProps {
  selectedPrefCodes: number[];
}

export default function GraphPage({ selectedPrefCodes = [] }: GraphPageProps) {
  return (
    <div>
      <h1>人口推移グラフ</h1>
      <GraphPage selectedPrefCodes={selectedPrefCodes} />
    </div>
  );
}
///useState  13行目をGraphのみ
