from aifc import Error
from flask import Flask, jsonify, render_template
import sqlite3
import pandas as pd
from sqlalchemy import create_engine

def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect('db_file.db')
    except Error as e:
        print(e)
    return conn

df = pd.read_csv("C:/Users/WIN/Desktop/Rana Waleed 202201737(project203)/project 203.csv (1).csv")

df["Students"] = df["Students"].sort_values()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


#pie Chart
@app.route('/get-datachart')
def get_datachart():
    classes = df["School"].value_counts().index
    values = df["Expenses"].value_counts().values
    data = []
    for i in range(len(classes)):
        data.append({"class":classes[i],"value":int(values[i])})

    return jsonify(data)
# #####################################################
#horizontal bar chart
@app.route('/get-datatable')
def get_datatable():
    data_grouped = df['School'].value_counts()
    data = []
    for i in range(len(data_grouped.index)):
        dict_d = {}
        dict_d['School'] = data_grouped.index[i]
        dict_d['value'] = int(data_grouped.values[i])
        data.append(dict_d)
    return jsonify(data)


# #######################################
#tree chart
@app.route('/get-dataTree')
def get_data_tree():
    # Group data by School, Program, and count students
    tree_data = df.groupby(['School', 'Program'])['Students'].count().reset_index()
    tree_data.columns = ['name', 'children', 'value']

    # Group data by School and count students
    school_data = df.groupby('School')['Students'].count().reset_index()
    school_data.columns = ['name', 'value']

    # Merge data into a hierarchical structure
    data = [{'name': 'Schools', 'children': tree_data.to_dict(orient='records')}, {'name': 'Schools', 'children': school_data.to_dict(orient='records')}]

    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True)





