import { Router } from "express";
import dateFormat from "dateformat";
import config from "config";
import QueryString from "qs";
import crypto from "crypto";
//var $ = require('jquery');
const router = Router();

router.get("/create_payment_url", function (req, res, next) {
  var date = new Date();
  var desc =
    "Thanh toan don hang thoi gian: " + dateFormat(date, "yyyy-mm-dd HH:mm:ss");
  res.json({
    title: "Tạo mới đơn hàng",
    amount: 10000,
    description: desc,
  });
});

router.get("/create_payment_url1", function (req, res, next) {
  var ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  var tmnCode = config.get("vnp_TmnCode");
  var secretKey = config.get("vnp_HashSecret");
  var vnpUrl = config.get("vnp_Url");
  var returnUrl = config.get("vnp_ReturnUrl");

  var date = new Date();

  var createDate = dateFormat(date, "yyyymmddHHmmss");
  var orderId = dateFormat(date, "HHmmss");
  // var amount = req.body.amount;
  var bankCode = "NCB";

  //   var orderInfo = req.body.orderDescription;
  //   var orderType = req.body.orderType;
  //   var locale = req.body.language;
  //   if (locale === null || locale === "") {
  //     locale = "vn";
  //   }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toán phí đặt khám";
  vnp_Params["vnp_OrderType"] = "billpayment";
  vnp_Params["vnp_Amount"] = 20000 * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = QueryString.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });
  res.redirect(vnpUrl);
});

function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export default router;
