import { UserEntity } from "../entities/user.entity";

export class LoginPayload {
    id: number;
    name: string
    email: string
    password: string
    dt_created:Date
    constructor(user: UserEntity) {
        this.id = user.id;
        this.name = user.name
        this.email = user.email
        this.password = user.password
        this.dt_created = user.dt_created
    }
}