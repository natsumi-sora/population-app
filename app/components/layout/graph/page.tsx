'use client';

import Graph from './Graph';

interface GraphPageProps {
  selectedPrefCodes: number[]; // ここでselectedPrefCodesの型を定義
}

export default function GraphPage({ selectedPrefCodes }: GraphPageProps) {
  return (
    <div>
      <h1>人口推移グラフ</h1>
      <Graph selectedPrefCodes={selectedPrefCodes} /> {/* GraphコンポーネントにselectedPrefCodesを渡す */}
    </div>
  );
}