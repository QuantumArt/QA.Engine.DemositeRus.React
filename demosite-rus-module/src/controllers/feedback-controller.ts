// FeedbackName: test
// FeedbackMobileOrEmail: test@test.com
// FeedbackText: test

import { checkStatus } from './fetch';

export class FeedbackController {
  constructor(private authHeaders: HeadersInit | null) {}

  sendFeedback(data: any): Promise<Response> {
    let queryStr: string = '';

    return fetch(`feedback/sendfeedback${queryStr}`, {
      method: 'post',
      credentials: 'include',
      headers: {
        ...this.authHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(checkStatus);
  }
}
