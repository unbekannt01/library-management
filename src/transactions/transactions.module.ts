/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transaction.entity';
import { Book } from '../books/book.entity';  // Import Book for relations
import { Student } from '../students/student.entity';  // Import Student for relations

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Book, Student]),  // Inject multiple entities
  ],
  controllers: [TransactionsController], 
  providers: [TransactionsService],
  exports: [TransactionsService],  // If needed by other modules
})
export class TransactionsModule {}
