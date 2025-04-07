import pandas as pd

disney_df = pd.read_csv('MediaData/disney_plus_titles.csv')

# Drop "date_added" feature.
disney_df.drop(["date_added"], axis= 1, inplace= True)

# Clean Director
disney_df['director'] = disney_df['director'].fillna('Unknown')

# Clean Cast
disney_df['cast'] = disney_df['cast'].fillna('Unknown')

# Clean Country
disney_df['country'] = disney_df['country'].fillna('United States')

# Clean Rating
disney_df['rating'] = disney_df['rating'].fillna(
    disney_df['type'].apply(lambda column_name: 'PG-13' if column_name == 'Movie' else 'TV-14')
)

with open('MediaData/cleaned/disney_plus_titles_cleaned.csv', 'w', encoding='utf-8') as file:
    disney_df.to_csv(file, sep=',', index=False)
