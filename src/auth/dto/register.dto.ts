import { IsNotEmpty, Min } from "class-validator";

export class RegisterDto {
    
    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    password!: string;
}
