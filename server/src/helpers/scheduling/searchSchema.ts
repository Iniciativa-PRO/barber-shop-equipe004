import { z } from "zod";

export const searchSchema = z.string({ 
    invalid_type_error: 'Deve ser uma string.' 
}).min(8, { message: 'A data deve ter os 8 caracteres.'});