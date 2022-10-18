import { Request, Response } from "express"
import tokenGenerateService from "../services/tokenGenerate.service"

const tokenGenerateController = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {
        const token = await tokenGenerateService({email, password})

        return res.status(200).send({token: token})
    } catch (error) {
        if(error instanceof Error){
            return res.status(403).send({
              message: error.name,
              error: error.message 
            })
        }
    }
}

export default tokenGenerateController