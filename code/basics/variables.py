# Python Variables - Code Mage Tutorial
# Learn the basics of Python variables

# String variables
name = "Code Mage"
tagline = "Code Your Magic"
language = "Python"

print(f"Welcome to {name}!")
print(f"Our tagline: {tagline}")
print(f"We're learning: {language}")

# Numeric variables
age = 25
score = 95.5
is_beginner = True

print(f"Age: {age}")
print(f"Score: {score}")
print(f"Is beginner: {is_beginner}")

# Variable reassignment
level = "Beginner"
print(f"Current level: {level}")

level = "Intermediate"
print(f"New level: {level}")

# Multiple assignment
x, y, z = 1, 2, 3
print(f"x={x}, y={y}, z={z}")

# Variable naming best practices
user_name = "good_example"  # Good: descriptive, snake_case
userName = "camelCase"      # Avoid: not Python convention
# 2name = "invalid"         # Error: can't start with number
# class = "keyword"         # Error: Python keyword

# Type checking
print(f"Type of name: {type(name)}")
print(f"Type of age: {type(age)}")
print(f"Type of score: {type(score)}")
print(f"Type of is_beginner: {type(is_beginner)}")

# Exercise: Create your own variables
your_name = "Your Name Here"
your_age = 0
favorite_language = "Python"
loves_coding = True

print("\n--- Your Variables ---")
print(f"Name: {your_name}")
print(f"Age: {your_age}")
print(f"Favorite Language: {favorite_language}")
print(f"Loves Coding: {loves_coding}")