export type Prefecture = { code: number; name: string };

export interface PrefectureSelectorProps {
  onSelect: (selected: number[]) => void;
}

export interface PrefecturesPageProps {
  onSelect: (selected: number[]) => void;
}
