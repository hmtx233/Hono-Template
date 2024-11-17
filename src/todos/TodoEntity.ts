/** @notice library imports */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  description: string;

  @Column("boolean", {
    default: false,
  })
  isCompleted: boolean;
}
