
import { UserEntity } from '../entities/UserEntity'

const userEntity = new UserEntity()

export function createUserRepo() {
    return {
        getUserById: userEntity.getById.bind(userEntity),
        getAllUsers: userEntity.getAll.bind(userEntity),
        createUser: userEntity.create.bind(userEntity),
        updateUser: userEntity.update.bind(userEntity),
        deleteUser: userEntity.delete.bind(userEntity),
        findByEmail: userEntity.findByEmail.bind(userEntity)
    }
}
