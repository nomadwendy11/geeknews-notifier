const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser();

async function run() {
  try {
    // 1. RSS 피드 읽기
    const feed = await parser.parseURL('https://news.hada.io/rss');
    if (!feed.items.length) return;

    const latestItem = feed.items[0];
    const { title, link, contentSnippet } = latestItem;

    // 2. 메시지 구성
    const message = `🚀 GeekNews 새 소식\n\n📌 ${title}\n\n🔗 ${link}`;

    // 3. 텔레그램 전송
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });

    console.log('알림 전송 완료:', title);
  } catch (error) {
    console.error('에러 발생:', error.message);
    process.exit(1);
  }
}

run();