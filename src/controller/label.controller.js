const labelService = require('../service/label.service.js')
class LabelController {
    async create(ctx, next){
        const { name } = ctx.request.body 
        const result = await labelService.create(name)
        ctx.body = result
    }

    async list(ctx, next){
        const {page, size} = ctx.query
        const result = await labelService.getLabels(page, size)
        ctx.body = result
    }
}

module.exports = new LabelController()