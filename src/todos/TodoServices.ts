/** @notice library imports */
import { Repository } from "typeorm";
/// Local imports
import { Todo } from "./TodoEntity";

type ICreateParams = {
  description: string;
};

export class TodoServices {
  constructor(private userRepository: Repository<Todo>) {}

  async create({ description }: ICreateParams) {
    await this.userRepository.save({
      description,
    });
  }
}
