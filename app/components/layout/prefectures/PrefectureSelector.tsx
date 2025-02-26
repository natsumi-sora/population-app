'use client';

import { useState, useCallback, useEffect } from 'react';
import styles from './prefectures.module.css';

interface Prefecture {
  code: number;
  name: string;
}

interface PrefectureSelectorProps {
  prefectures: Prefecture[];
  onSelect: (selected: Prefecture[]) => void;
}

export default function PrefectureSelector({ prefectures, onSelect }: PrefectureSelectorProps) {
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([]);

  const handleToggle = useCallback((pref: Prefecture) => {
    setSelectedPrefs((prev) => {
      const isSelected = prev.some((p) => p.code === pref.code);
      return isSelected ? prev.filter((p) => p.code !== pref.code) : [...prev, pref];
    });
  }, []);

  // `selectedPrefs` の変更を監視し、変更後に `onSelect` を呼び出す
  useEffect(() => {
    onSelect(selectedPrefs);
  }, [selectedPrefs, onSelect]);

  return (
    <div className={styles.grid}>
      {prefectures.map((pref) => (
        <label key={pref.code} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selectedPrefs.some((p) => p.code === pref.code)}
            onChange={() => handleToggle(pref)}
          />
          {pref.name}
        </label>
      ))}
    </div>
  );
}
