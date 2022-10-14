import team1 from '~~statics/team1.png';
import team2 from '~~statics/team2.png';
import team3 from '~~statics/team3.png';
import team4 from '~~statics/team4.png';
import team5 from '~~statics/team5.png';

import rebas_logo1 from '~~statics/rebas_logo1.svg';
import rebas_logo2 from '~~statics/rebas_logo2.svg';
import rebas_logo3 from '~~statics/rebas_logo3.svg';
import rebas_logo4 from '~~statics/rebas_logo4.svg';
import rebas_logo5 from '~~statics/rebas_logo5.svg';

function mappingColor(team) {
  let result = {}

  switch (team) {
    case '中信兄弟':
      result = {
        primary: '#022442',
        secondary: '#fbcb00',
        playerPhoto: team4,
        logo: rebas_logo4
      }
      break;
    case '富邦悍將':
      result = {
        primary: '#074074',
        secondary: '#a4e6db',
        playerPhoto: team1,
        logo: rebas_logo1
      }
      break
    case '統一7-ELEVEn獅':
      result = {
        primary: '#bb5916',
        secondary: '#e7e39c',
        playerPhoto: team3,
        logo: rebas_logo3
      }
      break;
    case '味全龍':
      result = {
        primary: '#93060b',
        secondary: '#fcd6c1',
        playerPhoto: team2,
        logo: rebas_logo2
      }
      break;
    case '樂天桃園':
      result = {
        primary: '#710F14',
        secondary: '#d1d1d1',
        playerPhoto: team5,
        logo: rebas_logo5
      }
      break;
    default:
      break;
  }


  return result
}


export default mappingColor