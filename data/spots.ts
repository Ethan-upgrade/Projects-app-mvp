export interface Spot {
  id: string;
  name: string;
  englishName: string;
  category: string;
  shortDesc: string;
  imageUrl: string;
}

// Image URLs use Wikimedia Commons' Special:FilePath redirect, which resolves
// a file page title directly to the underlying image asset (stable, real
// photos of each landmark — not placeholder art).
export const spots: Spot[] = [
  {
    id: 'the-bund',
    name: '外滩',
    englishName: 'The Bund',
    category: '历史建筑',
    shortDesc:
      '黄浦江畔的万国建筑博览群，汇集了哥特式、巴洛克式、罗马式等风格的历史建筑，夜晚可眺望对岸陆家嘴天际线。',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/The_Bund_of_Shanghai.jpg?width=800',
  },
  {
    id: 'yu-garden',
    name: '豫园',
    englishName: 'Yu Garden',
    category: '古典园林',
    shortDesc:
      '始建于明代的江南古典园林，以亭台楼阁、假山池塘著称，毗邻豫园老街和城隍庙。',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shanghai%2C_Yu_Garden.jpg?width=800',
  },
  {
    id: 'oriental-pearl-tower',
    name: '东方明珠塔',
    englishName: 'Oriental Pearl Tower',
    category: '现代地标',
    shortDesc:
      '陆家嘴地标广播电视塔，塔身由多个球体串联而成，设有观光层和旋转餐厅，是上海天际线的标志性符号。',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shanghai_Oriental_Pearl_Tower.JPG?width=800',
  },
  {
    id: 'shanghai-museum',
    name: '上海博物馆',
    englishName: 'Shanghai Museum',
    category: '博物馆',
    shortDesc:
      '中国古代艺术专题性博物馆，馆藏青铜器、陶瓷器、书画等文物逾百万件，是了解中国历史的重要窗口。',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/The_shanghai_museum.jpg?width=800',
  },
  {
    id: 'tianzifang',
    name: '田子坊',
    englishName: 'Tianzifang',
    category: '文创街区',
    shortDesc:
      '由老式石库门里弄改造而成的创意街区，遍布画廊、工作室、咖啡馆和手工艺品店，充满市井气息与艺术氛围。',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tianzifang_%E7%94%B0%E5%AD%90%E6%96%B9_-_panoramio.jpg?width=800',
  },
  {
    id: 'jingan-temple',
    name: '静安寺',
    englishName: "Jing'an Temple",
    category: '宗教场所',
    shortDesc:
      '始建于三国时期的密教古寺，坐落于南京西路商圈中央，金顶大殿与周边高楼形成独特的都市禅意景观。',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Jing%27an_Temple_Shanghai_6.jpg?width=800',
  },
];
