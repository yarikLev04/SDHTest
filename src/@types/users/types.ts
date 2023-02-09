export enum Gender {
    Male = 'male',
    Female = 'female'
}

export type BaseUser = {
    first_name: string,
    last_name: string,
    birth_date: string,
    gender: string,
    job: string,
    biography: string,
    is_active: boolean
}

export type User = BaseUser & {
    id: number
}

export type UsersInitialState = {
    isLoading: boolean;
    users: User[] | null,
    error: Error | string | null
}
