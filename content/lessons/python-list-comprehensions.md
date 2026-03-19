# Master List Comprehensions

List comprehensions are one of Python's most loved features. They let you build lists in a single, readable line. Once you get comfortable with them, you'll use them constantly.

## The Basic Pattern

The pattern is always: `[expression for item in iterable]`

```python
# Traditional for loop
squares = []
for n in range(10):
    squares.append(n ** 2)

# List comprehension — same result
squares = [n ** 2 for n in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Read it as: "give me `n ** 2` for each `n` in `range(10)`".

## Adding a Filter

Add `if` at the end to filter items:

```python
# Only even squares
even_squares = [n ** 2 for n in range(10) if n % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# Filter strings
words = ["hello", "world", "python", "is", "great"]
long_words = [w for w in words if len(w) > 4]
print(long_words)  # ['hello', 'world', 'python', 'great']
```

## Transforming Strings

```python
names = ["alice", "bob", "charlie"]
capitalized = [name.capitalize() for name in names]
print(capitalized)  # ['Alice', 'Bob', 'Charlie']

# Strip whitespace and lowercase
raw = ["  Python  ", " JAVA ", "  rust"]
cleaned = [lang.strip().lower() for lang in raw]
print(cleaned)  # ['python', 'java', 'rust']
```

## Nested Loops

You can nest loops in a comprehension — the order mirrors a nested for loop:

```python
# Nested for loops
matrix = []
for row in range(3):
    for col in range(3):
        matrix.append((row, col))

# Same as comprehension
matrix = [(row, col) for row in range(3) for col in range(3)]
print(matrix)
# [(0,0), (0,1), (0,2), (1,0), (1,1), (1,2), (2,0), (2,1), (2,2)]

# Flatten a 2D list
nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [n for row in nested for n in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Dict and Set Comprehensions

The same pattern works for dicts and sets:

```python
# Dict comprehension
words = ["apple", "banana", "cherry"]
word_lengths = {word: len(word) for word in words}
print(word_lengths)  # {'apple': 5, 'banana': 6, 'cherry': 6}

# Invert a dict
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}

# Set comprehension — no duplicates
nums = [1, 2, 2, 3, 3, 3, 4]
unique_squares = {n ** 2 for n in nums}
print(unique_squares)  # {1, 4, 9, 16}
```

## Generator Expressions

Replace `[]` with `()` to get a generator — it produces values lazily without building the full list in memory:

```python
# List — builds everything in memory immediately
squares_list = [n ** 2 for n in range(1_000_000)]

# Generator — produces one value at a time
squares_gen = (n ** 2 for n in range(1_000_000))

# Use sum() or any() directly on the generator
total = sum(n ** 2 for n in range(1000))
print(total)  # 332833500
```

Use a generator expression when you're passing the result directly to a function like `sum`, `max`, `any`, `all`, or `list`.

## Conditional Expression (Ternary)

You can put an `if/else` in the expression part (before `for`) — this is different from filtering:

```python
# Ternary in expression — transforms every item
numbers = [1, -2, 3, -4, 5]
abs_values = [n if n >= 0 else -n for n in numbers]
print(abs_values)  # [1, 2, 3, 4, 5]

# Label items
labels = ["positive" if n > 0 else "negative" if n < 0 else "zero"
          for n in numbers]
print(labels)  # ['positive', 'negative', 'positive', 'negative', 'positive']
```

## Real-World Examples

```python
# Parse CSV rows
csv_data = ["1,Alice,30", "2,Bob,25", "3,Charlie,35"]
users = [
    {"id": int(row.split(",")[0]),
     "name": row.split(",")[1],
     "age": int(row.split(",")[2])}
    for row in csv_data
]

# Extract unique domains from emails
emails = ["alice@gmail.com", "bob@yahoo.com", "charlie@gmail.com"]
domains = {email.split("@")[1] for email in emails}
print(domains)  # {'gmail.com', 'yahoo.com'}

# Filter and transform dicts
products = [
    {"name": "Laptop", "price": 999, "in_stock": True},
    {"name": "Mouse", "price": 29, "in_stock": False},
    {"name": "Keyboard", "price": 79, "in_stock": True},
]
available = [p["name"] for p in products if p["in_stock"]]
print(available)  # ['Laptop', 'Keyboard']
```

## When NOT to Use Comprehensions

Comprehensions get unreadable when they're too long or too nested. If it doesn't fit on one line clearly, use a regular loop:

```python
# Hard to read — use a loop instead
result = [
    process(item)
    for sublist in data
    for item in sublist
    if item.is_valid()
    if item.category in allowed_categories
]

# Clearer as a loop
result = []
for sublist in data:
    for item in sublist:
        if item.is_valid() and item.category in allowed_categories:
            result.append(process(item))
```

**Rule of thumb:** If you need to read a comprehension more than once to understand it, it's too complex.

## Quick Reference

```python
# Basic
result = [expr for item in iterable]

# With filter
result = [expr for item in iterable if condition]

# With ternary in expression
result = [a if condition else b for item in iterable]

# Nested loops
result = [expr for outer in iterable for inner in outer]

# Dict comprehension
result = {key: value for item in iterable}

# Set comprehension
result = {expr for item in iterable}

# Generator expression
result = (expr for item in iterable)
gen_sum = sum(expr for item in iterable)
```

List comprehensions make your code shorter and more Pythonic. Start with simple ones and add complexity only when it stays readable.
