/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './student.service'; 
import { StudentsController } from './student.controller'; 
import { Student } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],  // If needed by other modules
})
export class StudentsModule {}
