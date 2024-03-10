## Emphasizing Safe and Readable Raw SQL Queries with SQLSafe

SQLSafe is not just about preventing SQL injection; it's also about enhancing the readability and maintainability of your raw SQL queries. This package is a boon for developers who prefer the power and flexibility of raw SQL but also prioritize writing secure and clean code. Let's delve into how SQLSafe achieves this balance:

### Enhancing Readability

Raw SQL queries can become unwieldy, especially when they involve complex operations or dynamic parameters. SQLSafe transforms your SQL code into a more readable format by using named parameters, which are self-explanatory and make your queries easier to understand at a glance.

#### Before SQLSafe:

```sql
INSERT INTO users (name, email, age) VALUES ('John Doe', 'john@example.com', 30);
```

While straightforward for simple queries, imagine scaling this approach to more complex ones with dynamic values. It quickly becomes cluttered and hard to read.

#### With SQLSafe:

```typescript
const query =
  "INSERT INTO users (name, email, age) VALUES (:name, :email, :age)";
const params = { name: "John Doe", email: "john@example.com", age: 30 };

const [sql, parameters] = SQLPilot(query, params);
```

Using SQLSafe, the query is not only parameterized (enhancing security) but also remains crystal clear. Each parameter's purpose is obvious, making the code more maintainable and easier to audit for correctness.

### Maintaining Clean Code

SQLSafe abstracts away the boilerplate associated with preparing SQL statements. This abstraction reduces the risk of errors and keeps your codebase clean. Instead of manually constructing query strings with complex concatenations or interpolations, SQLSafe allows for a declarative approach, where the focus is on the what rather than the how.

#### Complex Joins and Subqueries:

SQLSafe shines even more when dealing with intricate queries involving multiple joins, subqueries, or conditional logic. It helps in keeping such complex queries organized and readable.

```typescript
const query = `
SELECT users.name, users.email, COUNT(orders.id) as orderCount 
FROM users 
LEFT JOIN orders ON users.id = orders.user_id 
WHERE users.status = :status 
GROUP BY users.id
HAVING COUNT(orders.id) > :minOrderCount`;

const params = { status: "active", minOrderCount: 5 };

const [sql, parameters] = SQLPilot(query, params);
```

In this example, despite the complexity of the SQL operation involving joins, a condition, and an aggregation, the query's intent remains clear and understandable. SQLSafe's parameterization not only prevents injections but also keeps the focus on the logic of the query itself.

### Why SQLSafe is Ideal for Raw SQL Users

- **Security**: By automatically parameterizing queries, SQLSafe significantly lowers the risk of SQL injection attacks, one of the most common security vulnerabilities in applications today.
- **Readability and Maintainability**: SQLSafe enhances the readability of SQL queries, making them more understandable and maintainable, which is crucial for complex applications.
- **Developer Productivity**: Reduces boilerplate and makes it easier to work with complex SQL queries, increasing developer productivity and reducing the likelihood of bugs.

In summary, SQLSafe is an indispensable tool for developers who want the control and precision of raw SQL without sacrificing security, readability, and maintainability. It's a testament to how modern tooling can blend the best of both worlds: the expressiveness and power of SQL with the safety and clarity needed in today's development environments.

## Installation

Install SQLSafe using npm:

```bash
npm install sqlsafe
```

Or using yarn:

```bash
yarn add sqlsafe
```

## Usage

Here's a quick example to show you how to use SQLSafe in your projects.

```typescript
import SQLPilot from "sqlsafe";

const query = "SELECT * FROM users WHERE id = :userId AND status = :status";
const params = {
  userId: 1,
  status: "active",
};

const [sql, parameters] = SQLPilot(query, params);

console.log(sql); // Outputs: SELECT * FROM users WHERE id = ? AND status = ?
console.log(parameters); // Outputs: [1, 'active']
```

### Handling Arrays

SQLSafe also supports array parameters, automatically expanding them into a list of placeholders suitable for IN clauses.

```typescript
const query = "SELECT * FROM posts WHERE id IN :postIds";
const params = {
  postIds: [1, 2, 3],
};

const [sql, parameters] = SQLPilot(query, params);

console.log(sql); // Outputs: SELECT * FROM posts WHERE id IN (?, ?, ?)
console.log(parameters); // Outputs: [1, 2, 3]
```

### Complex Insert Example

SQLSafe also simplifies the process of constructing complex INSERT queries, especially when dealing with multiple rows or a mix of data types. Here's an example that demonstrates how to use SQLSafe for a more complex INSERT operation:

```typescript
import SQLPilot from "sqlsafe";

const query = `
INSERT INTO orders (user_id, product_id, quantity, price, status) 
VALUES 
  (:userId, :productId1, :quantity1, :price1, :status1),
  (:userId, :productId2, :quantity2, :price2, :status2),
  (:userId, :productId3, :quantity3, :price3, :status3)
`;

const params = {
  userId: 1,
  productId1: 101,
  quantity1: 2,
  price1: 9.99,
  status1: "pending",
  productId2: 102,
  quantity2: 1,
  price2: 19.99,
  status2: "pending",
  productId3: 103,
  quantity3: 3,
  price3: 29.99,
  status3: "pending",
};

const [sql, parameters] = SQLPilot(query, params);

console.log(sql);
// Outputs:
// INSERT INTO orders (user_id, product_id, quantity, price, status)
// VALUES
//   (?, ?, ?, ?, ?),
//   (?, ?, ?, ?, ?),
//   (?, ?, ?, ?, ?)

console.log(parameters);
// Outputs: [1, 101, 2, 9.99, 'pending', 1, 102, 1, 19.99, 'pending', 1, 103, 3, 29.99, 'pending']
```

## API Reference

### `SQLPilot(sql: string, params: { [key: string]: any }): [string, any[]]`

- **`sql`**: The raw SQL query string with named parameters (e.g., `:name`).
- **`params`**: An object mapping parameter names to their values. Values can be of any type; arrays will be expanded appropriately.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue if you have feedback, questions, or need to report a bug.

## License

SQLSafe is MIT licensed. Feel free to use it in your projects as you see fit.
