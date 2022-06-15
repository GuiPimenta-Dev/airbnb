from time import sleep
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver import ChromeOptions
import re

import json


def extract_numbers(string: str):
    return float(re.search("[0-9,]+", string).group().replace(',', '.'))


def has_numbers(string):
    return bool(re.search(r'\d', string))


def average(lst):
    return round(sum(lst) / len(lst), 2)


def get_min_and_max_values(my_list):
    items = []
    for item in my_list:
        for inner_item in item:
            items.append(inner_item)
    return min(items), max(items)


def get_average_and_items(items):
    my_items = []
    for i in items:
        if has_numbers(i.text):
            my_items.append(extract_numbers(str(i.text)))
    if len(my_items) > 0:
        return average(my_items), min(my_items), max(my_items)
    return None, None, None


def filter_list(my_list):
    return list(filter(None, my_list))


def check_gt(number):
    return number > 10


options = ChromeOptions()
options.headless = False
driver = Chrome(options=options)
driver.maximize_window()


def crawl(url):
    grades_avg, min_grades, max_grades = [], [], []
    prices_avg, min_prices, max_prices = [], [], []
    while True:
        driver.get(url)
        sleep(1)
        prices_elements = driver.find_elements(by=By.XPATH, value='//span[@class="_tyxjp1"]')
        grades_elements = driver.find_elements(by=By.XPATH, value='//span[@class="ru0q88m dir dir-ltr"]')
        my_grades_avg, my_min_grades, my_max_grades = get_average_and_items(grades_elements)
        grades_avg.append(my_grades_avg)
        min_grades.append(my_min_grades)
        max_grades.append(my_max_grades)

        my_prices_avg, my_min_prices, my_max_prices = get_average_and_items(prices_elements)
        prices_avg.append(my_prices_avg)
        min_prices.append(my_min_prices)
        max_prices.append(my_max_prices)

        try:
            url = driver.find_element(by=By.XPATH, value='//a[@aria-label="Próximo"]').get_attribute('href')
        except NoSuchElementException:
            break

    filtered_min_prices = list(filter(check_gt, filter_list(min_prices)))

    return {
        'grade_avg': average(filter_list(grades_avg)),
        'min_grade': min(filter_list(min_grades)),
        'max_grades': max(filter_list(max_grades)),
        'prices_avg': average(filter_list(prices_avg)),
        'min_price': min(filtered_min_prices),
        'max_price': max(filter_list(max_prices))
    }


capital = crawl("https://www.airbnb.com.br/s/S%C3%A3o-Paulo--SP--Brasil/homes")
alphaville = crawl("https://www.airbnb.com.br/s/alphaville/homes")
driver.quit()

with open('src/data.json', 'w', encoding='utf-8') as f:
    json.dump({
        "boolRender": True,
        "alphaville": {
            "grade_avg": alphaville["grade_avg"],
            "min_grade": alphaville["min_grade"],
            "max_grades": alphaville["max_grades"],
            "prices_avg": alphaville["prices_avg"],
            "min_price": alphaville["min_price"],
            "max_price": alphaville["max_price"]
        },
        "capital": {
            "grade_avg": capital["grade_avg"],
            "min_grade": capital["min_grade"],
            "max_grades": capital["max_grades"],
            "prices_avg": capital["prices_avg"],
            "min_price": capital["min_price"],
            "max_price": capital["max_price"]
        }
    }, f, ensure_ascii=False, indent=4)
