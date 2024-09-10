/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Book } from '../books/book.entity';
import { Student } from '../students/student.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async borrowBook(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { studentId, bookId } = createTransactionDto;

    const student = await this.studentsRepository.findOne({ where: { id: studentId } });
    const book = await this.booksRepository.findOne({ where: { id: bookId } });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    if (!book.isAvailable) {
      throw new BadRequestException(`Book with ID ${bookId} is currently unavailable`);
    }

    book.isAvailable = false;
    await this.booksRepository.save(book);

    const transaction = this.transactionsRepository.create({
      student,
      book,
      borrowDate: new Date(),
    });

    return this.transactionsRepository.save(transaction);
  }

  async returnBook(transactionId: number): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({ where: { id: transactionId }, relations: ['book'] });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${transactionId} not found`);
    }

    if (transaction.returnDate) {
      throw new BadRequestException(`Book has already been returned`);
    }

    transaction.returnDate = new Date();

    const book = transaction.book;
    book.isAvailable = true;
    await this.booksRepository.save(book);

    return this.transactionsRepository.save(transaction);
  }

  async getHistory(bookId: number): Promise<Transaction[]> {
    const book = await this.booksRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    return this.transactionsRepository.find({
      where: { book },
      relations: ['student'],
      order: { borrowDate: 'ASC' },
    });
  }
}
