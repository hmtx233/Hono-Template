/** @notice library imports */
import { DataSource } from "typeorm";

/**
 * @dev Clears every database in the entity.
 * @param {DataSource} connection The database connection.
 */
export const truncateDatabase = async (connection: DataSource) => {
  if (connection.isInitialized) {
    const entities = connection.entityMetadatas;
    for (const entity of entities) {
      const repo = connection.getRepository(entity.name);
      await repo.clear();
    }
  }
};
