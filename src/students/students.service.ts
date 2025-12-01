import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  private students: Student[] = [];
  private idCounter = 1;

  create(createStudentDto: CreateStudentDto): Student {
    const newStudent: Student = {
      id: this.idCounter++,
      ...createStudentDto,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  findAll(): Student[] {
    return this.students;
  }

  findOne(id: number): Student {
    const student = this.students.find((s) => s.id === id);
    if (!student) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto): Student {
    const studentIndex = this.students.findIndex((s) => s.id === id);
    if (studentIndex === -1) {
      throw new NotFoundException(`Student${id} not found`);
    }
    this.students[studentIndex] = {
      ...this.students[studentIndex],
      ...updateStudentDto,
    };
    return this.students[studentIndex];
  }

  remove(id: number): { message: string } {
    const studentIndex = this.students.findIndex((s) => s.id === id);
    if (studentIndex === -1) {
      throw new NotFoundException(`Student${id} not found`);
    }
    this.students.splice(studentIndex, 1);
    return { message: `Student${id} uchirildi` };
  }
}
