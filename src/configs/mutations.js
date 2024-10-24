import api from "../utils/api";
import { useMutation } from "@tanstack/react-query";

export const useRegister=()=>{
    const mutationFn=data=>api.post('auth/register',data);
    return useMutation({mutationFn})
}