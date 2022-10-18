import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import { IUserUpdate } from "../interfaces/users";
import bcrypt from "bcrypt"

const updateUserService = async ({id, name, email, password}: IUserUpdate) => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const account = users.find(user => user.id === id)

    if(!account){
        throw new Error("Users not found")
    }

    await userRepository.update(account.id, {
        name: name || account.name,
        email: email || account.email,
        password: password || account.password,
        createdAt: account.createdAt,
        updatedAt: new Date(),
    })
    return true
}

export default updateUserService