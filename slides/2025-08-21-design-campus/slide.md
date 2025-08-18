---
marp: true
theme: default
style: |
  section {
    background-color: #1e1e1e;
    color: #ffffff;
  }
  h1 {
    color: #4CAF50;
    font-size: 2.5em;
  }
  h2 {
    color: #81C784;
    font-size: 1.8em;
  }
  h3 {
    color: #A5D6A7;
    font-size: 1.4em;
  }
  code {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  pre {
    background-color: #2d2d2d;
    color: #f8f8f2;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
  }
  .metric-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 1em;
    border-radius: 10px;
    text-align: center;
    margin: 0.5em;
  }
  .metric-card h3 {
    font-size: 2.5em;
    margin: 0;
    color: #ffffff;
  }
  .metric-card p {
    margin: 0.5em 0 0 0;
    color: #e8e8e8;
  }
paginate: true
footer: 'スライドを軽率に作成しよう | ムツミックス | 2025-08-21'
---

# スライドを軽率に作成しよう
## Marp + GitHub Actions + Claude自動化システム

**発表者**: ムツミックス  
**日付**: 2025-08-21  
**時間**: 5分

<!-- 
スピーカーノート:
- 挨拶と自己紹介（30秒）
- 今日は「軽率」というキーワードがテーマ
- 複雑な準備で軽率な使用を実現する話
- 5分という短時間で効率よく概要を伝える
-->

---

## 💡 コンセプト

<div class="metric-card">
  <h3>🛏️</h3>
  <p>布団の中でスマホだけでスライド作成</p>
</div>

- **目標**: 布団から出ずにプレゼン準備完了
- **仕組み**: GitHub Issues → Claude生成 → 自動PDF化
- **哲学**: 軽率な使用のための複雑な準備

<!-- 
スピーカーノート:
- 「軽率」の定義を明確に（1分）
- 布団にいながらスマホだけで完結するシステム
- パラドックス：複雑な仕組みで簡単な操作を実現
- 開発者の怠惰こそが技術進歩の原動力
-->

---

## 🏗️ 技術スタック

### 核となる4つのコンポーネント
- **Claude Code GitHub Actions**: @claudeメンションでAI作業
- **Marp**: Markdown → スライド変換エンジン  
- **GitHub Actions**: 自動ビルド・デプロイパイプライン
- **GitHub Pages**: ワンクリックプレビュー表示

<!-- 
スピーカーノート:
- 各技術の役割を30秒ずつ説明（2分）
- Claude Code: 最新のGitHub Actions統合
- Marp: シンプルなMarkdownベースのスライド作成
- GitHub Actions: CI/CDでの自動化
- GitHub Pages: 即座にプレビュー可能
-->

---

## 📋 実装手順（優先度順）

### 1. 基本セットアップ（必須・最優先）

```bash
npm install -g @anthropic-ai/claude-code
claude
/install-github-app
```

### 2. 環境設定
- `ANTHROPIC_API_KEY`をGitHub Secretsに追加
- 基本workflowファイル生成
- CLAUDE.md作成（リポジトリルールの定義）

<!-- 
スピーカーノート:
- 実装の優先順位を説明（1分）
- デモ環境があれば簡単にセットアップを見せる
- セキュリティの重要性（API keyの取り扱い）
- CLAUDE.mdの役割：AIに与える指示書
-->

---

## 📝 Issue Template設計

### 実際のテンプレート例

```yaml
---
name: 🛏️ 布団スライド作成
about: 寝ながらスライド作成
title: "[SLIDE] "
---

**タイトル:** 
**時間:** [ ] 5分 [ ] 10分 [ ] 30分
**テーマ:** [ ] tech [ ] business [ ] casual

@claude 上記でスライド作って
```

<!-- 
スピーカーノート:
- Issue templateの実用性を強調（1分）
- チェックボックスで簡単選択
- @claudeメンションで即座に作業開始
- テンプレート化により一貫性確保
-->

---

## 📁 ディレクトリ構造

### 日付ベースの自動管理

```
slides/
├── themes/              # CSSテーマ
├── templates/           # ベーステンプレート  
└── 2025-08-21_軽率にスライドを作成しよう/
    ├── slide.md        # Marpソース
    ├── slides.html     # Web表示用
    └── slides.pdf      # 配布用
```

**日付取得**: `TZ='Asia/Tokyo' date +"%Y-%m-%d"`で日本時間

<!-- 
スピーカーノート:
- ファイル管理の重要性（30秒）
- 日付ベースで履歴管理
- 複数フォーマット出力（HTML/PDF）
- 日本時間での正確な日付取得
-->

---

## 👀 プレビュー解決策

### 3つのアプローチ

1. **GitHub Pages**（推奨）
   - 自動デプロイでスマホから即座に確認
   - `https://user.github.io/repo/2025-08-21_title/`

2. **artifact.ci**
   - GitHub App1回インストール  
   - HTML/PDF直接ブラウザ表示

3. **HTML Preview Action**
   - PRコメントに直接リンク生成

<!-- 
スピーカーノート:
- プレビューの重要性（1分）
- スマホでの確認が最重要
- GitHub Pagesが最も軽率で便利
- artifact.ciは追加のメリット
-->

---

## 🔄 実際の使用フロー

### スマホから5ステップ

1. **GitHub mobile**でIssue作成
2. **テンプレート選択**・内容入力  
3. **@claudeメンション**投稿
4. **1-3分待機**（コーヒータイム☕）
5. **プレビューURL**で確認

### 修正が必要な場合
- Issueにコメントで修正指示 → @claudeで再生成

<!-- 
スピーカーノート:
- 実際の操作デモの時間（1分）
- 1-3分の待機時間は現実的
- 修正も簡単：コメント→再生成
- コーヒータイムの重要性（開発者の息抜き）
-->

---

## 🎯 期待される効果

### 生産性向上の実現

<div class="metric-card">
  <h3>5分</h3>
  <p>アイデア→スライド完成</p>
</div>

- **テンプレート化**で一貫性確保
- **バージョン管理**で履歴追跡  
- **軽率さの実現**: 布団から出ずにプレゼン準備
- **複雑な作業はすべて自動化**

**軽率にスライドを作成する準備完了！** 🚀

<!-- 
スピーカーノート:
- まとめと効果の強調（1分）
- 数値で効果を示す（5分で完成）
- 軽率さと品質の両立
- 質疑応答の時間を確保
- 「ありがとうございました」で締め
-->