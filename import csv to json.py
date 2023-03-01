# import csv to json

import csv
import pymongo

# a changer
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["mydatabase"]
mycol = mydb["customers"]

print('Hello world !')

with open('C:\Users\andreas\Bachelor\DEV_back_end\steam.csv', 'r', encoding='ISO-8859-1') as f:
    reader = csv.reader(f, delimiter=';')
    next(reader)

    for row in reader:

        # a changer a partir de la 
        print(row[0])
        mydict = { "name": "John", "address": "Highway 37" }
        x = mycol.insert_one(mydict)