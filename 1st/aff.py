from flask import Flask, request, jsonify
import requests
import json
import time

app = Flask(__name__)

@app.route('/numbers', methods=['GET'])
def get_numbers():
    urls = request.args.getlist('url')

    merged_numbers = []

    for url in urls:
        try:
            response = requests.get(url, timeout=0.5)  
            if response.status_code == 200:
                data = response.json()
                if 'numbers' in data and isinstance(data['numbers'], list):
                    merged_numbers.extend(data['numbers'])
        except requests.Timeout:
            
            pass

   
    merged_numbers = sorted(list(set(merged_numbers)))

    return jsonify({'numbers': merged_numbers})

if __name__ == '__main__':
    app.run(host='localhost', port=8008)
