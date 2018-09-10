const {UserModel} = require('../model/index')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret')
const bcrypt = require('bcryptjs')
//const util = require('util')
//const verify = util.promisify(jwt.verify)
const APIError = require('../util/rest').APIError
class StringUtils {
    /**
     * 验证用户名 用户名首个字符为字母,包含._数字 字母 至少五位
     * @param username
     * @returns {boolean}
     */
    static checkEmail(email) {
        let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        return reg.test(email)
    }
    /**
     * 验证用户名 用户名首个字符为字母,包含._数字 字母 至少五位
     * @param username
     * @returns {boolean}
     */
    static checkUsername(username) {
        let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/
        return reg.test(username)
    }
    /**
     * 验证密码 密码同时包含数字和字母 字少六位
     * @param password
     * @returns {boolean}
     */
    static checkPwd(password) {
        let reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
        return reg.test(password)
    }
    /**
     * 随机名字
     * @param password
     * @returns {boolean}
     */
    static randName() {
        let nicheng_tou = [
            '快乐的',
            '冷静的',
            '醉熏的',
            '潇洒的',
            '糊涂的',
            '积极的',
            '冷酷的',
            '深情的',
            '粗暴的',
            '温柔的',
            '可爱的',
            '愉快的',
            '义气的',
            '认真的',
            '威武的',
            '帅气的',
            '传统的',
            '潇洒的',
            '漂亮的',
            '自然的',
            '专一的',
            '听话的',
            '昏睡的',
            '狂野的',
            '等待的',
            '搞怪的',
            '幽默的',
            '魁梧的',
            '活泼的',
            '开心的',
            '高兴的',
            '超帅的',
            '留胡子的',
            '坦率的',
            '直率的',
            '轻松的',
            '痴情的',
            '完美的',
            '精明的',
            '无聊的',
            '有魅力的',
            '丰富的',
            '繁荣的',
            '饱满的',
            '炙热的',
            '暴躁的',
            '碧蓝的',
            '俊逸的',
            '英勇的',
            '健忘的',
            '故意的',
            '无心的',
            '土豪的',
            '朴实的',
            '兴奋的',
            '幸福的',
            '淡定的',
            '不安的',
            '阔达的',
            '孤独的',
            '独特的',
            '疯狂的',
            '时尚的',
            '落后的',
            '风趣的',
            '忧伤的',
            '大胆的',
            '爱笑的',
            '矮小的',
            '健康的',
            '合适的',
            '玩命的',
            '沉默的',
            '斯文的',
            '香蕉',
            '苹果',
            '鲤鱼',
            '鳗鱼',
            '任性的',
            '细心的',
            '粗心的',
            '大意的',
            '甜甜的',
            '酷酷的',
            '健壮的',
            '英俊的',
            '霸气的',
            '阳光的',
            '默默的',
            '大力的',
            '孝顺的',
            '忧虑的',
            '着急的',
            '紧张的',
            '善良的',
            '凶狠的',
            '害怕的',
            '重要的',
            '危机的',
            '欢喜的',
            '欣慰的',
            '满意的',
            '跳跃的',
            '诚心的',
            '称心的',
            '如意的',
            '怡然的',
            '娇气的',
            '无奈的',
            '无语的',
            '激动的',
            '愤怒的',
            '美好的',
            '感动的',
            '激情的',
            '激昂的',
            '震动的',
            '虚拟的',
            '超级的',
            '寒冷的',
            '精明的',
            '明理的',
            '犹豫的',
            '忧郁的',
            '寂寞的',
            '奋斗的',
            '勤奋的',
            '现代的',
            '过时的',
            '稳重的',
            '热情的',
            '含蓄的',
            '开放的',
            '无辜的',
            '多情的',
            '纯真的',
            '拉长的',
            '热心的',
            '从容的',
            '体贴的',
            '风中的',
            '曾经的',
            '追寻的',
            '儒雅的',
            '优雅的',
            '开朗的',
            '外向的',
            '内向的',
            '清爽的',
            '文艺的',
            '长情的',
            '平常的',
            '单身的',
            '伶俐的',
            '高大的',
            '懦弱的',
            '柔弱的',
            '爱笑的',
            '乐观的',
            '耍酷的',
            '酷炫的',
            '神勇的',
            '年轻的',
            '唠叨的',
            '瘦瘦的',
            '无情的',
            '包容的',
            '顺心的',
            '畅快的',
            '舒适的',
            '靓丽的',
            '负责的',
            '背后的',
            '简单的',
            '谦让的',
            '彩色的',
            '缥缈的',
            '欢呼的',
            '生动的',
            '复杂的',
            '慈祥的',
            '仁爱的',
            '魔幻的',
            '虚幻的',
            '淡然的',
            '受伤的',
            '雪白的',
            '高高的',
            '糟糕的',
            '顺利的',
            '闪闪的',
            '羞涩的',
            '缓慢的',
            '迅速的',
            '优秀的',
            '聪明的',
            '含糊的',
            '俏皮的',
            '淡淡的',
            '坚强的',
            '平淡的',
            '欣喜的',
            '能干的',
            '灵巧的',
            '友好的',
            '机智的',
            '机灵的',
            '正直的',
            '谨慎的',
            '俭朴的',
            '殷勤的',
            '虚心的',
            '辛勤的',
            '自觉的',
            '无私的',
            '无限的',
            '踏实的',
            '老实的',
            '现实的',
            '可靠的',
            '务实的',
            '拼搏的',
            '个性的',
            '粗犷的',
            '活力的',
            '成就的',
            '勤劳的',
            '单纯的',
            '落寞的',
            '朴素的',
            '悲凉的',
            '忧心的',
            '洁净的',
            '清秀的',
            '自由的',
            '小巧的',
            '单薄的',
            '贪玩的',
            '刻苦的',
            '干净的',
            '壮观的',
            '和谐的',
            '文静的',
            '调皮的',
            '害羞的',
            '安详的',
            '自信的',
            '端庄的',
            '坚定的',
            '美满的',
            '舒心的',
            '温暖的',
            '专注的',
            '勤恳的',
            '美丽的',
            '腼腆的',
            '优美的',
            '甜美的',
            '甜蜜的',
            '整齐的',
            '动人的',
            '典雅的',
            '尊敬的',
            '舒服的',
            '妩媚的',
            '秀丽的',
            '喜悦的',
            '甜美的',
            '彪壮的',
            '强健的',
            '大方的',
            '俊秀的',
            '聪慧的',
            '迷人的',
            '陶醉的',
            '悦耳的',
            '动听的',
            '明亮的',
            '结实的',
            '魁梧的',
            '标致的',
            '清脆的',
            '敏感的',
            '光亮的',
            '大气的',
            '老迟到的',
            '知性的',
            '冷傲的',
            '呆萌的',
            '野性的',
            '隐形的',
            '笑点低的',
            '微笑的',
            '笨笨的',
            '难过的',
            '沉静的',
            '火星上的',
            '失眠的',
            '安静的',
            '纯情的',
            '要减肥的',
            '迷路的',
            '烂漫的',
            '哭泣的',
            '贤惠的',
            '苗条的',
            '温婉的',
            '发嗲的',
            '会撒娇的',
            '贪玩的',
            '执着的',
            '眯眯眼的',
            '花痴的',
            '想人陪的',
            '眼睛大的',
            '高贵的',
            '傲娇的',
            '心灵美的',
            '爱撒娇的',
            '细腻的',
            '天真的',
            '怕黑的',
            '感性的',
            '飘逸的',
            '怕孤独的',
            '忐忑的',
            '高挑的',
            '傻傻的',
            '冷艳的',
            '爱听歌的',
            '还单身的',
            '怕孤单的',
            '懵懂的'
        ]
        let nicheng_wei = [
            '嚓茶',
            '凉面',
            '便当',
            '毛豆',
            '花生',
            '可乐',
            '灯泡',
            '哈密瓜',
            '野狼',
            '背包',
            '眼神',
            '缘分',
            '雪碧',
            '人生',
            '牛排',
            '蚂蚁',
            '飞鸟',
            '灰狼',
            '斑马',
            '汉堡',
            '悟空',
            '巨人',
            '绿茶',
            '自行车',
            '保温杯',
            '大碗',
            '墨镜',
            '魔镜',
            '煎饼',
            '月饼',
            '月亮',
            '星星',
            '芝麻',
            '啤酒',
            '玫瑰',
            '大叔',
            '小伙',
            '哈密瓜，数据线',
            '太阳',
            '树叶',
            '芹菜',
            '黄蜂',
            '蜜粉',
            '蜜蜂',
            '信封',
            '西装',
            '外套',
            '裙子',
            '大象',
            '猫咪',
            '母鸡',
            '路灯',
            '蓝天',
            '白云',
            '星月',
            '彩虹',
            '微笑',
            '摩托',
            '板栗',
            '高山',
            '大地',
            '大树',
            '电灯胆',
            '砖头',
            '楼房',
            '水池',
            '鸡翅',
            '蜻蜓',
            '红牛',
            '咖啡',
            '机器猫',
            '枕头',
            '大船',
            '诺言',
            '钢笔',
            '刺猬',
            '天空',
            '飞机',
            '大炮',
            '冬天',
            '洋葱',
            '春天',
            '夏天',
            '秋天',
            '冬日',
            '航空',
            '毛衣',
            '豌豆',
            '黑米',
            '玉米',
            '眼睛',
            '老鼠',
            '白羊',
            '帅哥',
            '美女',
            '季节',
            '鲜花',
            '服饰',
            '裙子',
            '白开水',
            '秀发',
            '大山',
            '火车',
            '汽车',
            '歌曲',
            '舞蹈',
            '老师',
            '导师',
            '方盒',
            '大米',
            '麦片',
            '水杯',
            '水壶',
            '手套',
            '鞋子',
            '自行车',
            '鼠标',
            '手机',
            '电脑',
            '书本',
            '奇迹',
            '身影',
            '香烟',
            '夕阳',
            '台灯',
            '宝贝',
            '未来',
            '皮带',
            '钥匙',
            '心锁',
            '故事',
            '花瓣',
            '滑板',
            '画笔',
            '画板',
            '学姐',
            '店员',
            '电源',
            '饼干',
            '宝马',
            '过客',
            '大白',
            '时光',
            '石头',
            '钻石',
            '河马',
            '犀牛',
            '西牛',
            '绿草',
            '抽屉',
            '柜子',
            '往事',
            '寒风',
            '路人',
            '橘子',
            '耳机',
            '鸵鸟',
            '朋友',
            '苗条',
            '铅笔',
            '钢笔',
            '硬币',
            '热狗',
            '大侠',
            '御姐',
            '萝莉',
            '毛巾',
            '期待',
            '盼望',
            '白昼',
            '黑夜',
            '大门',
            '黑裤',
            '钢铁侠',
            '哑铃',
            '板凳',
            '枫叶',
            '荷花',
            '乌龟',
            '仙人掌',
            '衬衫',
            '大神',
            '草丛',
            '早晨',
            '心情',
            '茉莉',
            '流沙',
            '蜗牛',
            '战斗机',
            '冥王星',
            '猎豹',
            '棒球',
            '篮球',
            '乐曲',
            '电话',
            '网络',
            '世界',
            '中心',
            '鱼',
            '鸡',
            '狗',
            '老虎',
            '鸭子',
            '雨',
            '羽毛',
            '翅膀',
            '外套',
            '火',
            '丝袜',
            '书包',
            '钢笔',
            '冷风',
            '八宝粥',
            '烤鸡',
            '大雁',
            '音响',
            '招牌',
            '胡萝卜',
            '冰棍',
            '帽子',
            '菠萝',
            '蛋挞',
            '香水',
            '泥猴桃',
            '吐司',
            '溪流',
            '黄豆',
            '樱桃',
            '小鸽子',
            '小蝴蝶',
            '爆米花',
            '花卷',
            '小鸭子',
            '小海豚',
            '日记本',
            '小熊猫',
            '小懒猪',
            '小懒虫',
            '荔枝',
            '镜子',
            '曲奇',
            '金针菇',
            '小松鼠',
            '小虾米',
            '酒窝',
            '紫菜',
            '金鱼',
            '柚子',
            '果汁',
            '百褶裙',
            '项链',
            '帆布鞋',
            '火龙果',
            '奇异果',
            '煎蛋',
            '唇彩',
            '小土豆',
            '高跟鞋',
            '戒指',
            '雪糕',
            '睫毛',
            '铃铛',
            '手链',
            '香氛',
            '红酒',
            '月光',
            '酸奶',
            '银耳汤',
            '咖啡豆',
            '小蜜蜂',
            '小蚂蚁',
            '蜡烛',
            '棉花糖',
            '向日葵',
            '水蜜桃',
            '小蝴蝶',
            '小刺猬',
            '小丸子',
            '指甲油',
            '康乃馨',
            '糖豆',
            '薯片',
            '口红',
            '超短裙',
            '乌冬面',
            '冰淇淋',
            '棒棒糖',
            '长颈鹿',
            '豆芽',
            '发箍',
            '发卡',
            '发夹',
            '发带',
            '铃铛',
            '小馒头',
            '小笼包',
            '小甜瓜',
            '冬瓜',
            '香菇',
            '小兔子',
            '含羞草',
            '短靴',
            '睫毛膏',
            '小蘑菇',
            '跳跳糖',
            '小白菜',
            '草莓',
            '柠檬',
            '月饼',
            '百合',
            '纸鹤',
            '小天鹅',
            '云朵',
            '芒果',
            '面包',
            '海燕',
            '小猫咪',
            '龙猫',
            '唇膏',
            '鞋垫',
            '羊',
            '黑猫',
            '白猫',
            '万宝路',
            '金毛',
            '山水',
            '音响'
        ]
        function RandomNumBoth(Min, Max) {
            let Range = Max - Min
            let Rand = Math.random()
            return Min + Math.round(Rand * Range) //四舍五入
        }
        return `${nicheng_tou[RandomNumBoth(0, 331)]}${nicheng_wei[RandomNumBoth(0, 325)]}`
    }
}
//url命名规则underline
let UserController = {
    /**
     * 注册
     * @param ctx
     * @returns {Promise.<void>}
     */
    'post /api/v1/user/sign_up': async(ctx) => {
        const user = ctx.request.body
        if (!StringUtils.checkEmail(user.email)) {
            throw new APIError('username_format_error', '用户名格式不对')
        }
        if (!StringUtils.checkPwd(user.password)) {
            throw new APIError('password_format_error', '密码格式不对')
        }
        if (user.email && user.password) {
            // 查询用户名是否重复
            const existUser = await UserModel.findUserByName(user.email)

            if (existUser) {
                // 反馈存在用户名
                throw new APIError('username_exists', '此用户已经存在')
            } else {
                // 加密密码
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(user.password, salt)
                user.password = hash
                user.nickname = StringUtils.randName() //生成随机名字
                user.headImg = 'http://msports.eastday.com/h5/img/portrait.png'
                user.loginIp = ctx.ip || '::ffff:127.0.0.1'
                // 创建用户
                let newUser = await UserModel.create(user)
                if (!newUser) throw new APIError('user_error', '创建用户失败,请重试')
                //const newUser = await UserModel.findUserByName(user.username)
                // 签发token
                const userToken = {
                    nickname: newUser.nickname,
                    headImg: newUser.headImg,
                    id: newUser.id,
                }
                // 储存token失效有效期1小时
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '24h'})
                ctx.cookies.set('token', token, {
                    domain: '172.20.6.219', // 写cookie所在的域名
                    path: '/', // 写cookie所在的路径
                    maxAge: 10 * 60 * 1000, // cookie有效时长
                    expires: new Date('2018-02-15'), // cookie失效时间
                    httpOnly: false, // 是否只用于http请求中获取
                    overwrite: false // 是否允许重写
                })
                let data = {
                    nickname: newUser.nickname,
                    headImg: newUser.headImg,
                    id: newUser.id,
                    token: token
                }
                ctx.rest(data)
            }
        }
    },
    /**
     * 登录
     * @param ctx
     * @returns {Promise<void>}
     */
    'post /api/v1/user/sign_in': async(ctx) => {
        const data = ctx.request.body
        if (!StringUtils.checkEmail(data.email)) {
            throw new APIError('username_format_error', '用户名格式不对')
        }
        if (!StringUtils.checkPwd(data.password)) {
            throw new APIError('password_format_error', '密码格式不对')
        }
        // 查询用户
        const user = await UserModel.findUserByName(data.email)
        // 判断用户是否存在
        if (user) {
            // 判断前端传递的用户密码是否与数据库密码一致
            if (bcrypt.compareSync(data.password, user.password)) {
                // 用户token
                const userToken = {
                    nickname: user.nickname,
                    headImg: user.headImg,
                    id: user.id,
                }
                // 签发token
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '24h'})
                let data = {
                    nickname: user.nickname,
                    headImg: user.headImg,
                    id: user.id,
                    token: token
                }
                ctx.rest(data)
            } else {
                //密码错误
                throw new APIError('pwd_error', '用户名或密码错误')
            }
        } else {
            //此用户不存在 为了防止用户名撞库,提示此信息
            throw new APIError('user_error', '用户名或密码错误')
        }
    },
    /**
     * 退出
     * @param ctx
     * @returns {Promise.<void>}
     */
    'post /api/v1/user/sign_out': async(ctx) => {
        const data = ctx.request.body
        if (!StringUtils.checkUsername(data.username)) {
            throw new APIError('username_format_error', '用户名格式不对')
        }
        if (!StringUtils.checkPwd(data.password)) {
            throw new APIError('password_format_error', '密码格式不对')
        }
        // 查询用户
        const user = await UserModel.findUserByName(data.username)
        // 判断用户是否存在
        if (user) {
            // 判断前端传递的用户密码是否与数据库密码一致
            if (bcrypt.compareSync(data.password, user.password)) {
                // 用户token
                const userToken = {
                    username: user.username,
                    id: user.id
                }
                // 签发token
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'})
                let data = {
                    id: user.id,
                    username: user.username,
                    token: token
                }
                ctx.rest(data)
            } else {
                //密码错误
                throw new APIError('pwd_error', '用户名或密码错误')
            }
        } else {
            //此用户不存在 为了防止用户名撞库,提示此信息
            throw new APIError('user_error', '用户名或密码错误')
        }
    },
    /**
     * 查询用户信息
     * @param ctx
     * @returns {Promise<void>}
     */
    'get /api/v1/get_user_info': async(ctx) => {
        ctx.rest(ctx.user)
        // 获取jwt
        /*const token = ctx.header.authorization
        if (token) {
            let payload
            try {
                // 解密payload，获取用户名和ID1
                payload = await verify(token.split(' ')[1], secret.sign)
                const user = {
                    id: payload.id,
                    username: payload.username
                }
                ctx.rest(user)
            } catch (err) {
                throw new APIError('token verify fail', '查询失败!')
            }
        } else {
            throw new APIError('authorization not find', 'token值为空')
        }*/
    },
    /**
     * 删除用户
     * @param ctx
     * @returns {Promise<void>}
     */
    'delete /api/v1/user/:id': async(ctx) => {
        let id = ctx.params.id

        if (id && !isNaN(id)) {
            await UserModel.delete(id)
            ctx.rest('删除用户成功')
        } else {
            throw new APIError('ID_error', '无用户ID')
        }
    },
    /**
     * 获取用户列表
     * @param ctx
     * @returns {Promise<void>}
     */
    'get /api/v1/user/get_user_role': async(ctx) => {
        let id = ctx.user.id
        const data = await UserModel.getUserRole(id)
        ctx.rest(data)
    },
    /*'get /public/bus/Getstop': async(ctx, next) => {
        try {
            await request.post('http://shanghaicity.openservice.kankanews.com/public/bus/Getstop')
            .send('stoptype=1')
            .send('stopid=7.')
            .send('sid=6a005acd04da149bfaf0e2ba52f16077')
            .set({ Accept: '*!/!*',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive',
                'Content-Length': '57',
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: '_ga=GA1.2.1373205916.1533562785; HA=e7436beb7035e5dc36dfd05d044aa262c2d655d6; HB=ZTc0MzZiZWI3MDM1ZTVkYzM2ZGZkMDVkMDQ0YWEyNjJjMmQ2NTVkNg==; HC=1f003f1eb1d2071f5bef8995b16a333c1fa27cd1; HD=MjAxODA4MDY=; HG=23ee3aba1f7b177f38e9128d8244255d162c5ff9; HH=dc6335c75dc45f30c611d47e14bb86aad8c6a5e6; HK=940feaf29d29419ef2aba948ba67989cea5d6f41; HO=TWpBeE9EQTRNRFk9MjFNVFF3TWpBMzM5VFc5NmFXeHNZUzgxTGpBZ0tHbFFhRzl1WlRzZ1ExQlZJR2xRYUc5dVpTQlBVeUF4TVY4MFh6RWdiR2xyWlNCTllXTWdUMU1nV0NrZ1FYQndiR1ZYWldKTGFYUXZOakExTGpFdU1UVWdLRXRJVkUxTUxDQnNhV3RsSUVkbFkydHZLU0JOYjJKcGJHVXZNVFZITnpjZ1RXbGpjbTlOWlhOelpXNW5aWEl2Tmk0M0xqRWdUbVYwVkhsd1pTOVhTVVpKSUV4aGJtZDFZV2RsTDNwb1gwTk8xZjJlNTFjMWE3MzBkMmQ0MzE0Yzc5NDY5NmI4ZWEwZmEzMjdiMmE0; HY=MjAxODA4MDY=940feaf29d29419ef2aba948ba67989cea5d6f4123ee3aba1f7b177f38e9128d8244255d162c5ff91f2e51c1a730d2d4314c794696b8ea0fa327b2a4; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNFtoT6NrJQcTDgsfAg==; _gat=1; Hm_1vt_6f69830ae7173059e935b61372431b35=eSgsNFtoT6BrJQcTDgsYAg==',
                Host: 'shanghaicity.openservice.kankanews.com',
                Origin: 'http://shanghaicity.openservice.kankanews.com',
                Pragma: 'no-cache',
                Referer: 'http://shanghaicity.openservice.kankanews.com/public/bus/mes/sid/6a005acd04da149bfaf0e2ba52f16077/stoptype/1',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
                'X-Requested-With': 'XMLHttpRequest'})
            .then(function(res) {
                //ctx.rest(res.text)
                ctx.response.body = {
                    code: '200',
                    message: 'success',
                    data: JSON.parse(res.text)
                }
            })
        } catch (e) {
            throw new APIError('error', e)
        }
    }*/
    //role数据创建
    'post /api/v1/set_user_role': async(ctx) => {
        let body = ctx.request.body
        const data = await UserModel.createUserRole(ctx.user.id, body.roleid)
        ctx.rest(data)
    }
}
module.exports = UserController
