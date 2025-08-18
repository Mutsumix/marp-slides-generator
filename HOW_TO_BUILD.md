# 🛠️ 「スライドを軽率に作成する」ツールの作成手順

このドキュメントでは、Marp + GitHub Actions + Claudeを使った自動スライド生成システムを、ゼロから構築する手順を説明します。

## 📋 前提条件

- GitHubアカウント
- 基本的なGit/GitHubの知識
- Node.js環境（ローカル開発用）

## 🏗️ 構築手順

### ステップ1: リポジトリの初期化

```bash
# 新しいディレクトリを作成
mkdir marp-slides-generator
cd marp-slides-generator

# Gitリポジトリを初期化
git init

# .gitignoreを作成
cat << 'EOF' > .gitignore
node_modules/
npm-debug.log*
*.pdf
*.pptx
.DS_Store
.vscode/
.env
slides/*/output/
EOF

git add .gitignore
git commit -m "初期設定: Gitリポジトリの初期化"
```

### ステップ2: スライド作成ガイドライン（CLAUDE.md）の作成

AIがスライドを生成する際の指針となるガイドラインを作成します。

```markdown
# CLAUDE.md の主要な内容

1. **基本原則**
   - 1スライド1メッセージ
   - 視覚的階層の明確化
   - アクセシビリティ重視

2. **制約ルール**
   - タイトル: 最大30文字
   - 本文: 1行最大40文字
   - 1スライド: 最大400文字、12行

3. **コンポーネント定義**
   - データ表示パターン
   - レイアウトパターン

4. **レビューチェックリスト**
   - 文字数制限の確認
   - 時間配分の適切性
```

### ステップ3: スライドテンプレートの作成

```bash
# テンプレートディレクトリを作成
mkdir -p templates

# 各時間用のテンプレートを作成
# - 5min-template.md (8-10枚構成)
# - 10min-template.md (15-20枚構成)
# - 30min-template.md (40-50枚構成)
```

各テンプレートには以下を含めます：
- タイトルスライド
- アジェンダ
- 本文構造
- まとめスライド
- スピーカーノート例

### ステップ4: GitHub Issue テンプレートの設定

```bash
# Issueテンプレートディレクトリを作成
mkdir -p .github/ISSUE_TEMPLATE
```

`.github/ISSUE_TEMPLATE/slide-request.yml` を作成：

```yaml
name: 📊 新規スライド作成
description: 新しいプレゼンテーションスライドを作成
body:
  - type: input
    id: title
    attributes:
      label: プレゼンタイトル
  - type: dropdown
    id: theme
    attributes:
      label: テーマ
      options:
        - business
        - tech
        - casual
  - type: dropdown
    id: duration
    attributes:
      label: 発表時間
      options:
        - 5分
        - 10分
        - 30分
  - type: textarea
    id: content
    attributes:
      label: スライド内容
      description: AI生成コンテンツを貼り付け
```

### ステップ5: GitHub Actions ワークフローの作成

#### 5.1 スライド生成ワークフロー

`.github/workflows/generate-slides.yml`:

```yaml
name: Generate Slides from Issue

on:
  issues:
    types: [opened]

jobs:
  generate-slide:
    if: contains(github.event.issue.labels.*.name, 'slide-request')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - name: Parse issue and generate slide
        # Issueの内容をパースしてスライドを生成
      - name: Create Pull Request
        # 生成したスライドでPRを作成
```

#### 5.2 プレビュー・デプロイワークフロー

`.github/workflows/preview-deploy.yml`:

```yaml
name: Build and Deploy Preview

on:
  pull_request:
    paths: ['slides/**']
  push:
    branches: [main]

jobs:
  build-preview:
    steps:
      - name: Install Marp CLI
        run: npm install -g @marp-team/marp-cli
      - name: Build slides
        # HTML/PDF生成
      - name: Deploy to GitHub Pages
        # GitHub Pagesへデプロイ
```

### ステップ6: ユーティリティスクリプトの作成

```bash
mkdir scripts
```

#### generate-slide.js
Issueの内容を解析してスライドを生成するスクリプト：

