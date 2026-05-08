const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser();

async function run() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log('ID 확인용 (앞자리 일부):', chatId?.substring(0, 3)); // ID가 제대로 들어오는지 확인

  try {
    const feed = await parser.parseURL('https://news.hada.io/rss');
    const latestItem = feed.items[0];
    const message = `🚀 테스트 알림\n\n제목: ${latestItem.title}`;

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
    console.log('성공했습니다!');
  } catch (error) {
    if (error.response) {
      // 텔레그램 서버가 보내주는 실제 에러 상세 정보
      console.error('--- 텔레그램 에러 상세 ---');
      console.error('Status:', error.response.status);
      console.error('Description:', error.response.data.description); 
      console.error('-----------------------');
    } else {
      console.error('Network Error:', error.message);
    }
    process.exit(1);
  }
}

run();