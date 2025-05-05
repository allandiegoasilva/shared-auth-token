import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  scenarios: {
    baseline: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 20 },
        { duration: '5m', target: 20 },
        { duration: '2m', target: 0 },
      ],
    },
    spike: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 50 },
        { duration: '1m', target: 50 },
        { duration: '1m', target: 0 },
      ],
      startTime: '3m',
    },
    wave: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 30 },
        { duration: '2m', target: 10 },
        { duration: '2m', target: 30 },
        { duration: '2m', target: 10 },
      ],
      startTime: '6m',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // Requisição para /m1-users
  const usersResponse = http.get('http://localhost:8000/m1-users');
  
  check(usersResponse, {
    'users status is 200': (r) => r.status === 200,
    'users response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(randomIntBetween(1, 2));

  // Requisição para /m1-subscriptions/{userId}
  const userId = randomIntBetween(1, 10);
  const subscriptionsResponse = http.get(`http://localhost:8000/m1-subscriptions/${userId}`);
  
  check(subscriptionsResponse, {
    'subscriptions status is 200': (r) => r.status === 200,
    'subscriptions response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(randomIntBetween(1, 2));
}
