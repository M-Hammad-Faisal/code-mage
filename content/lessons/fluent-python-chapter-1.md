# Fluent Python Chapter 1: The Python Data Model

The Python data model is the foundation of everything you do in Python. Once you understand it, the language stops feeling like a collection of rules and starts feeling like a coherent system. This is a deep summary of Chapter 1 of Fluent Python by Luciano Ramalho.

## What Is the Data Model?

The Python data model is the API that defines how objects behave with built-in operations. When you write `len(my_list)`, `for item in my_obj`, or `a + b`, Python calls special methods on your objects.

These special methods are called **dunder methods** (double-underscore methods, or "magic methods"): `__len__`, `__getitem__`, `__add__`, etc.

The big insight: **you can make your own objects work with any Python built-in** by implementing the right dunder methods.

## A Card Deck Example

Ramalho opens the chapter with a classic example — a playing card deck:

```python
import collections

Card = collections.namedtuple("Card", ["rank", "suit"])

class FrenchDeck:
    ranks = [str(n) for n in range(2, 11)] + list("JQKA")
    suits = "spades diamonds clubs hearts".split()

    def __init__(self):
        self._cards = [Card(rank, suit)
                       for suit in self.suits
                       for rank in self.ranks]

    def __len__(self):
        return len(self._cards)

    def __getitem__(self, position):
        return self._cards[position]
```

Just two dunder methods — `__len__` and `__getitem__` — and you get an enormous amount for free:

```python
deck = FrenchDeck()

# __len__ — works with len()
print(len(deck))  # 52

# __getitem__ — works with indexing
print(deck[0])    # Card(rank='2', suit='spades')
print(deck[-1])   # Card(rank='A', suit='hearts')

# Slicing works because __getitem__ supports it
print(deck[:3])
# [Card(rank='2', suit='spades'),
#  Card(rank='2', suit='diamonds'),
#  Card(rank='2', suit='clubs')]

# Iteration — Python calls __getitem__ with increasing indices
for card in deck:
    print(card)

# Membership testing
print(Card("A", "hearts") in deck)  # True
print(Card("7", "beasts") in deck)  # False

# random.choice works
import random
print(random.choice(deck))  # Card(rank='K', suit='clubs') (random)
```

This is the power of the data model. You implement two methods and Python hands you slicing, iteration, `in` operator, and compatibility with any function that takes an iterable.

## How special methods are called

Special methods are called by the Python interpreter, not by you directly. When Python sees `len(deck)`, it calls `deck.__len__()`. When it sees `deck[0]`, it calls `deck.__getitem__(0)`.

You should call built-ins like `len()`, `str()`, `repr()` — not the dunder methods directly. The only exception is `__init__` (you call it via `super().__init__()` in subclasses).

```python
# DO THIS
length = len(my_object)
string = str(my_object)

# NOT THIS (unless you have a specific reason)
length = my_object.__len__()
string = my_object.__str__()
```

## Emulating Numeric Types

A 2D vector that supports arithmetic:

```python
import math

class Vector:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vector({self.x!r}, {self.y!r})"

    def __abs__(self):
        return math.hypot(self.x, self.y)

    def __bool__(self):
        return bool(abs(self))

    def __add__(self, other):
        x = self.x + other.x
        y = self.y + other.y
        return Vector(x, y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)
```

```python
v1 = Vector(2, 4)
v2 = Vector(2, 1)

print(v1 + v2)      # Vector(4, 5)
print(v1 * 3)       # Vector(6, 12)
print(abs(v1))      # 4.47213...
print(bool(v1))     # True
print(bool(Vector()))  # False (zero vector is falsy)
```

## **repr** vs **str**

Both convert objects to strings. They serve different purposes:

- `__repr__` — the "developer" representation. Should be unambiguous. If possible, should look like the code to recreate the object. Used in the REPL and for debugging.
- `__str__` — the "user" representation. Should be readable. Used by `print()` and `str()`.

If you only implement one, implement `__repr__` — Python falls back to `__repr__` when `__str__` isn't defined.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(3, 4)
print(repr(p))  # Point(3, 4)  — use for debugging
print(str(p))   # (3, 4)       — use for display
print(p)        # (3, 4)       — print() calls __str__
```

## **bool**: Truth Value Testing

Python calls `__bool__` when an object is used in a boolean context (`if obj:`, `while obj:`, `not obj`). If `__bool__` isn't defined, Python calls `__len__` — a zero-length object is falsy.

```python
class Bucket:
    def __init__(self):
        self._items = []

    def add(self, item):
        self._items.append(item)

    def __len__(self):
        return len(self._items)

bucket = Bucket()
if not bucket:
    print("Empty bucket")  # prints this

bucket.add("item")
if bucket:
    print("Bucket has items")  # prints this
```

## Overview of Special Methods

The data model covers far more than arithmetic. Here are the main categories:

| Category         | Methods                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| String/Bytes     | `__repr__`, `__str__`, `__bytes__`, `__format__`                       |
| Numeric          | `__add__`, `__sub__`, `__mul__`, `__truediv__`, `__abs__`, `__neg__`   |
| Comparison       | `__eq__`, `__ne__`, `__lt__`, `__le__`, `__gt__`, `__ge__`             |
| Collection       | `__len__`, `__getitem__`, `__setitem__`, `__delitem__`, `__contains__` |
| Iteration        | `__iter__`, `__next__`, `__reversed__`                                 |
| Callable         | `__call__`                                                             |
| Context Manager  | `__enter__`, `__exit__`                                                |
| Attribute Access | `__getattr__`, `__setattr__`, `__delattr__`                            |

## The Key Takeaway

The Python data model is a framework. When you implement the right dunder methods:

- Your objects work with built-in functions (`len`, `abs`, `bool`, `str`, `repr`)
- Your objects work with operators (`+`, `-`, `*`, `==`, `<`)
- Your objects work with Python syntax (`for`, `in`, `with`, `[]`)
- Your objects work with the standard library (anything that expects an iterable, a mapping, etc.)

You're not fighting the language — you're extending it. That's what "Pythonic" means.

Ramalho summarizes it perfectly: _"By implementing special methods, your objects can behave like the built-in types, enabling the expressive coding style the community considers Pythonic."_
