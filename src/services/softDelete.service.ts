import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";

const softDeleteService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User)
    
    const users = await userRepository.find()

    const account = users.find(user => user.id === id)

    if(!account){
        return false
    }

    if(!account.isActive){
        throw new Error("User is alredy inactive")
    }

    await userRepository.update(account.id, {
        isActive: false
    })

    return true
}

export default softDeleteService