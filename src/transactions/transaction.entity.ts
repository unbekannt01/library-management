/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from '../students/student.entity';
import { Book } from '../books/book.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  borrowDate: Date;

  @Column({ nullable: true })
  returnDate: Date;
}
