# motivation-Maker
motivation-Makerは、ユーザーが心に響いた「モチベーションの言葉」を大切に保管し、いつでも再確認できるように設計されたモバイルアプリケーションです。

単に新しい言葉を消費し続けるのではなく、ユーザー一人ひとりが自分にとって意味のある言葉を保存し、繰り返し向き合う体験に焦点を当てています。

# Differentiation
多くのモチベーションアプリは無限に新しいフレーズを提供しますが、その一方で、一度感動した言葉を後から探し出すのが難しいという課題がありました。

この問題を解決するため、本アプリではあえて言葉の数を制限し、以前見た言葉に再び出会える構造を採用しました。これにより、ユーザーは自分にとって本当に価値のある言葉を選び、保存する体験ができます。

フレーズのデータは一定期間ごとに更新されるため、反復による定着と、新しい発見（新鮮さ）を同時に維持できるよう構成しています。

## Features
- ログイン / 会員登録 UI
- モチベーションフレーズの閲覧機能
- フレーズの追加・削除、ユーザー別のお気に入りリスト管理
- 非同期通信およびグローバルな状態管理の統合
- アプリ内での翻訳・言語切り替え機能

## Tech Stack
- Frontend: React Native(Expo), React Navigation
- State Management: Redux Toolkit
- Network: Axios
- Language: TypeScript, JavaScript

## Troubleshooting
問題 : アクセストークンの満了時に Axios interceptor で 401 Unauthorized エラーを検知し、トークンの再発行をリクエストする際、リフレッシュトークンも満了していると同様に 401 エラーが発生します。その結果、再発行のリクエストを無限に繰り返してしまうバグがありました。

解決策 : Axios interceptor に _retry フラグを追加しました。一度トークンの再発行を試みた場合はそれ以上のリクエストを制限し、セッションを終了させる（ログイン画面へ遷移させるなど）ことで、無限ループを回避するように修正しました。

## Screenshot
**ログイン / 会員登録**

<img width="250" height="555" alt="Screenshot_1770083168" src="https://github.com/user-attachments/assets/3d21d57d-1af1-4976-b572-47488c15f8b3" />
<img width="250" height="555" alt="Screenshot_1770083178" src="https://github.com/user-attachments/assets/288de32f-6c4d-431e-a932-e15a32544e30" />

会員登録画面で言語を設定できる。


**モチベーション文言画面**

<img width="250" height="555" alt="Screenshot_1770082302" src="https://github.com/user-attachments/assets/7a0fb9f1-a6e4-4605-b1bb-7746dccc71c7" />

**言語変更**

<img width="250" height="555" alt="Screenshot_1770082487" src="https://github.com/user-attachments/assets/2a1a95c8-f64c-4cd0-a8c6-f1e34cf7eddd" />

言語を選択するとすぐに別の言語に切り替わる

**お気に入り画面**

<img width="250" height="555" alt="Screenshot_1770082581" src="https://github.com/user-attachments/assets/080b16c6-700a-422d-ab61-c3bed43cb0c1" />

お気に入り画面でお気に入りに登録された文言を見ることができる

## Related Repositories
- Backend API: https://github.com/aoyagi0105/motivation-Maker-backend.git

## Installation
```bash
yarn install

