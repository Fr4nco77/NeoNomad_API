export interface ProductAttributes {
    name: string
    description: string
    image: string
    price: number
    categoryName: string
}

interface Querys {
    sortBy: string
    sortOrder: string
    page: string
    limit: string
}

export interface QuerysUser extends Querys {
    name: string
    lastname: string
    email: string
    localRegistration: boolean
    validated: boolean
    isBanned: boolean
}

export interface QuerysOrder extends Querys {
    status: string
}
