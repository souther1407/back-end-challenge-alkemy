import {createHash} from "crypto"


export function hashPassword(password:string){
    const hash = createHash("sha256").update(password+"secret").digest("hex").toString()
    return hash
}