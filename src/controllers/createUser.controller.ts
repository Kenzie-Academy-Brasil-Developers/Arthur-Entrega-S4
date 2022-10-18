import { Request, Response } from "express"
import createUserService from "../services/createUser.service"

const createUserController = async (req: Request, res: Response) => {

    const { name, email, password, isAdm } = req.body

    try {
        const user = await createUserService({name, email, password, isAdm})

        return res.status(201).send(user)
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).send({
                message: error.name,
                error: error.message
            })
        }
    }
}

export default createUserController