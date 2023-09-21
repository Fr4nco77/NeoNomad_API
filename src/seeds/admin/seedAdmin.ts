import { User } from "../../dataBase/models/User";

const seedAdmin = async (): Promise<void> => {
    const user = await User.create({
        name: "Pepe",
        email: "fcarreras777@gmail.com",
        password: "Elpepe37",
        validated: true,
        role: "admin"
    })
    user.hashPassword();
    await user.save();
}

export default seedAdmin;
