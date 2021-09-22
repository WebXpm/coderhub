const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
    //1.取出所有添加的标签
    const {labels} = ctx.request.body
    //2.判断标签有无? 无：添加在label表中
    const newLabels = []
    for(let name of labels){
        const labelResult = await labelService.getLabelByName(name)
        const label = { name }
        if(!labelResult){
            const result = await labelService.create(name)
            label.id = result.insertId
        }else{
            label.id = labelResult.id
        }
        newLabels.push(label)
    }
    
    ctx.labels = newLabels
    await next()
}

module.exports = {
    verifyLabelExists
}