```javascript
function parseIssueBody(issueBody) {
  // フォームフィールドを抽出
}

function generateSlideContent(data) {
  // テンプレートを使用してスライド生成
}

function createSlideFiles(data) {
  // yyyy-MM-dd-title形式でディレクトリ作成
  // slide.mdファイルを生成
}
```

#### validate-slide.js
ガイドラインに基づいてスライドを検証：

```javascript
function validateSlide(slidePath) {
  // 文字数制限チェック
  // 行数制限チェック
  // 必須要素の確認
}
```

### ステップ7: Marp設定ファイル

`marp.config.js`:

```javascript
module.exports = {
  allowLocalFiles: true,
  themeSet: './themes',
  html: true,
  pdf: {
    format: 'A4',
    printBackground: true,
  },
};
```

### ステップ8: package.jsonの作成

```json
{
  "name": "marp-slides-generator",
  "version": "1.0.0",
  "scripts": {
    "build": "marp slides/**/slide.md",
    "build:pdf": "marp --pdf slides/**/slide.md",
    "serve": "marp --server slides/**/slide.md",
    "validate": "node scripts/validate-slide.js"
  },
  "dependencies": {
    "@marp-team/marp-cli": "^3.4.0"
  }
}
```

### ステップ9: GitHubリポジトリの設定

1. **リポジトリをGitHubに作成**
   ```bash
   git remote add origin https://github.com/[username]/marp-slides-generator.git
   git push -u origin main
   ```

2. **GitHub Pagesを有効化**
   - Settings → Pages
   - Source: GitHub Actions を選択

3. **必要な権限を設定**
   - Settings → Actions → General
   - Workflow permissions: Read and write permissions

### ステップ10: 使い方の確認

1. **Issueを作成**
   - Issues → New issue
   - テンプレートを選択して記入

2. **AIでコンテンツ生成**
   ```
   以下のガイドラインに従って、10分のプレゼンテーションスライドを
   Marp形式のMarkdownで作成してください。
   [詳細な要件...]
   ```

3. **自動処理の確認**
   - PR自動生成
   - プレビュー確認
   - マージ後のデプロイ

## 🎯 カスタマイズのポイント

### テーマの追加

```css
/* themes/custom.css */
/* @theme custom */
@import 'default';

section {
  /* カスタムスタイル */
}
```

### ワークフローの拡張

- Slack通知の追加
- 自動レビュー機能
- 多言語対応

### AIプロンプトの最適化

CLAUDE.mdのガイドラインを基に、より具体的なプロンプトテンプレートを作成。

## 📊 完成後の運用フロー

```mermaid
graph LR
    A[Issue作成] --> B[AI生成コンテンツ貼付]
    B --> C[GitHub Actions起動]
    C --> D[スライド自動生成]
    D --> E[PR作成]
    E --> F[レビュー・編集]
    F --> G[マージ]
    G --> H[GitHub Pages公開]
```

## 🚀 発展的な機能

1. **テーマエディタ**: ブラウザ上でテーマをカスタマイズ
2. **リアルタイムプレビュー**: PR上で即座にプレビュー
3. **共同編集**: 複数人での同時編集サポート
4. **分析機能**: スライドの品質スコアリング
5. **エクスポート拡張**: PowerPoint、Keynote形式対応

## 📝 トラブルシューティング

### よくある問題と解決策

1. **GitHub Actionsが動かない**
   - ワークフローの権限を確認
   - YAMLの構文エラーをチェック

2. **Marpビルドエラー**
   - 画像パスの確認
   - Markdown構文の検証

3. **GitHub Pages表示されない**
   - Pages設定の確認
   - デプロイステータスの確認

## 🎉 まとめ

このシステムにより、以下が実現できます：

- ✅ AIを活用した高速なスライド作成
- ✅ GitHubフローでのバージョン管理
- ✅ 自動ビルド・デプロイによる効率化
- ✅ どこからでもアクセス可能なWeb公開

「軽率に」でも「高品質な」スライドを作成できる環境が整いました！

---

Created with ❤️ by the Marp Slides Generator Team