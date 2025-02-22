'use client';

import Graph from './Graph';

// `selectedPrefCodes` の型定義を追加
interface GraphPageProps {
  selectedPrefCodes: number[];  // selectedPrefCodesはnumber型の配列
}

export default function GraphPage({ selectedPrefCodes }: GraphPageProps) {
  return (
    <div>
      <h1>人口推移グラフ</h1>
      <Graph selectedPrefCodes={selectedPrefCodes} />
    </div>
  );
}