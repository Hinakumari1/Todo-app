import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/todoapp'), // adjust if needed
    TodoModule
  ],
})
export class AppModule {}
