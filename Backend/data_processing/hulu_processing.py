import pandas as pd

hulu_df = pd.read_csv('MediaData/hulu_titles.csv')

# Drop "date_added" feature.
hulu_df.drop(["date_added"], axis= 1, inplace= True)

# Clean Director
hulu_df['director'] = hulu_df['director'].fillna('Unknown')

# Clean Cast
hulu_df['cast'] = hulu_df['cast'].fillna('Unknown')

# Clean Country
hulu_df['country'] = hulu_df['country'].fillna('United States')

# Clean Rating
hulu_df['rating'] = hulu_df['rating'].fillna(
    hulu_df['type'].apply(lambda column_name: 'PG-13' if column_name == 'Movie' else 'TV-14')
)


# Clean Description
hulu_df['description'] = hulu_df['description'].fillna("Unknown")


# Clean Duration

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
            hulu_df.at[index, 'duration'] = int(row['duration'].split(' ')[0])

# Function to fill NaN values in duration column
def fillNaNValues(movie_avg, show_avg):
    # Replace NaN with respective averages based on 'type'
    hulu_df['duration'] = hulu_df.apply(
        lambda row: movie_avg if row['type'] == 'Movie' and pd.isna(row['duration']) else
                    (show_avg if row['type'] == 'TV Show' and pd.isna(row['duration']) else row['duration']),
        axis=1
    )

# Convert all durations to integers
changeToInts(hulu_df)
movieAvg, showAvg = getAverages(hulu_df)

# Fill NaN values with movieAvg or showAvg based on 'type'
fillNaNValues(movieAvg, showAvg)
# Ensure 'duration' column is an integer type

hulu_df['duration'] = hulu_df['duration'].astype(int)

with open('MediaData/cleaned/hulu_titles_cleaned.csv', 'w', encoding='utf-8') as file:
    hulu_df.to_csv(file, sep=',', index=False)

