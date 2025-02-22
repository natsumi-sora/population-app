'use client';

import { useState, useEffect } from 'react';
import { fetchPrefectures } from '@/app/api/api'; // APIからデータを取得
import styles from './prefectures.module.css';

// 都道府県データの型
type Prefecture = { code: number; name: string };

// PrefectureSelectorコンポーネントの型
interface PrefectureSelectorProps {
  onSelect: (selected: number[]) => void;
}

const PrefectureSelector = ({ onSelect }: PrefectureSelectorProps) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  // APIから都道府県を取得
  useEffect(() => {
    fetchPrefectures().then(setPrefectures);
  }, []);

  // チェックボックス変更時の処理
  const handleCheckboxChange = (code: number) => {
    setSelected((prev) => {
      const newSelection = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
      return newSelection;
    });
  };

  // `selected` が変更される度に親に通知
  useEffect(() => {
    onSelect(selected); // 親コンポーネントに選択した都道府県コードを渡す
  }, [selected, onSelect]);

  return (
    <div className={styles.grid}>
      {prefectures.map((pref) => (
        <label key={pref.code} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            value={pref.code.toString()}
            onChange={() => handleCheckboxChange(pref.code)}
            checked={selected.includes(pref.code)}
          />
          {pref.name}
        </label>
      ))}
    </div>
  );
};

// `PrefecturesPage` コンポーネントの定義
const PrefecturesPage = ({ onSelect }: { onSelect: (selected: number[]) => void }) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);

  // 都道府県データを取得
  useEffect(() => {
    fetchPrefectures().then(setPrefectures);
  }, []);

  // 都道府県コードを選択された名前に変換
  const selectedPrefNames = prefectures
    .filter((pref) => selectedPrefCodes.includes(pref.code))
    .map((pref) => pref.name);

  // `onSelect` を `PrefectureSelector` に渡す
  const handleSelect = (selected: number[]) => {
    setSelectedPrefCodes(selected);
    onSelect(selected); // 親コンポーネントの onSelect を呼び出す
  };

  return (
    <div className={styles.select}>
      <h1>都道府県選択</h1>
      <PrefectureSelector onSelect={handleSelect} />
      <p>選択された都道府県名: {selectedPrefNames.join(', ')}</p>
    </div>
  );
};

export default PrefecturesPage;
