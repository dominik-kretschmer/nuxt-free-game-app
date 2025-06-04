import { UserEntity } from '../../db/entities/UserEntity'
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if(await LoginUser(body)){
        return { success: true }
    }else{
        return { success: false }
    }
})
async  function LoginUser(body :any){
    const { email, password } = body
    const userEntity = new UserEntity()
     const user = await userEntity.findByEmail(email)
    if (user.password === password){
        return true;
    }
}