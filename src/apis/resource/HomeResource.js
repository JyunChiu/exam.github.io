import CommonUtils from '../../utils/CommonUtils';
import ApiService from '../ApiService';

const debugStatus = {
  getDimensions: false,
  getElements: false,
};

const HomeResource = {
  getDimensions: (data) => {
    // console.log('Resource -----', data)
    if (debugStatus.testApi) {
      return CommonUtils.fakeApiHelper(200, 'success', {
        error: false,
        message: 'Get successfully',
        test: data
      });
    }
    return ApiService.get(`/Dimensions`, {
    });
  },

  getElements: (data) => {
    // console.log('Resource -----', data)
    if (debugStatus.getElements) {
      return CommonUtils.fakeApiHelper(200, 'success', {
        error: false,
        message: 'Get successfully',
        test: data
      });
    }
    return ApiService.get(`/Dimensions('${data}')/Hierarchies('${data}')?$expand=Elements`, {
    });
  },
};

export default HomeResource;
