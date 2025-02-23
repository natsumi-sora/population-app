<div id="top"></div>

<p style="display: inline">

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [動作確認](#動作確認)


## ゆめみAPIを用いた人口グラフAPP作成

ゆめみAPIを用いて都道府県ごとの以下グラフが見られるAPPの作成
「総人口」「年少人口」「生産年齢人口」「老年人口」

## プロジェクトについて

ゆめみAPIの「都道府県一覧」APIから取得するAPIレスポンスから都道府県一覧のチェックボックスを動的に生成する都道府県にチェックを入れると、RESAS APIから選択された都道府県の「人口構成」を取得する人口構成APIレスポンスから、X軸:年、Y軸:人口数の折れ線グラフを動的に生成して表示する「総人口」の他に「年少人口」「生産年齢人口」「老年人口」も切り替えるUIを何らかの形で用意し表示できるようにすること（同時に表示する必要はない）

レスポンシブデザインについて
都道府県の選択肢は
PC：9×5列、タブレット: 6列（max-width:1024px）、
 スマホ（中）: 4列(max-width: 768px)、スマホ（小）: 2列(max-width: 480px)
としています。


## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| --------------------- |
| ├── @types/node@20.17.19
| ├── @types/react-dom@19.0.3
| ├── @types/react@19.0.8
| ├── axios@1.7.9
| ├── eslint-config-next@15.1.7
| ├── eslint@9.20.1
| ├── highcharts-react-official@3.2.1
| ├── highcharts@12.1.2
| ├── next@15.1.7
| ├── prettier@3.5.1
| ├── react-dom@19.0.0
| ├── react@19.0.0
| ├── recharts@2.15.1
| └typescript@5.7.3
| --------------------- |

その他のパッケージのバージョンは package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

### ディレクトリ構成
|ディレクトリ構成　　　　　　|
| --------------------- |
|  
| ├── README.md
| ├── app
| │   ├── api
| │   │    └── api.ts
| │   │
| │   ├── components
| │   │    └──layout
| │   │         └──footer
| │   │         │    └── page.tsx
| │   │         │    └── footer.module.css
| │   │         │
| │   │         └──header
| │   │         │   └── page.tsx
| │   │         │   └── header.module.css
| │   │         │
| │   │         └──graph
| │   │         │   └── graph.tsx
| │   │         │   └── page.tsx
| │   │         │   └── graph.module.css
| │   │         │
| │   │         └──prefectures
| │   │             └── page.tsx
| │   │             └── prefectures.module.css
| │   ├──hooks
| │   │    └── usePopulation.ts
| │   ├──styles
| │   │    └── style.css
| │   ├── globals.css
| │   ├── layout.tsx
| │   ├── page.module.css
| │   └── page.tsx
| │ 
| ├── node_modules/
| │
| │── .env.local
| ├── .gitignore
| ├── eslint.config.mjs
| ├── next-env.d.ts
| ├── next.config.ts
| ├── package-lock.json
| ├── package.json
| └── tsconfig.json
| --------------------- |                                  |

<p align="right">(<a href="#top">トップへ</a>)</p>


## 実行までのコマンド

◯開発環境の場合
 1 VSCordのダウンロード
　　https://code.visualstudio.com/download

　2 ダウンロードが完了したら拡張機能3つを追加

　　```
　　Japanese Language Pack for Visual Studio Code
　　Live Server
　　Prettier - Code formatter
　　```

3 GitHubの以下よりリポジトリをクローン
　https://github.com/natsumi-sora/population-app.git

・ターミナルで　npm run devを実行
　http://localhost:3000/
  にアクセスする

### 動作確認

◯開発環境
ターミナルで　npm run devを実行
http://localhost:3000/
にアクセスできたら成功

◯本番環境
https://population-app-five.vercel.app/
にアクセスできたら成功

### 停止

以下のコマンドで開発環境サーバーを停止することができます
^C （option+c）



##　APIについて

今回使用したAPIは以下。
ゆめみAPI仕様書：https://yumemi-frontend-engineer-codecheck-api.vercel.app/api-doc

※fetchとaxiosを使用

出典
RESAS（地域経済分析システム）のデータを加工して作成
人口構成データ：
総務省「国勢調査」
厚生労働省「人口動態調査」
国立社会保障・人口問題研究所「日本の地域別将来推計人口」
RESAS 関連サービス利用規約 https://opendata.resas-portal.go.jp/terms.html

<p align="right">(<a href="#top">トップへ</a>)</p>
