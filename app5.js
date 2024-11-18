const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win ) || 0;//Numberのおかげ
  let total = Number( req.query.total ) || 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if (hand == cpu) {
    judgement = '引き分け';
  } else if (
    (hand == 'グー' && cpu == 'チョキ') ||
    (hand == 'チョキ' && cpu == 'パー') ||
    (hand == 'パー' && cpu == 'グー')
  ) {
    judgement = '勝ち';
    win += 1;  
  } else {
    judgement = '負け';
    
  }
  total += 1;

  
  const display = { //表示する変数
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});


app.get("/hoi", (req, res) => {
  let finger = req.query.finger;
  let win = Number( req.query.win ) || 0;//Numberのおかげ
  let total = Number( req.query.total ) || 0;
  console.log( {finger, win, total});
  const num = Math.floor( Math.random() * 4 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '上';
  else if( num==2 ) cpu = '下';
  else if( num==3 ) cpu = '右';
  else if( num==4 ) cpu = '左';

  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '';
  if (finger != cpu) {
    judgement = 'もう一度';
  } else if (
    (finger == '右' && cpu == '右') ||
    (finger == '左' && cpu == '左') ||
    (finger == '上' && cpu == '上')
  ) {
    judgement = '勝ち';
    win += 1;  
  } else {
    judgement = '負け';
  }
  total += 1;

  
  const display = { //表示する変数
    your: finger,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'hoi', display );
});


app.get("/lottery", (req, res) => {
  // リクエストパラメータを取得
  let choice = req.query.choice || ''; // ユーザーの選択（例: '赤', '青', '緑'など）
  let win = Number(req.query.win) || 0; // 当たり回数
  let total = Number(req.query.total) || 0; // 総試行回数

  console.log({ choice, win, total });

  // ランダムに当たり・ハズレを判定
  const options = ['赤', '青', '緑', '黄色']; // 選択肢
  const randomChoice = options[Math.floor(Math.random() * options.length)]; // ランダムな選択肢
  let result = '';

  // 判定ロジック
  if (choice === randomChoice) {
    result = '当たり';
    win += 1;
  } else {
    result = 'ハズレ';
  }
  total += 1;

  // 表示用データ
  const display = {
    yourChoice: choice || '未選択',
    lotteryResult: randomChoice,
    judgement: result,
    win: win,
    total: total,
    winRate: ((win / total) * 100).toFixed(2) + '%' // 勝率を計算
  };

  // データをテンプレートに送信して表示
  res.render('lottery', display);
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
