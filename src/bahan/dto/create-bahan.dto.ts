import { Type } from "class-transformer";
import { Min, IsNumber, IsNotEmpty, } from "class-validator";

export class CreateBahanDto {

    @IsNotEmpty()
    nama!: string;

    @Type(() => Number)
    @IsNumber()
    stok!: number;
    
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    harga!: number;
}
