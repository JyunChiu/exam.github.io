import {fakeApiHelper} from '~~utils/CommonUtils';
import ApiService from '../ApiService';

const debugStatus = {
  getDimensions: false,
  getElements: false,
  getTableByMdx: false,
  getCells: false,
};

const HomeResource = {
  getDimensions: (data) => {
    // console.log('Resource -----', data)
    if (debugStatus.testApi) {
      return fakeApiHelper(200, 'success', {
        error: false,
        message: 'Get successfully',
        test: data
      });
    }
    return ApiService.get('/Dimensions');
  },

  getElements: (data) => {
    // console.log('Resource -----', data)
    if (debugStatus.getElements) {
      return fakeApiHelper(200, 'success', {
        error: false,
        message: 'Get successfully',
        test: data
      });
    }
    return ApiService.get(`/Dimensions('${data}')/Hierarchies('${data}')?$expand=Elements`);
  },

  getTableByMdx: (data) => {
    if (debugStatus.getTableByMdx) {
      return fakeApiHelper(200, 'success', {
        error: false,
        message: 'Get successfully',
        test: data
      });
    }
    return ApiService.post(
      `/ExecuteMDX?$expand=Axes($expand=Hierarchies($select=Name;$expand=Dimension($select=Name)),Tuples($expand=Members($select=Name,UniqueName,Attributes,DisplayInfoAbove,DisplayInfo;$expand=Parent($select=UniqueName);$expand=Element($select=Name,Type,Level))))`,
      { data }
    );
  },

  getCells: (data) => {
    if (debugStatus.getCells) {
      return fakeApiHelper(200, 'success', {
        error: false,
        message: 'Get successfully',
        test: data
      });
    }
    return ApiService.get(
      `/Cellsets('${data}')?$expand=Cells($select=Status,Value,Updateable,Consolidated,RuleDerived,HasPicklist,FormatString,Ordinal,Annotated)`,
    );
  },

};

export default HomeResource;
