---
title: '5 Things I Learned from Fluent Python - Chapter 2'
date: '2025-01-15'
tags: ['book-summary', 'python', 'sequences']
---

# 5 Things I Learned from Fluent Python - Chapter 2

Chapter 2 of Fluent Python dives deep into sequences, and it completely changed how I think about Python data structures. Here are the key insights that blew my mind:

## 1. List Comprehensions vs Generator Expressions

The difference isn't just syntax - it's about memory efficiency:

```python
# List comprehension - creates entire list in memory
squares_list = [x**2 for x in range(1000000)]

# Generator expression - lazy evaluation
squares_gen = (x**2 for x in range(1000000))
```

Generator expressions use significantly less memory and are perfect for large datasets.

## 2. The Power of `*` and `**` Operators

These operators are more versatile than I initially thought:

```python
# Unpacking sequences
first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2, 3, 4], last=5

# Merging dictionaries (Python 3.5+)
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}
merged = {**dict1, **dict2}
```

## 3. Slice Objects Are First-Class Citizens

You can create and reuse slice objects:

```python
# Create reusable slices
FIRST_THREE = slice(0, 3)
LAST_TWO = slice(-2, None)

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(data[FIRST_THREE])  # [1, 2, 3]
print(data[LAST_TWO])     # [9, 10]
```

## 4. `+=` Behaves Differently for Mutable vs Immutable

This one caught me off guard:

```python
# With lists (mutable)
a = [1, 2, 3]
b = a
a += [4, 5]  # Modifies the original list
print(b)  # [1, 2, 3, 4, 5] - b is affected!

# With tuples (immutable)
a = (1, 2, 3)
b = a
a += (4, 5)  # Creates a new tuple
print(b)  # (1, 2, 3) - b is unchanged
```

## 5. `bisect` Module for Sorted Sequences

The `bisect` module is a hidden gem for working with sorted sequences:

```python
import bisect

grades = [60, 70, 80, 90]
breakpoints = [60, 70, 80, 90]
grade_letters = 'FDCBA'

def grade(score):
    i = bisect.bisect(breakpoints, score)
    return grade_letters[i]

print(grade(85))  # 'B'
```

## Conclusion

Fluent Python continues to reveal the elegant design decisions behind Python's seemingly simple syntax. These sequence operations aren't just syntactic sugar - they're powerful tools that can make your code more readable and efficient.

What's your favorite Python sequence trick? Let me know in the comments!

---

_This is part of my ongoing series reading through Fluent Python. Follow along for more insights from this incredible book!_
