import pandas as pd
# Set Pandas to display all columns
pd.set_option('display.max_columns', None)

amazon_df = pd.read_csv('/Users/eliasmini/Documents/GitHub/SceneIT/MediaData/amazon_prime_titles.csv')
# null features
'''
director
cast
country
date_added
duration
'''

# clean director
amazon_df['director'] = amazon_df['director'].fillna('Unknown')

# clean cast
amazon_df['cast'] = amazon_df['cast'].fillna('Unknown')

# clean country
amazon_df['country'] = amazon_df['country'].fillna('United States')

# data_added
amazon_df.drop('date_added', axis=1, inplace=True)

# clean rating
amazon_df['rating'] = amazon_df['rating'].fillna(
amazon_df['rating'].apply(lambda column_name: 'PG-13' if column_name == 'Movie' else 'TV-14'))


# clean duration
'''
get average duration of tv shows and movies
turn values into ints
'''
# Function to get averages
def getAverages(df):
    movie_sum, tv_sum = 0, 0
    movie_avg, show_avg = 0, 0

    for _, row in df.iterrows():
        if pd.isna(row['duration']):
            continue

        # Extract integer duration from string (e.g., '120 min' -> 120)
        duration = row['duration']

        if row['type'] == 'Movie':
            movie_sum += duration
            movie_avg += 1  # Count movies

        elif row['type'] == 'TV Show':
            tv_sum += duration
            show_avg += 1  # Count TV Shows

    movie_avg = movie_sum // movie_avg if movie_avg > 0 else 0
    show_avg = tv_sum // show_avg if show_avg > 0 else 0
    return movie_avg, show_avg

# Function to change duration values to integers
def changeToInts(df):
    for index, row in df.iterrows():
        if pd.isna(row['duration']):
            continue
        else:
            # Extract the integer part of the duration
            amazon_df.at[index, 'duration'] = int(row['duration'].split(' ')[0])

# Function to fill NaN values in duration column
def fillNaNValues(movie_avg, show_avg):
    # Replace NaN with respective averages based on 'type'
    amazon_df['duration'] = amazon_df.apply(
        lambda row: movie_avg if row['type'] == 'Movie' and pd.isna(row['duration']) else
                    (show_avg if row['type'] == 'TV Show' and pd.isna(row['duration']) else row['duration']),
        axis=1
    )

# Convert all durations to integers
changeToInts(amazon_df)
movieAvg, showAvg = getAverages(amazon_df)

# Fill NaN values with movieAvg or showAvg based on 'type'
fillNaNValues(movieAvg, showAvg)
# Ensure 'duration' column is an integer type
amazon_df['duration'] = amazon_df['duration'].astype(int)

print(amazon_df.info())
