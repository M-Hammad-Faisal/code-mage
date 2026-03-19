# Async/Await Explained Simply

Asynchronous programming confuses a lot of people. This lesson cuts through the noise and explains exactly what async/await does, when to use it, and what mistakes to avoid.

## The Problem Async Solves

Some operations are slow — not because they're doing heavy computation, but because they're waiting. Waiting for a network response, a database query, a file read. Your CPU is idle during that wait.

Synchronous code wastes that wait time:

```python
import requests

def get_users():
    r1 = requests.get("https://api.example.com/users/1")   # wait 200ms
    r2 = requests.get("https://api.example.com/users/2")   # wait 200ms
    r3 = requests.get("https://api.example.com/users/3")   # wait 200ms
    return [r1.json(), r2.json(), r3.json()]
    # Total: ~600ms
```

With async, you can start all three requests and wait for them simultaneously:

```python
import asyncio
import aiohttp

async def get_users():
    async with aiohttp.ClientSession() as session:
        tasks = [
            session.get(f"https://api.example.com/users/{i}")
            for i in range(1, 4)
        ]
        responses = await asyncio.gather(*tasks)
        return [await r.json() for r in responses]
    # Total: ~200ms (limited by the slowest request)
```

## The Two Keywords

**`async def`** declares a coroutine — a function that can be paused and resumed:

```python
async def fetch_data():
    return "data"
```

Calling an async function doesn't run it — it creates a coroutine object:

```python
result = fetch_data()    # <coroutine object at 0x...>
result = await fetch_data()  # "data"  ← This runs it
```

**`await`** pauses the current coroutine and gives control back to the event loop until the awaited thing is done. It can only be used inside an `async def` function.

## The Event Loop

The event loop is the engine that runs async code. It manages a queue of tasks and switches between them whenever one is waiting.

```python
import asyncio

async def main():
    print("start")
    await asyncio.sleep(1)  # pauses here, event loop runs other tasks
    print("end")

# Run the event loop
asyncio.run(main())
```

`asyncio.run()` is how you start an async program from synchronous code. Call it once, at the top level.

## Running Tasks Concurrently

`await` on a single coroutine runs it sequentially — no concurrency benefit:

```python
async def slow():
    # Sequential — 2 seconds total
    await asyncio.sleep(1)
    await asyncio.sleep(1)
```

Use `asyncio.gather()` to run multiple coroutines concurrently:

```python
async def task(name, delay):
    await asyncio.sleep(delay)
    print(f"{name} done")
    return name

async def main():
    # Concurrent — 2 seconds total (not 1+2+3=6)
    results = await asyncio.gather(
        task("A", 1),
        task("B", 2),
        task("C", 3),
    )
    print(results)  # ['A', 'B', 'C']

asyncio.run(main())
```

For more control, use `asyncio.create_task()`:

```python
async def main():
    task_a = asyncio.create_task(task("A", 1))
    task_b = asyncio.create_task(task("B", 2))

    # Do other work here while tasks run in background
    print("tasks started")

    a_result = await task_a
    b_result = await task_b
```

## Async Context Managers and Iterators

Many async libraries use `async with` and `async for`:

```python
# async with — for resources that need async setup/teardown
async with aiohttp.ClientSession() as session:
    response = await session.get(url)
    data = await response.json()

# async for — for streams or async generators
async def stream_data():
    for i in range(5):
        await asyncio.sleep(0.1)
        yield i

async def main():
    async for value in stream_data():
        print(value)
```

## Error Handling

Handle errors in async code the same way as sync — with try/except:

```python
async def fetch(url):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=5)) as r:
                r.raise_for_status()
                return await r.json()
    except aiohttp.ClientError as e:
        print(f"Request failed: {e}")
        return None
```

With `asyncio.gather()`, use `return_exceptions=True` to prevent one failure from cancelling all tasks:

```python
results = await asyncio.gather(
    fetch("https://api.example.com/1"),
    fetch("https://api.example.com/bad"),
    fetch("https://api.example.com/3"),
    return_exceptions=True  # exceptions become values, not raised
)

for r in results:
    if isinstance(r, Exception):
        print(f"Failed: {r}")
    else:
        print(f"Got: {r}")
```

## Common Mistakes

### 1. Forgetting await

```python
# WRONG — creates coroutine object, never runs it
async def main():
    result = fetch_data()  # ← missing await

# CORRECT
async def main():
    result = await fetch_data()
```

### 2. Using sync libraries in async code

```python
# WRONG — blocks the event loop, negates async benefits
async def main():
    response = requests.get(url)  # blocks for 200ms

# CORRECT — use async library
async def main():
    async with aiohttp.ClientSession() as s:
        response = await s.get(url)
```

If you must use a blocking function, run it in a thread pool:

```python
import asyncio

async def main():
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, blocking_function, arg)
```

### 3. Calling asyncio.run() inside async code

```python
# WRONG — asyncio.run() starts a new event loop
async def inner():
    asyncio.run(other())  # RuntimeError: can't run nested event loops

# CORRECT
async def inner():
    await other()
```

## When to Use Async

Use async when your code is **I/O bound** — spending time waiting for network, disk, or database:

✅ Good use cases:

- Web scraping multiple URLs
- Calling multiple APIs
- High-throughput web servers (FastAPI, Aiohttp)
- Database queries with `asyncpg` or `databases`

❌ Not helpful for:

- CPU-intensive work (image processing, ML inference) — use multiprocessing instead
- Simple scripts with one or two I/O calls
- Code that calls synchronous libraries you can't replace

## Quick Reference

```python
import asyncio

# Define async function
async def my_func():
    await some_async_operation()
    return result

# Run from sync code
asyncio.run(my_func())

# Run concurrently
results = await asyncio.gather(func1(), func2(), func3())

# Create background task
task = asyncio.create_task(my_func())
result = await task

# Async context manager
async with resource as r:
    await r.do_something()

# Async for loop
async for item in async_generator():
    process(item)

# Run blocking code without blocking event loop
result = await asyncio.get_event_loop().run_in_executor(None, blocking_func)

# Timeout
try:
    result = await asyncio.wait_for(my_func(), timeout=5.0)
except asyncio.TimeoutError:
    print("timed out")
```

Async isn't magic — it's cooperative multitasking. Functions voluntarily yield control at `await` points. Once you understand that, the rest follows naturally.
