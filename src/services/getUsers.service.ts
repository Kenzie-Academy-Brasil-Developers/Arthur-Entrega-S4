import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import { IUser } from "../interfaces/users";


const getUsersService = async () => {

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    if(!users){
        throw new Error("Users not found")
    }

    const usersReturn = users.map((user) => {
        const newUser: IUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdm: user.isAdm,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return newUser
    })

    return usersReturn
}

export default getUsersService