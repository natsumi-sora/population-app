// # グラフ表示コンポーネント

'use client';

import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { usePopulation } from '../../../hooks/usePopulation';
import { fetchPrefectures } from '../../../api/api';

interface GraphProps {
  selectedPrefCodes: number[];
}
export default function Graph({ selectedPrefCodes }: GraphProps) {
  const [prefNames, setPrefNames] = useState<{ [key: number]: string }>({});
  const populationData = usePopulation(selectedPrefCodes);

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

  // Highcharts 用のオプション設定
  const options: Highcharts.Options = {
    title: { text: '人口推移グラフ',align: "left"},
    xAxis: { title: { text: '年' } },//横軸の設定
    yAxis: { title: { text: '人口数' } },//縦軸の設定
    series: selectedPrefCodes.map((prefCode) => ({ //グラフのデータ
      name: prefNames[prefCode] || `都道府県 ${prefCode}`, //
      type: 'line', //グラフの種類
      data: populationData[prefCode]?.map((item) => item.value) || [], //グラフデータ
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
    })),
  };

  return (
    <div>
      {selectedPrefCodes.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <p>都道府県を選択してください</p>
      )}
    </div>
  );
}