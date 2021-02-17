const getUserGroup = ()=>{
    return localStorage.getItem("user_group")
}
const user_group = getUserGroup()
const groups = {
    admin:"Admin",
    serviceman:"Tamirci",
    customer:"Customer",
    accountant:"Muhasebe"
}

const home = {
    _name: 'CSidebarNavItem',
    name: 'Anasayfa',
    to: '/dashboard',
    icon: 'cil-speedometer',
}
const actions = {
    _name: 'CSidebarNavTitle',
    _children: ['İşlemler']
}
const current = {
    _name: 'CSidebarNavDropdown',
    name: 'Cari',
    route: '/checking-account',
    icon: 'cil-calculator',
    items: [
        {
            name: 'Cari İşlemler',
            to: '/checking-account/checking-account-list'
        }
    ]
}
const user_actions = {
    _name: 'CSidebarNavDropdown',
    name: 'Kullanıcı İşlemleri',
    route: '/login',
    icon: 'cil-user',
    items: [
        {
            name: 'Login',
            to: '/pages/login'
        },

    ]
}
const customer ={
    _name: 'CSidebarNavDropdown',
    name: 'Müşteri',
    route: '/customer',
    icon: 'cil-user',
    items: [
        {
            name: 'Müşteri',
            to: '/customer/customer'
        }
    ]
}
const catalog ={
    _name: 'CSidebarNavDropdown',
    name: 'Katalog',
    route: '/category',
    icon: 'cil-star',
    items: [
        {
            name: 'Kategori',
            to: '/catalog/category'
        },
        {
            name: 'Ürünler',
            to: '/catalog/product-list'
        },
        {
            name: 'Marka',
            to: '/catalog/brand'
        }
    ]
}
const staff = {
    _name: 'CSidebarNavDropdown',
    name: 'Personel',
    route: '/staff',
    icon: 'cil-star',
    items: [
        {
            name: 'Personel İşlemleri',
            to: '/staff/staff-operations'
        }
    ]
}
const services = {
    _name: 'CSidebarNavDropdown',
    name: 'Servis',
    route: '/service',
    icon: 'cil-star',
    items: [
        {
            name: 'Servis Listesi',
            to: '/service/service-list'
        }
    ]
}

var items =[]
items.push(home)
items.push(actions)
if(user_group === groups.admin || user_group === groups.accountant)
{
    items.push(current)
}
items.push(user_actions)
if(user_group === groups.admin || user_group === groups.accountant || user_group===groups.customer)
{
    items.push(customer)
}
if(user_group === groups.admin || user_group === groups.serviceman)
{
    items.push(catalog)
}

if(user_group === groups.admin)
{
    items.push(staff)
}
if(user_group === groups.admin || user_group === groups.serviceman || user_group===groups.customer)
{
    items.push(services)
}
export default [
    {
        _name: 'CSidebarNav',
        _children: items
    }
]