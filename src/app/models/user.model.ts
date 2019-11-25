export class User {
// tslint:disable-next-line: variable-name
constructor(
    public name: string,
    public email: string,
    public password: string,
    public _id?: string,
    public img?: string,
    public role?: string,
    public google?: boolean
) { }
}
