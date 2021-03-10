// import { User } from "../entity/User";
// import {getConnection} from "typeorm"
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../repositories/user.repository";
@Service()
export class UserService {

    constructor(@InjectRepository() private userRepo: UserRepository) {

    }

    public getUserById = async (id: number) => {

        // const userRepo = getConnection().getRepository(User);
        return await this.userRepo.findOne(id);
    }

}