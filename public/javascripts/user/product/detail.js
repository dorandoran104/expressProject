// const CHANNELKEY = process.env.PORTONE_CHANNEL_KEY;
// const STOREKEY = process.env.PORTONE_STORE_KEY
// const dotenv = require("dotenv").config();

// const jwt = require('jsonwebtoken');
// const dotenv = require("dotenv").config();
// const secretKey = process.env.JWT_SECRET_KEY;

const payment_button = document.querySelector('.payment_button');

payment_button.addEventListener('click',async ()=>{
  const response = await PortOne.requestPayment({
    // Store ID 설정
    storeId: "store-297882d7-b2b2-4a9c-b6c2-6853f113a43e",
    // 채널 키 설정
    channelKey: "channel-key-bd31c466-bac2-4f04-9f09-9ced2c646e40",
    paymentId: `payment-121241`,
    orderName: "나이키 와플 트레이너 2 SD",
    totalAmount: 1000,
    currency: "CURRENCY_KRW",
    payMethod: "CARD",
  });
})

