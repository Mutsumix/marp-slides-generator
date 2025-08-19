# Marp Slides Generator

Marp + GitHub Actions を使った自動スライド生成システム

## ライブデモ

- **[スライド一覧](https://mutsumix.github.io/marp-slides-generator/)** - 作成されたスライドの確認とプレビュー
- **[新しいスライドを作成](https://github.com/Mutsumix/marp-slides-generator/issues/new/choose)** - Issue作成で自動生成開始

## 概要

GitHub IssuesでAIが生成したコンテンツを貼り付けるだけで、自動的にプレゼンテーションスライドを作成し、GitHub Actionsでビルド・デプロイするシステムです。

### 特徴

- **簡単な作成フロー**: GitHub Issueフォームに入力するだけ
- **AI活用**: Claude/ChatGPTでコンテンツ生成
- **自動化**: GitHub Actionsで自動ビルド・デプロイ
- **マルチデバイス対応**: HTML出力でスマホからも確認可能
- **複数フォーマット**: HTML（スピーカーノート付き）とPDF出力
- **テンプレート**: 5分/10分/30分用のテンプレート付き

## クイックスタート

### 1. リポジトリのセットアップ

1. このリポジトリをForkまたはテンプレートとして使用
2. GitHub Pagesを有効化（Settings → Pages → Source: GitHub Actions）

### 2. スライドの作成

1. **Issues** タブから **New issue** をクリック
2. **新規スライド作成** テンプレートを選択
3. フォームに必要事項を入力：
   - プレゼンタイトル
   - テーマ（standard/business/casual）
   - 発表時間（5分/10分/30分）
   - AIで生成したコンテンツ

### 3. AI でコンテンツ生成

Claude/ChatGPTに以下のようなプロンプトを使用：

```
以下のガイドラインに従って、10分のプレゼンテーションスライドをMarp形式のMarkdownで作成してください。

テーマ: tech
タイトル: GitHubActionsで始めるCI/CD
対象者: エンジニア

要件:
- 1スライドあたり最大400文字、12行まで
- 各スライドにスピーカーノートを含める
- --- でスライドを区切る

内容: GitHub Actionsの基本的な使い方とCI/CDパイプラインの構築方法
```

### 4. 自動生成とプレビュー

1. Issueを作成すると自動的にPull Requestが生成されます
2. PRでスライドの内容を確認・編集
3. マージするとGitHub Pagesで公開されます

## ディレクトリ構造

```
.
├── .github/
│   ├── ISSUE_TEMPLATE/     # Issueテンプレート
│   └── workflows/           # GitHub Actions
├── templates/               # スライドテンプレート
│   ├── 5min-template.md    # LT用
│   ├── 10min-template.md   # ショートトーク用
│   └── 30min-template.md   # 通常セッション用
├── slides/                  # 生成されたスライド
│   └── yyyy-MM-dd-title/   # 日付ベースのディレクトリ
│       ├── slide.md        # スライド本体
│       ├── images/         # 画像
│       └── output/         # 生成物
├── images/                  # 共通画像リソース
├── scripts/                 # ユーティリティスクリプト
├── themes/                  # Marpテーマ（standard/business/casual）
├── CLAUDE.md               # スライド作成ガイドライン
└── marp.config.js          # Marp設定

```

## 使い方

### ローカルでの開発

```bash
# 依存関係のインストール
npm install

# スライドのビルド（HTML）
npm run build:html

# スライドのビルド（PDF）
npm run build:pdf

# 開発サーバーの起動
npm run serve

# スライドの検証
npm run lint:slides
```

## ガイドライン

詳細なスライド作成ガイドラインは [CLAUDE.md](./CLAUDE.md) を参照してください。

### 基本ルール

- **1スライド1メッセージ**
- **文字数制限**: 1スライド最大400文字、12行
- **タイトル**: 最大30文字
- **画像**: 最大2枚/スライド
- **見出し階層**: h1-h3まで

### 時間配分

- **5分（LT）**: 8-10枚
- **10分**: 15-20枚  
- **30分**: 40-50枚

## カスタマイズ

### テーマの追加

`themes/` ディレクトリにCSSファイルを追加して、独自のテーマを作成できます。

```css
/* themes/custom.css */
/* @theme custom */

@import 'default';

section {
  background: linear-gradient(to bottom, #f0f0f0, #ffffff);
}
```

### テンプレートの編集

`templates/` ディレクトリのMarkdownファイルを編集して、デフォルトのスライド構造をカスタマイズできます。

## コントリビューション

Issue や Pull Request は大歓迎です。

### 開発の流れ

1. Issueで議論
2. Forkしてブランチ作成
3. 変更を実装
4. Pull Requestを作成

## ライセンス

MIT License

## 謝辞

[Marp](https://marp.app/) - Markdownプレゼンテーションエコシステム