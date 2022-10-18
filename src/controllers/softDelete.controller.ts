import { Request, Response } from "express"
import softDeleteService from "../services/softDelete.service"

const softDeleteController = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const deleted = await softDeleteService(id)

        if(deleted){
            return res.status(204).send()
        }
        else{
            return res.status(404).send({
                message: "User not Found"
            })
        }
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).send({
              message: error.name,
              error: error.message 
            })
        }
    }
}

export default softDeleteController