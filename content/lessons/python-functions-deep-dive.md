# Python Functions: Beyond the Basics

Functions are the backbone of Python. You already know `def` and `return`. This lesson covers the concepts that trip up intermediate developers — closures, decorators, and how Python actually handles function objects.

## Functions Are Objects

In Python, functions are first-class objects. You can assign them to variables, pass them as arguments, and return them from other functions.

```python
def greet(name):
    return f"Hello, {name}"

# Assign to a variable
say_hello = greet
print(say_hello("Hammad"))  # Hello, Hammad

# Pass as an argument
def run(func, value):
    return func(value)

print(run(greet, "World"))  # Hello, World
```

This is the foundation for understanding decorators.

## Default Arguments — The Mutable Default Trap

```python
# WRONG — mutable default argument
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['a', 'b']  ← Not what you expected!
```

The list `[]` is created once when the function is defined, not each time it's called. The fix:

```python
# CORRECT — use None as the sentinel
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['b']  ← Correct
```

**Rule:** Never use a mutable object (list, dict, set) as a default argument.

## \*args and \*\*kwargs

`*args` collects positional arguments into a tuple. `**kwargs` collects keyword arguments into a dict.

```python
def log(*args, **kwargs):
    print("Args:", args)
    print("Kwargs:", kwargs)

log(1, 2, 3, name="Hammad", level="debug")
# Args: (1, 2, 3)
# Kwargs: {'name': 'Hammad', 'level': 'debug'}
```

Real-world use — wrapping another function:

```python
def retry(func, *args, retries=3, **kwargs):
    for attempt in range(retries):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            if attempt == retries - 1:
                raise
            print(f"Attempt {attempt + 1} failed: {e}")
```

## Closures

A closure is a function that remembers the variables from its enclosing scope, even after that scope has finished executing.

```python
def make_counter(start=0):
    count = start

    def increment():
        nonlocal count
        count += 1
        return count

    return increment

counter = make_counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3

# Each call creates a separate counter
other = make_counter(10)
print(other())   # 11
print(counter()) # 4 — unaffected
```

`nonlocal` tells Python to look in the enclosing scope for `count`, not just the local scope. Without it, `count += 1` would create a new local variable and fail.

## Decorators

A decorator is a function that takes a function and returns a new function. It's syntactic sugar for wrapping one function with another.

```python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.3f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)
    return "done"

slow_function()  # slow_function took 0.101s
```

`@timer` is equivalent to:

```python
slow_function = timer(slow_function)
```

### Preserving Function Metadata

Without `functools.wraps`, the wrapped function loses its name and docstring:

```python
from functools import wraps

def timer(func):
    @wraps(func)  # preserves __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.3f}s")
        return result
    return wrapper
```

Always use `@wraps` inside decorators. It matters for debugging, introspection, and frameworks like Flask.

### Decorator with Arguments

To make a decorator that accepts arguments, add one more level of nesting:

```python
from functools import wraps

def retry(times=3, exceptions=(Exception,)):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == times - 1:
                        raise
                    print(f"Retrying... ({attempt + 1}/{times})")
        return wrapper
    return decorator

@retry(times=5, exceptions=(ConnectionError, TimeoutError))
def fetch_data(url):
    # ...
    pass
```

## Lambda Functions

Lambdas are anonymous one-line functions. Use them sparingly — only when a full `def` would be overkill.

```python
# Good use of lambda
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_nums = sorted(numbers, key=lambda x: -x)  # descending
print(sorted_nums)  # [9, 6, 5, 4, 3, 2, 1, 1]

# With multiple criteria
users = [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]
sorted_users = sorted(users, key=lambda u: (u["age"], u["name"]))
```

Don't assign lambdas to variables — that's just a worse version of `def`:

```python
# BAD
square = lambda x: x ** 2

# GOOD
def square(x):
    return x ** 2
```

## Generator Functions

A generator function uses `yield` instead of `return`. It produces values lazily, one at a time, instead of building a full list in memory.

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci()
for _ in range(10):
    print(next(gen), end=" ")
# 0 1 1 2 3 5 8 13 21 34
```

Real use case — processing large files:

```python
def read_lines(filepath):
    with open(filepath) as f:
        for line in f:
            yield line.strip()

# Never loads the whole file into memory
for line in read_lines("huge_log.txt"):
    if "ERROR" in line:
        print(line)
```

## Quick Reference

```python
# Default arguments — use None for mutables
def func(items=None):
    items = items or []

# *args and **kwargs
def func(*args, **kwargs): ...

# Closure with nonlocal
def outer():
    x = 0
    def inner():
        nonlocal x
        x += 1
    return inner

# Decorator with functools.wraps
from functools import wraps
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

# Decorator with arguments
def with_args(n):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        return wrapper
    return decorator

# Generator
def gen():
    yield 1
    yield 2
```

The most important takeaway: functions in Python are objects. Once that clicks, closures and decorators stop feeling magical and start feeling obvious.
