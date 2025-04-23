const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ミドルウェア
app.use(cors()); // CORS許可（ローカル開発時のみ必要、本番では不要）
app.use(express.json()); // JSONをパースする

// POSTエンドポイント（例：/api/message）
app.post('/api/message', (req, res) => {
  const text = req.body.text;
  console.log('クライアントからのメッセージ:', text);
  res.json({ reply: `サーバーが受け取ったよ: "${text}"` });
});

// Reactのビルド成果物を公開（frontend/buildを静的ファイルとして提供）
app.use(express.static(path.join(__dirname, '../frontend/build')));

// その他のリクエストは全てReactのindex.htmlを返す（React Router対応）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ サーバーは http://localhost:${PORT} で起動中`);
});
