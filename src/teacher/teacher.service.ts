import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {
  private teachers: Teacher[] = [];
  private idCounter = 1;

  create(createTeacherDto: CreateTeacherDto): Teacher {
    const newTeacher: Teacher = {
      id: this.idCounter++,
      ...createTeacherDto,
    };
    this.teachers.push(newTeacher);
    return newTeacher;
  }

  findAll(): Teacher[] {
    return this.teachers;
  }

  findOne(id: number): Teacher {
    const teacher = this.teachers.find((t) => t.id === id);
    if (!teacher) {
      throw new NotFoundException(`${id}lik 'qituvchi topilmadi`);
    }
    return teacher;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto): Teacher {
    const teacherIndex = this.teachers.findIndex((t) => t.id === id);
    if (teacherIndex === -1) {
      throw new NotFoundException(`${id}lik 'qituvchi topilmadi`);
    }
    this.teachers[teacherIndex] = {
      ...this.teachers[teacherIndex],
      ...updateTeacherDto,
    };
    return this.teachers[teacherIndex];
  }

  remove(id: number): { message: string } {
    const teacherIndex = this.teachers.findIndex((t) => t.id === id);
    if (teacherIndex === -1) {
      throw new NotFoundException(`${id}lik 'qituvchi topilmadi`);
    }
    this.teachers.splice(teacherIndex, 1);
    return { message: `Teacher ${id} o'chirldi` };
  }
}
