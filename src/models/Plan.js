export default class Plan {

    constructor(name, feature, netPriceMonthly, netPriceYearly, taxRate) {

        this.name = name
        this.feature = feature
        this.netPriceMonthly = netPriceMonthly
        this.netPriceYearly = netPriceYearly
        this.taxRate = taxRate
    }

}