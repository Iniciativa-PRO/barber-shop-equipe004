import { z } from "zod";
import { Response } from "express";

interface ErrorZod {
    errors: {
        message: string;
        field: string;
    }
}[]

class APIError{

  public async msg(err: ErrorZod, res: Response){
    if (err instanceof z.ZodError) {
        return res.status(400).json({
            errors: err.errors.map(({ message, path }) => ({
                message,
                field: path.join("."),
            })),
        });
    }
     
     return res.status(500).json({
         message: "Internal server error",
     });
  }

}
  
export default new APIError();