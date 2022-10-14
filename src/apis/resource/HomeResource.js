import CommonUtils from '../../utils/CommonUtils';
import ApiService from '../ApiService';

const debugStatus = {
  testApi: true,
};

const HomeResource = {
  testApi: (data) => {
    console.log('Resource -----', data)
    if (debugStatus.testApi) {
      return CommonUtils.fakeApiHelper(200, 'success', {
        error: false,
        message: 'Get successfully',
        test: data
      });
    }
    return ApiService.get(`/api/photos?limit=10`);
  },
};

export default HomeResource;
