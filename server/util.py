import json
import pickle
import numpy as np

__model = None
__feature_columns = None

def load_artifacts():
    global __model
    global __feature_columns

    with open("artifacts/Kolkata_House_Prices.pickle", "rb") as f:
        __model = pickle.load(f)

    with open("artifacts/columns.json", "r") as f:
        data_columns = json.load(f)['data_columns']
        __feature_columns = data_columns

def get_estimated_price(location, sqft, bhk, bath):
    global __feature_columns
    global __model

    # Ensure artifacts are loaded
    if __model is None or __feature_columns is None:
        load_artifacts()

    x_input = np.zeros(len(__feature_columns))

    # Fill in numerical features
    try:
        x_input[__feature_columns.index('total_sqft')] = sqft
        x_input[__feature_columns.index('size (bhk)')] = bhk
        x_input[__feature_columns.index('bath')] = bath
        x_input[__feature_columns.index('bhk_per_sqft')] = bhk / sqft if sqft > 0 else 0
        x_input[__feature_columns.index('bath_per_sqft')] = bath / sqft if sqft > 0 else 0
    except ValueError as e:
        return f"Feature column missing: {e}"

    # One-hot encode location
    if location in __feature_columns:
        loc_index = __feature_columns.index(location)
        x_input[loc_index] = 1
    else:
        return f"Location '{location}' not found."

    return round(abs(__model.predict([x_input])[0]), 2)

def get_location_names():
    try:
        with open("artifacts/columns.json", "r") as f:
            data = json.load(f)
        # Return all location names (assuming first 3 columns are features)
        return data["data_columns"][4:]
    except Exception as e:
        print("Error loading locations:", e)
        return []

def load_saved_artifacts():
    print("Loading saved artifacts...start")
    global __data_columns
    global __locations

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[4:]

    global __model
    with open("./artifacts/Kolkata_House_Prices.pickle", 'rb') as f:
        __model = pickle.load(f)
    print("Loading saved artifacts...done")

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_estimated_price('bhowanipore, kolkata', 1800, 3, 3))
    print(get_estimated_price('pailan, kolkata', 1800, 4, 3))

load_saved_artifacts()
