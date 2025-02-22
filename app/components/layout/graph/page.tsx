// # グラフ表示コンポーネント

'use client';

import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { usePopulation } from '../../../hooks/usePopulation';
import { fetchPrefectures } from '../../../api/api';
import styles from './graph.module.css';

interface GraphProps {
  selectedPrefCodes: number[];
}

const categories = [
  { key: 'total', label: '総人口' },
  { key: 'young', label: '年少人口' },
  { key: 'working', label: '生産年齢人口' },
  { key: 'elderly', label: '老年人口' },
];


export default function Graph({ selectedPrefCodes }: GraphProps) {
  const [prefNames, setPrefNames] = useState<{ [key: number]: string }>({});
  const [activeCategory, setActiveCategory] = useState<'total' | 'young' | 'working' | 'elderly'>('total');
  const populationData = usePopulation(selectedPrefCodes, activeCategory);


  // 都道府県コードと名前の対応を取得
   useEffect(() => {
    fetchPrefectures().then((data) => {
      const nameMap = data.reduce((acc: { [key: number]: string }, pref: { code: number; name: string }) => {
        acc[pref.code] = pref.name;
        return acc;
      }, {});
      setPrefNames(nameMap);
    });
   }, []);

  // X軸の年数を取得（最初の都道府県のデータを基準に）
  const years = populationData[selectedPrefCodes[0]]?.map((item) => item.year) || [];

  // Highcharts 用のオプション設定
  const options: Highcharts.Options = {
    title: { text: `人口推移グラフ (${categories.find((c) => c.key === activeCategory)?.label})`, align: 'left' },
    xAxis: { title: { text: '年' }, categories: years.map(String) }, // APIから取得した年データをX軸に適用
    yAxis: { 
      title: { text: '人口数（万人）' } // Y軸の単位をX万人に変更
    },
    series: selectedPrefCodes.map((prefCode: number) => ({
      name: prefNames[prefCode] || `都道府県 ${prefCode}`,
      type: 'line',
      data: populationData[prefCode]?.map((item) => item.value) || [],
    })),
    responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
              }
          }
      }]
   }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {categories.map((category) => (
          <button
            key={category.key}
            className={activeCategory === category.key ? styles.activeTab : styles.tab}
            onClick={() => setActiveCategory(category.key as 'total' | 'young' | 'working' | 'elderly')}
          >
            {category.label}
          </button>
        ))}
      </div>

      {selectedPrefCodes.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <p>都道府県を選択してください</p>
      )}
    </div>
  );
}