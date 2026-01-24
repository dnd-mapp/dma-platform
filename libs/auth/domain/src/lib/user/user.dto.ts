export const selectUserProperties = {
    id: true,
    username: true,
    password: true,
};

export class UserDto {
    public id!: string;
    public username!: string;
    public password!: string;
}
