export default class ChoosedPlan {

    constructor(uuid,name, netPrice, taxRate, subscriptionType) {
        this.uuid = uuid
        this.name = name
        this.netPrice = netPrice
        this.subscriptionType = subscriptionType
        this.taxRate = taxRate
    }

}