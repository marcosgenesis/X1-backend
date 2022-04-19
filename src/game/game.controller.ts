import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch('/finish/:id')
  update(@Param('id') id: string) {
    return this.gameService.finishGame(id);
  }

  @Patch('/goal/:id')
  scoreGoals(
    @Param('id') id: string,
    @Body() { goalsFor, goalsAgainst }: UpdateGameDto,
  ) {
    return this.gameService.scoreGoals(id, { goalsFor, goalsAgainst });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameService.remove(+id);
  }
}
