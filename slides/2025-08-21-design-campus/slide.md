---
marp: true
theme: default
class: lead
paginate: true
backgroundColor: #1e1e1e
color: #ffffff
---

# 軽率にスライドを作成しよう
## Marp + GitHub Actions + Claude 自動化システム

発表者: ムツミックス
日付: 2025-08-21

<!-- 
導入スライド
- 軽率さと自動化の組み合わせの面白さを強調
- システムのコンセプトを一言で表現
- 時間: 30秒
-->

---

# 💡 今日のコンセプト

**目標**: 布団の中でスマホだけでスライド作成
**仕組み**: GitHub Issues → Claude生成 → 自動PDF化
**キーワード**: 軽率な使用のための複雑な準備

<!-- 
- 「軽率」というキーワードを強調
- 技術的な複雑さと使いやすさの対比
- 聴衆の興味を引く
- 時間: 30秒
-->

---

# 🏗️ システム構成

### 技術スタック
- **Claude Code GitHub Actions**: @claudeメンションでAI作業
- **Marp**: Markdown → スライド変換  
- **GitHub Actions**: 自動ビルド・デプロイ
- **GitHub Pages**: プレビュー表示

### 実際のフロー
Issue作成 → @claudeメンション → Markdown生成 → PR作成

<!-- 
- 技術スタックの説明
- シンプルなフローの強調
- 各技術の役割を明確に
- 時間: 1分
-->

---

# 📋 実装優先度

### 1. 基本セットアップ（必須・最優先）
```bash
npm install -g @anthropic-ai/claude-code
claude
/install-github-app
```

### 2. GitHub Actions設定
- `ANTHROPIC_API_KEY`をGitHub Secretsに追加
- 基本workflowファイル生成

<!-- 
- 実装の優先順位を明確に
- すぐに試せるコマンド例
- セットアップの簡単さをアピール
- 時間: 1分
-->

---

# 📝 Issue Template設計

```yaml
---
name: 🛏️ 布団スライド作成
about: 寝ながらスライド作成
---

**タイトル:** 
**時間:** [ ] 5分 [ ] 10分 [ ] 30分
**テーマ:** [ ] corporate [ ] minimal [ ] tech

**内容：**

@claude 上記でスライド作って
```

<!-- 
- Issue Templateの実用例
- チェックボックスでの選択しやすさ
- @claudeメンションの簡単さ
- 時間: 45秒
-->

---

# 📁 ディレクトリ構造

```
presentations/
├── themes/              # CSSテーマ
├── templates/           # ベーステンプレート
└── 2025-08-21_軽率にスライドを作成しよう/
    ├── slides.md        # Marpソース
    ├── slides.html      # Web表示用
    └── slides.pdf       # 配布用
```

**日付取得**: `TZ='Asia/Tokyo' date +"%Y-%m-%d"`

<!-- 
- 整理されたディレクトリ構造
- 日本時間での自動日付取得
- 複数フォーマット出力
- 時間: 30秒
-->

---

# 👀 プレビュー解決策

### GitHub Pages（推奨）
- 自動デプロイでスマホから即座に確認
- URL: `https://user.github.io/repo/2025-08-21_title/`

### artifact.ci + HTML Preview Action
- GitHub App1回インストール
- HTML/PDF直接ブラウザ表示
- PRコメントに直接リンク生成

<!-- 
- スマホでのプレビューの重要性
- 複数の解決策提示
- 実用的なURL例
- 時間: 45秒
-->

---

# 🔄 実際の使用フロー

### スマホから
1. GitHub mobileでIssue作成
2. テンプレート選択・内容入力
3. @claudeメンション投稿
4. **1-3分待機** ⏰
5. プレビューURLで確認

### 修正が必要な場合
1. Issueにコメントで修正指示
2. @claudeで再生成

<!-- 
- 実際の使用場面の具体的な流れ
- 待機時間の明示（期待値設定）
- 修正の簡単さ
- 時間: 45秒
-->

---

# 🎯 期待される効果

### 生産性向上
- アイデア → スライド完成まで5分
- テンプレート化で一貫性確保
- バージョン管理で履歴追跡

### 軽率さの実現
- 布団から出ずにプレゼン準備
- スマホ操作のみで完結
- 複雑な作業はすべて自動化

**軽率にスライドを作成する準備完了！** 🚀

<!-- 
まとめスライド
- 具体的な時間短縮効果
- 「軽率さ」の再強調
- 聴衆への行動促進
- 時間: 30秒
-->