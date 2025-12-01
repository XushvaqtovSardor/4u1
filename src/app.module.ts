import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { TeacherModule } from './teacher/teacher.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [StudentsModule, TeacherModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
