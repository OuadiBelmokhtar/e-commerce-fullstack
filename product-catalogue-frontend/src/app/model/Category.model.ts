
export class Category {

    private _id: number;
    private _name: string;
    private _description: string;

    constructor(id: number, name: string, description: string) {
        this._id = id;
        this._name = name;
        this._description = description;
    }

    public get id() {
        return this._id;
    }
    public get name() {
        return this._name;
    }
    public get description() {
        return this._description;
    }

    public set id(id: number) {
        this._id = id;
    }
    public set name(name: string) {
        this._name = name;
    }
    public set description(description: string) {
        this._description = description;
    }

}