export interface Iproduct {
    _id: string
    name: string
    description: string
    price: number
    image: string
    createdAt: string
    updatedAt: string
}


export interface IUser {
    name: string
    email: string
}

export interface IOrderItem {
    name: string
    quantity: number
    image: string
    price: number
    product: string
}

export interface IDeliveryAddress {
    address: string
    city: string
}

export interface IOrder {
    _id: string
    user: string
    orderItem: IOrderItem[]
    deliveryAddress: IDeliveryAddress
    paymentDetail: {}
    paymentIntentId: string
    paymentStatus: string
    totalPrice: number
    createdAt: string
    updatedAt: string
}
