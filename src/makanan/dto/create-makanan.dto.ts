import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateMakananDto {
    
    @IsNotEmpty()
    nama!: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    harga!: number;
}
