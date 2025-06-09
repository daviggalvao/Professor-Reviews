import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsString({ message: 'Nome inválido' })
  nome: string;
  
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O campo Email deve ser preenchido' })
  email: string;

  @IsString({ message: 'Senha inválida' })
  @IsNotEmpty({ message: 'O campo Senha deve ser preenchido' })
  @MinLength(6)
  senha: string;
  
  @IsString()
  departamento: string;

  @IsString()
  curso: string;

  foto_perfil?: Buffer;
}
