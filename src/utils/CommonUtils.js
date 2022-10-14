const randomBetween = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
// fakeApiHelper
// responseType: success | fail | random | inOrder
let count = 1;
const fakeApiHelper = (
  interval = 1000,
  responseType = 'success',
  successResponse,
  ErrorResponse = 'SOMETHING_WRONG',
) => {
  return new Promise((resolve, reject) => {
    // 一次成功，一次失敗
    if (responseType === 'inOrder') {
      if (count % 2 === 1) {
        const axiosFormat = { data: successResponse };
        setTimeout(() => resolve(axiosFormat), interval);
      } else {
        const axiosFormat = { data: ErrorResponse };
        setTimeout(() => reject(axiosFormat), interval);
      }
      count += 1;
    }

    // 隨機的回傳成功或失敗
    if (responseType === 'random') {
      const random = randomBetween(1, 100);
      if (random % 2 === 1) {
        const axiosFormat = { data: successResponse };
        setTimeout(() => resolve(axiosFormat), interval);
      } else {
        const axiosFormat = { data: ErrorResponse };
        setTimeout(() => reject(axiosFormat), interval);
      }
      count += 1;
    }

    if (responseType === 'success') {
      const axiosFormat = { data: successResponse };
      setTimeout(() => resolve(axiosFormat), interval);
    }
    if (responseType === 'fail') {
      const axiosFormat = { data: ErrorResponse };
      setTimeout(() => reject(axiosFormat), interval);
    }
  });
};

export default {
  fakeApiHelper,
};
