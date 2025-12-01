import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [StudentsModule, TeacherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
