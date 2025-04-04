# Post (投稿) ドメイン設計

## 概要
Postは、ユーザーがPodcastエピソードについての感想や推薦を共有するための中心的な機能です。
通常のSNSの投稿とは異なり、より永続的な価値を持つコンテンツとして設計されています。

## 目的
- Podcastエピソードの発見可能性を向上
- 質の高い感想・推薦を時間を超えて共有
- 検索エンジンからの流入を最適化

## 投稿の構成要素

### 必須要素
- 本文 (RichText)
  - Markdown形式
  - 画像の埋め込みをサポート
  - リンクの埋め込みをサポート

### オプション要素
- Podcastエピソード
  - 1つの投稿に1つのエピソードを紐付け可能
  - エピソードが存在しない場合は新規登録
  - URLからメタデータを自動取得

## ユーザーストーリー

### 主要なストーリー
1. 良いPodcastエピソードを発見したユーザーが、その価値を共有したい
2. 特定のトピックについて深い考察を含むエピソードを、記事として残したい
3. 数年後でも検索可能な形で、エピソードの感想や推薦を残したい

### 期待される行動フロー
1. エピソードを聴く
2. 共有したいと思う
3. プラットフォームで投稿を作成
4. エピソードを紐付け（既存 or 新規）
5. 感想・推薦文を執筆
6. 投稿を公開

## 技術的な考慮事項

### RichTextエディタ
- 長文の執筆に適した編集環境
- Markdown形式でのデータ保存
- プレビュー機能の提供

### エピソード紐付け
- URLからのメタデータ自動取得
- 重複エピソードのチェック機能
- メタデータの編集機能

### 検索最適化
- 適切なメタタグの生成
- パーマリンク構造の最適化
- OGP対応

## 制約・ルール
- 1投稿につき1エピソードまで
- 本文は最低100文字以上を推奨
- 投稿後のエピソード紐付けの変更は不可
- 本文は編集可能（編集履歴を保持）

## 将来的な拡張性

### 検討中の機能
- トランスクリプトの自動生成
- 関連エピソードの推薦
- シリーズ投稿の作成
- ニュースレター連携

### 想定される課題
- 著作権に関する配慮
- コンテンツの重複管理
- 品質管理とモデレーション
