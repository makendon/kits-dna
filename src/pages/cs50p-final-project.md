---
permalink: /side-projects/{{ page.fileSlug }}/
title: CS50P final project
---
For my final project I made a terminal programme called the **Investment Portfolio**.

<figure>
    <img src="/assets/images/undraw/undraw_programming_65t2.svg" alt="Static website" eleventy:widths="600">
    <figcaption>Programming</figcaption>
</figure>

The programme lets you add and remove assets in the terminal, makes an API call to get the latest closing price and returns a table or CSV file. You can also view your total portfolio value. I wanted to make a programme that covered the constraints of the project but that I could also continue to develop and iterate on over time.

The programme covers the following course topics:

- Functions
- Conditions
- Exceptions
- Loops
- Libraries
- Dictionaries
- Lists
- Testing
- File I/O
- Classes

## Demo

Quick 3 minute demo of the **Investment Portfolio**.

<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/MZXWuFO9QUA?si=-LlyEU24wJoRU8eY"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

## Code example

Here's some code that creates a class called `Asset` - replicating a real life investment asset - and uses a library called `yfinance` in a function that returns the price. The price is then used to calculate the assets value. `@property` decorates the price and value functions allowing access via dot notation e.g. `asset.value` rather than `asset.value()`.

```python
import yfinance as yf


class Asset:
    def __init__(self, name, symbol, asset_type, quantity):
        self.name = name
        self.symbol = symbol
        self.asset_type = asset_type
        self.quantity = quantity

    @property
    def price(self):
        info = yf.Ticker(self.symbol)
        return float(info.info.get("previousClose"))

    @property
    def value(self):
        return (self.quantity * self.price) / 100
```

This is just a small part of the programme, check out the [README](https://github.com/makendon/cs50p-final-project/blob/main/README.md) on GitHub to find out more about the design of the programme.

## Roadmap

In true product fashion here's the **Investment Portfolio** roadmap. My focus is still on learning! I've got some more tutorial projects to build and some packages to play with before I start tackling what's *next*. I'll update the roadmap as I iterate, and I'll write blog posts as I add exciting new capabilities :rocket:

| :building_construction: Now | :telescope: Next | :seedling: Later |
|--|--|--|
| Learning | Database | Graphic User Interface |
|  | Data analysis | Web application |
|  | Data visualisation | Growth of £/$ |
|  | Contribute/Withdraw  | Costs |
|  | Allocation | News |
|  | Cashflow  | PDF |
|  |  | Rules |
|  |  | AI |

### Completed

- :white_check_mark: Terminal programme
