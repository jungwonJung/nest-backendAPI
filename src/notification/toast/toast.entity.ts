export interface ToastSMSResponse {
  header: ToastSMSResponseHeader;
  body: ToastSMSResponseBody;
}

interface SendResultList {
  recipientNo: string;
  resultCode: Number;
  resultMessage: string;
  recipientSeq: Number;
  recipientGroupingKey: string;
}

interface ToastSMSResponseHeader {
  isSuccessful: Boolean;
  resultCode: Number;
  resultMessage: String;
}

interface ToastSMSResponseBody {
  data: {
    requestId: string;
    statusCode: '1' | '2' | '3';
    senderGroupingKey: string;
    sendResultList: SendResultList[];
  };
}
