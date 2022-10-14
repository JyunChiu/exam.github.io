import CommonUtils from '../../utils/CommonUtils';
import ApiService from '../ApiService';

const debugStatus = {
  testApi: false,
};

const HomeResource = {
  testApi: (data) => {
    // console.log('Resource -----', data)
    if (debugStatus.testApi) {
      return CommonUtils.fakeApiHelper(200, 'success', {
        error: false,
        message: 'Get successfully',
        test: data
      });
    }
    return ApiService.get(`/Dimensions`, {
      // headers: {"Access-Control-Allow-Origin": "*"}
    });
  },
};

export default HomeResource;
