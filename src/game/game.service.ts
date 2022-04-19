import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}
  async create(createGameDto: CreateGameDto) {
    try {
      const game = await this.prisma.game.create({
        data: createGameDto,
      });
      return game;
    } catch (error) {
      return new HttpException(
        'Unable to create a game',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all game`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  async scoreGoals(id: string, { goalsFor, goalsAgainst }: UpdateGameDto) {
    try {
      const findGame = await this.prisma.game.findUnique({ where: { id } });

      if (!findGame) {
        throw new HttpException('Game not found', HttpStatus.BAD_REQUEST);
      }

      const game = await this.prisma.game.update({
        data: {
          userGoals: { increment: goalsFor },
          opponentGoals: { increment: goalsAgainst },
        },
        where: { id },
      });
      return game;
    } catch (error) {
      return new HttpException(
        'Unable to create a game',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async finishGame(id: string) {
    try {
      const findGame = await this.prisma.game.findUnique({ where: { id } });

      if (!findGame) {
        throw new HttpException('Game not found', HttpStatus.BAD_REQUEST);
      }

      let winnerId = '';
      let points = 0;
      if (findGame.userGoals > findGame.opponentGoals) {
        winnerId = findGame.userId;
        points = 3;
      }
      if (findGame.userGoals < findGame.opponentGoals) {
        winnerId = findGame.opponentId;
        points = -3;
      } else {
        points = 1;
      }

      const game = await this.prisma.game.update({
        data: { winnerId, points, finished: true },
        where: { id },
      });
      return game;
    } catch (error) {
      return new HttpException(
        'Unable to create a game',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
