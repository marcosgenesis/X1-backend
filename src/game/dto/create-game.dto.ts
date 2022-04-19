import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  opponentId: string;

  @IsString()
  @IsOptional()
  winnerId?: string;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsNumberString()
  @IsOptional()
  goalsFor?: number;

  @IsNumberString()
  @IsOptional()
  goalsAgainst?: number;
}
