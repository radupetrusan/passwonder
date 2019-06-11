export class InputModel {
    value: string;
    pressedKeys: string[];
    timeBetweenKeys: number[];

    constructor(init?: Partial<InputModel>) {
        Object.assign(this, init);
    }
}
