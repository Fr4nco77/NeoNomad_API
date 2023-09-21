export interface cartParameters {
    userID: string,
    productID: string,
}

export interface addToCartParameters extends cartParameters {
    quantity: number
}
