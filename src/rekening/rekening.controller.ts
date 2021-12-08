import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RekeningService } from './rekening.service';
import { CreateRekeningDto } from './dto/create-rekening.dto';
import { UpdateRekeningDto } from './dto/update-rekening.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiTags('Rekening')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('rekening')
export class RekeningController {
  constructor(private readonly rekeningService: RekeningService) {}

  @Post()
  create(@Body() createRekeningDto: CreateRekeningDto) {
    return this.rekeningService.create(createRekeningDto);
  }

  @Get()
  findAll() {
    return this.rekeningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rekeningService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRekeningDto: UpdateRekeningDto) {
    return this.rekeningService.update(+id, updateRekeningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rekeningService.remove(+id);
  }
}