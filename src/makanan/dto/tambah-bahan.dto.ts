import { IsNotEmpty } from "class-validator"

export class TambahBahanDto {
    @IsNotEmpty()
    makananId!: number
    @IsNotEmpty()
    bahanId!: number
}