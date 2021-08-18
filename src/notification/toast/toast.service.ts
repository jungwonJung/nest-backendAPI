import { Injectable } from '@nestjs/common';

import axios from 'axios';
import * as crypto from 'crypto';

import { ToastSMSResponse } from './toast.entity';

const SMS_VER = 'v2.4';
const MMS_NHN = `https://api-sms.cloud.toast.com/sms/${SMS_VER}/appKeys/T6hmWL6YdzdweUPe/sender/mms`;
const SMS_NHN = `https://api-sms.cloud.toast.com/sms/${SMS_VER}/appKeys/T6hmWL6YdzdweUPe/sender/sms`;

const uri = 'ncp:sms:kr:267146038755:platinum_bridge__notify';
const secretKey = '17XJsUjnc0CSqvAc2btAlpbivukwK9DZswes7F2S';
const accessKey = 'dJbbl1ly6dZyA7gtpMQU';

const URL = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;

interface NaverSMSRequestBody {
  type: 'SMS' | 'LMS' | 'MMS';
  from: '16882813';
  content: string;
  messages: {
    to: string;
  }[];
}

const SMS_REQUEST_BODY = (
  type: NaverSMSRequestBody['type'],
  content: string,
  recipients: string[],
): NaverSMSRequestBody => ({
  type,
  from: '16882813',
  content,
  messages: recipients.map((i) => ({ to: i })),
});

function getByteLength(s: string, a?: any, b?: any, c?: any) {
  for (a = b = 0; (c = s.charCodeAt(b++)); a += c >> 11 ? 3 : c >> 7 ? 2 : 1);
  return a;
}

function makeSignature() {
  const space = ' '; // one space
  const newLine = '\n'; // new line
  const method = 'POST';
  const url2 = `/sms/v2/services/${uri}/messages`;

  const timestamp = Date.now().toString(); // current timestamp (epoch)
  let message = [];
  let hmac = crypto.createHmac('sha256', secretKey);

  message.push(method);
  message.push(space);
  message.push(url2);
  message.push(newLine);
  message.push(timestamp);
  message.push(newLine);
  message.push(accessKey);
  const signature = hmac.update(message.join('')).digest('base64');

  return signature;
}

@Injectable()
export class ToastService {
  constructor() {}

  async sendSMS(param: {
    content: string;
    recipients: string[];
  }): Promise<any> {
    const { content, recipients } = param;

    const body = SMS_REQUEST_BODY(
      getByteLength(content) <= 90 ? 'SMS' : 'LMS',
      content,
      recipients,
    );


    const { data } = await axios.post(URL, body, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-timestamp': Date.now().toString(),
        'x-ncp-apigw-signature-v2': makeSignature(),
      },
    });

    console.log(body)

    return data;
  }
}
