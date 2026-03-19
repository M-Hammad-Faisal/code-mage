# Build a Web Scraper in 15 Minutes

Web scraping is one of the most practical Python skills. You'll use it to collect data, automate research, and build tools that save hours of manual work. This lesson builds a real scraper step by step.

## What We're Building

A scraper that collects product names, prices, and ratings from [books.toscrape.com](http://books.toscrape.com) — a site built specifically for scraping practice. By the end you'll have a working script that exports data to CSV.

## Setup

Install the two libraries you need:

```bash
pip install requests beautifulsoup4
```

- **requests** — makes HTTP requests
- **beautifulsoup4** — parses HTML

## Your First Request

```python
import requests

url = "http://books.toscrape.com"
response = requests.get(url)

print(response.status_code)  # 200 = success
print(len(response.text))    # size of HTML
```

Always check the status code. A 200 means success. 403 means blocked. 404 means not found.

## Parsing HTML with BeautifulSoup

```python
from bs4 import BeautifulSoup

soup = BeautifulSoup(response.text, "html.parser")

# Find the page title
title = soup.find("title")
print(title.text)  # All products | Books to Scrape - Sandbox
```

BeautifulSoup gives you two main methods:

- `find(tag)` — returns the first match
- `find_all(tag)` — returns a list of all matches

## Inspecting the Target

Before writing code, inspect the page in your browser (Right-click → Inspect). Find the HTML structure of what you want to scrape.

On books.toscrape.com, each book is in an `<article class="product_pod">` element:

```html
<article class="product_pod">
  <div class="image_container">...</div>
  <p class="star-rating Three">...</p>
  <h3><a href="..." title="A Light in the Attic">A Light in the Attic</a></h3>
  <div class="product_price">
    <p class="price_color">£51.77</p>
    <p class="instock availability">In stock</p>
  </div>
</article>
```

## Scraping One Page

```python
import requests
from bs4 import BeautifulSoup

def scrape_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    books = []
    for article in soup.find_all("article", class_="product_pod"):
        # Title is in the <a> tag's title attribute inside <h3>
        title = article.find("h3").find("a")["title"]

        # Price text includes the £ symbol
        price_text = article.find("p", class_="price_color").text
        price = float(price_text.replace("£", "").replace("Â", ""))

        # Rating is a word in the class name: "star-rating Three"
        rating_map = {"One": 1, "Two": 2, "Three": 3, "Four": 4, "Five": 5}
        rating_classes = article.find("p", class_="star-rating")["class"]
        rating_word = [c for c in rating_classes if c != "star-rating"][0]
        rating = rating_map.get(rating_word, 0)

        books.append({"title": title, "price": price, "rating": rating})

    return books

books = scrape_page("http://books.toscrape.com")
for book in books[:3]:
    print(book)
# {'title': 'A Light in the Attic', 'price': 51.77, 'rating': 3}
# {'title': 'Tipping the Velvet', 'price': 53.74, 'rating': 1}
# {'title': 'Soumission', 'price': 50.1, 'rating': 1}
```

## Handling Multiple Pages

The site has 50 pages. Each page links to the next. Let's scrape all of them:

```python
def get_next_page_url(soup, base_url):
    next_btn = soup.find("li", class_="next")
    if not next_btn:
        return None
    relative_url = next_btn.find("a")["href"]
    # Handle both root and category pages
    if "catalogue/" in base_url:
        return base_url.rsplit("/", 1)[0] + "/" + relative_url
    return base_url.rstrip("/") + "/catalogue/" + relative_url

def scrape_all_pages(start_url, max_pages=None):
    url = start_url
    all_books = []
    page = 1

    while url:
        print(f"Scraping page {page}...")
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")

        books = scrape_page_from_soup(soup)
        all_books.extend(books)

        url = get_next_page_url(soup, url)
        page += 1

        if max_pages and page > max_pages:
            break

    return all_books
```

## Being a Polite Scraper

Add delays between requests — you don't want to hammer someone's server:

```python
import time
import random

def scrape_all_pages(start_url, max_pages=5):
    url = start_url
    all_books = []
    page = 1

    while url and page <= max_pages:
        print(f"Scraping page {page}...")
        response = requests.get(url, headers={
            "User-Agent": "Mozilla/5.0 (educational scraper)"
        })
        soup = BeautifulSoup(response.text, "html.parser")

        all_books.extend(scrape_page_from_soup(soup))
        url = get_next_page_url(soup, url)
        page += 1

        # Random delay between 0.5 and 1.5 seconds
        time.sleep(random.uniform(0.5, 1.5))

    return all_books
```

Always add a `User-Agent` header and a delay. It's good etiquette and helps avoid getting blocked.

## Saving to CSV

```python
import csv

def save_to_csv(books, filename="books.csv"):
    if not books:
        print("No books to save.")
        return

    fieldnames = ["title", "price", "rating"]
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(books)

    print(f"Saved {len(books)} books to {filename}")
```

## Putting It All Together

```python
import requests
import time
import random
import csv
from bs4 import BeautifulSoup

BASE_URL = "http://books.toscrape.com"

def scrape_page_from_soup(soup):
    books = []
    rating_map = {"One": 1, "Two": 2, "Three": 3, "Four": 4, "Five": 5}

    for article in soup.find_all("article", class_="product_pod"):
        title = article.find("h3").find("a")["title"]
        price = float(article.find("p", class_="price_color").text.replace("£", "").replace("Â", ""))
        rating_word = [c for c in article.find("p", class_="star-rating")["class"] if c != "star-rating"][0]
        books.append({"title": title, "price": price, "rating": rating_map.get(rating_word, 0)})

    return books

def get_next_url(soup, current_url):
    nxt = soup.find("li", class_="next")
    if not nxt:
        return None
    href = nxt.find("a")["href"]
    return BASE_URL + "/catalogue/" + href if "catalogue" not in current_url else current_url.rsplit("/", 1)[0] + "/" + href

def run():
    url = BASE_URL
    all_books = []

    while url:
        print(f"Scraping: {url}")
        r = requests.get(url, headers={"User-Agent": "Mozilla/5.0 (scraping demo)"})
        soup = BeautifulSoup(r.text, "html.parser")
        all_books.extend(scrape_page_from_soup(soup))
        url = get_next_url(soup, url)
        time.sleep(random.uniform(0.5, 1.0))

    with open("books.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["title", "price", "rating"])
        writer.writeheader()
        writer.writerows(all_books)

    print(f"Done. Scraped {len(all_books)} books.")

if __name__ == "__main__":
    run()
```

Run it: `python scraper.py` — you'll get a `books.csv` with all 1000 books.

## What to Do When a Site Blocks You

- **Add headers**: Mimic a real browser with `User-Agent`, `Accept`, `Accept-Language`
- **Add delays**: `time.sleep()` between requests
- **Handle errors**: Check for 403, 429, 503 and retry with exponential backoff
- **Use sessions**: `requests.Session()` reuses connections and maintains cookies
- **Check robots.txt**: Always check `domain.com/robots.txt` before scraping

```python
# Retry with backoff
import time

def get_with_retry(url, retries=3):
    for attempt in range(retries):
        r = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code == 200:
            return r
        if r.status_code == 429:  # Too Many Requests
            wait = 2 ** attempt
            print(f"Rate limited. Waiting {wait}s...")
            time.sleep(wait)
    return None
```

Web scraping is a real skill — part HTTP, part HTML parsing, part detective work. The best way to learn is to pick a real site and start extracting.
