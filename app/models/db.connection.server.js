import pkg from 'pg';
const { Pool } = pkg;

import dbConfig from '../certificates/aws-database-config'

const pool = new Pool(dbConfig);

export async function insertSplit(shop, split) {
  const client = await pool.connect();
  try {
    const queryText = `
      INSERT INTO split_rules (shop_name, title, group_by, selected_all, selected_group, group_limit, limit_value)
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;

    const values = [shop, split.title, split.groupBy, split.all, split.selectedGroup, split.limit, split.limitValue];
    const result = await client.query(queryText, values);

		return result; // Assuming you want to return the inserted row
  } catch (error) {
		console.error("DATABASE ERROR: Could not insert into 'split_rules'", error.message);
  } finally {
    client.release(); // Release the client back to the pool
  } 
}