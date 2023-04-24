import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { CreateTableDto } from './dto/create-table.dto';
import { TableService } from './table.service';
import { Table } from './entities/table.entity';
import { UpdateTableDto } from './dto/uptade-table.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('table')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}
  @Get()
  @ApiOperation({ summary: 'Listar todas as mesas' })
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Visualizar uma mesa' })
  findOne(@Param('id') id: string): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma mesa' })
  create(@Body() dto: CreateTableDto): Promise<Table> {
    return this.tableService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Editar mesa pelo id' })
  update(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<Table> {
    return this.tableService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover mesa pelo id',
  })
  delete(@Param('id') id: string) {
    this.tableService.delete(id);
  }
}
