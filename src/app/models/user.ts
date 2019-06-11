import { InputModel } from './input-model';

export class User {

    username: string;
    password: string;
    inputs: InputModel[];

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
