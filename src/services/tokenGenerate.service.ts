import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import jwt from "jsonwebtoken"
import { IUserLogin } from "../interfaces/users";
import bcrypt from "bcrypt"

const tokenGenerateService = async ({email, password}: IUserLogin) => {

    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    const user = users.find((user) => user.email === email)

    if(!user){
        throw new Error("Wrong email or password")
    }
    
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if(!passwordMatch){
        throw new Error("Wrong email or password")
    }

    const token = jwt.sign(
        {
            email: email,
            isAdm: user.isAdm,
            id: user.id
        },
        String(process.env.SECRET_KEY),
        {expiresIn: '24h'}
    )  

    return token
}

export default tokenGenerateService

