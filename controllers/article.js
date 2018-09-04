const ArticleModel = require('../model/article')
const APIError = require('../util/rest').APIError
let articleController = {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    'post /api/v1/article': async(ctx) => {
        let req = ctx.request.body
        req.author = ctx.user.nickname
        req.userId = ctx.user.id
        if (req.title && req.author && req.content && req.category) {
            let ret = await ArticleModel.createArticle(req)
            if (ret) {
                ctx.rest()
            } else {
                throw new APIError('error', '创建文章失败，请重试')
            }
            ctx.response.status = 200
        } else {
            throw new APIError('param_error', '创建文章失败，请求参数不能为空！')
        }
    },
    /**
     * 获取文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    'get /api/v1/article': async(ctx) => {
        let req = ctx.request.body

        if (req) {
            const data = await ArticleModel.getArticleList()

            ctx.response.status = 200
            ctx.body = statusCode.SUCCESS_200('查询文章列表成功！', data)
        } else {
            ctx.response.status = 412
            ctx.body = statusCode.ERROR_412('查询文章列表失败！')
        }
    },
    /**
     * 查询单条文章数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    'get /article/:id': async(ctx) => {
        let id = ctx.params.id

        if (id) {
            let data = await ArticleModel.getArticleDetail(id)

            ctx.response.status = 200
            ctx.body = statusCode.SUCCESS_200('查询成功！', data)
        } else {
            ctx.response.status = 412
            ctx.body = statusCode.ERROR_412('文章ID必须传')
        }
    },
    /**
     * 删除文章数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    'delete /article/:id': async(ctx) => {
        let id = ctx.params.id

        if (id && !isNaN(id)) {
            await ArticleModel.deleteArticle(id)

            ctx.response.status = 200
            ctx.body = statusCode.SUCCESS_200('删除文章成功！')
        } else {
            ctx.response.status = 412
            ctx.body = statusCode.ERROR_412('文章ID必须传！')
        }
    },
    /**
     * 更新文章数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    'put /api/v1/updateArticle': async(ctx) => {
        let req = ctx.request.body
        req.author = ctx.user.nickname
        req.userId = ctx.user.id
        if (req.title && req.author && req.content && req.category && req.id) {
            let ret = await ArticleModel.updateArticle(req)
            if (ret) {
                ctx.rest(ret)
            } else {
                throw new APIError('error', '更新文章失败，请重试')
            }
        } else {
            throw new APIError('param_error', '更新文章失败，请求参数不能为空！')
        }
    }

}
/*class articleController {
    /!**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     *!/
    static async create(ctx) {
        let req = ctx.request.body;

        if (req.title && req.author && req.content && req.category) {
            let ret = await ArticleModel.createArticle(req);
            let data = await ArticleModel.getArticleDetail(ret.id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('创建文章成功', data)
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('创建文章失败，请求参数不能为空！')
        }
    }

    /!**
     * 获取文章列表
     * @param ctx
     * @returns {Promise.<void>}
     *!/
    static async getArticleList(ctx) {
        let req = ctx.request.body

        if (req) {
            const data = await ArticleModel.getArticleList();

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询文章列表成功！', data)
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('查询文章列表失败！');
        }

    }

    /!**
     * 查询单条文章数据
     * @param ctx
     * @returns {Promise.<void>}
     *!/
    static async detail(ctx) {
        let id = ctx.params.id;

        if (id) {
            let data = await ArticleModel.getArticleDetail(id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询成功！', data)
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('文章ID必须传');
        }
    }


    /!**
     * 删除文章数据
     * @param ctx
     * @returns {Promise.<void>}
     *!/
    static async delete(ctx) {
        let id = ctx.params.id;

        if (id && !isNaN(id)) {
            await ArticleModel.deleteArticle(id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('删除文章成功！')
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('文章ID必须传！');
        }
    }

    /!**
     * 更新导航条数据
     * @param ctx
     * @returns {Promise.<void>}
     *!/
    static async update(ctx) {
        let req = ctx.request.body;
        let id = ctx.params.id;

        if (req) {
            await ArticleModel.updateArticle(id, req);
            let data = await ArticleModel.getArticleDetail(id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('更新文章成功！', data);
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('更新文章失败！')
        }
    }
}*/

module.exports = articleController
