/* eslint-disable prettier/prettier */
// src/transactions/transactions.controller.ts
import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('borrow')
  borrowBook(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.borrowBook(createTransactionDto);
  }
 
  @Patch('return/:id')
  returnBook(@Param('id') id: string) {
    return this.transactionsService.returnBook(+id);
  }

  @Get('history/:bookId')
  getHistory(@Param('bookId') bookId: string) {
    return this.transactionsService.getHistory(+bookId);
  }
}
