const sample = [
  {
    title: '素质教育综合体：苏州湾实验小学及幼儿园 / 九城都市',
    brief: '充分考虑地区特征和环境特质，凸显了景观风貌，塑造具有鲜明个性和现代化气息的校园建筑。',
    pic: 'http://www.archiposition.com/media/k2/items/cache/00786b2042d15482dc0d2441908ad3ad_L.jpg',
    col_title: '新作品',
    link: '',
    date: '',
    date_format: '12d'
  },
  {
    title: '三个房子三种冲突：高目建筑在奉贤',
    brief: 'GOM高目在上海奉贤区实现的三个风格完全不同的建筑，就如同一个大三和弦的三个音符。',
    pic: 'http://www.archiposition.com/media/k2/items/cache/24ac8218ec2db84c29be7b837cf10e26_L.jpg',
    col_title: '新作品',
    link: '',
    date: '',
    date_format: '11d'
  },
  {
    title: '建筑师中的建筑师：走近阿尔瓦罗·西扎',
    brief: '1933年生于波尔图市郊马托西纽什的西扎，对葡萄牙始终保有一颗赤子之心，对现代主义的完美个人演绎以及对设计的准确把握，为西扎赢得了享誉世界的美名。',
    pic: 'http://www.archiposition.com/media/k2/items/cache/6c39066c758066595ea0d8d8c07e632a_L.jpg',
    col_title: '深度阅读',
    link: '',
    date: '',
    date_format: '11d'
  },
  {
    title: '重构白塔印象：白塔寺胡同美术馆 / DnA建筑事务所',
    brief: '公共，生机，为白塔寺带来新的社区空间和文化交流。',
    pic: 'http://www.archiposition.com/media/k2/items/cache/3138c7366a6ecdf59187027501010d24_L.jpg',
    col_title: '新作品',
    link: '',
    date: '2018-04-03',
    date_format: 'new'
  },
  {
    title: '专访 | 塚本由晴：当代建筑师必须打破的障碍',
    brief: '当代建筑业将建造的意义从人们中间剥离出来，对于产业固化带来的影响，建筑师应时刻警醒。',
    pic: 'http://www.archiposition.com/media/k2/items/cache/beded5272d48bc02bc6b093086c287c2_L.jpg',
    col_title: '人物专访',
    link: '',
    date: '2018-04-02',
    date_format: '1d'
  }
]

export default {
  data () {
    let list = []
    for (let i = 0; i < 20; i++) {
      list[i] = sample[i % 5]
    }

    return {
      status: 'ok',
      data: {
        list: list
      }
    }
  }
}
