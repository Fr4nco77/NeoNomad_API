export interface UserAttributes {
    id: string
    image: string
    name: string
    lastname: string
    role: string
    phone: string
    address: object
    email: string
    password: string
    localRegistration: boolean
    validated: boolean
    isBanned: boolean
    resetToken: string
}

export type optional = "id" | "image" | "lastname" | "role" | "phone" | "address" | "localRegistration" | "isBanned" | "validated" | "resetToken";
