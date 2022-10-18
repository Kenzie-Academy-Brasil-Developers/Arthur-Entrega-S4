import { Request, Response } from "express"
import getUsersService from "../services/getUsers.service"

const getUsersController = async (req: Request, res: Response) => {

    try {
        const users = await getUsersService()

        return res.status(200).send(users)
    } catch (error) {
        if(error instanceof Error)
        return res.status(400).send({
            message: error.name,
            error: error
        })
    }
}

export default getUsersController