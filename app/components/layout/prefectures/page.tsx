//# 都道府県選択コンポーネント

'use client';

import { useState, useEffect } from 'react';
import { fetchPrefectures } from '@/app/api/api'; // `api.ts` から関数をインポート
import styles from './prefectures.module.css';

// 都道府県データの型
type Prefecture = { code: number; name: string };

// `onSelect` を受け取るための型
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

export default PrefectureSelector; // コンポーネントをdefaultエクスポート