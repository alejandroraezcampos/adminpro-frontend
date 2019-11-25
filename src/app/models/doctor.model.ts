import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
export class Doctor {

    constructor(
        public name?: string,
        public img?: string,
        public user?: User,
        public hospital?: Hospital,
        public _id?: string
    ) { }
}
