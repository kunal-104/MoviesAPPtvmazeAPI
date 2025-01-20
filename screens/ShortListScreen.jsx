import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ShortListScreen = ({ favoriteMovies, toggleFavorite }) => {
  const isFavorite = (movie) => favoriteMovies.some(fav => fav.id === movie.id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Movies</Text>
      {favoriteMovies.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.noFavorites}>No favorite movies yet.</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.movieImage}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.releaseDate}>Release Date: {item.release_date}</Text>
                <Text style={styles.rating}>Rating: {item.vote_average}</Text>
              </View>
              {/* Favorite Icon */}
              <View style={styles.favourite}>
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <MaterialIcons 
                    name={isFavorite(item) ? "favorite" : "favorite-border"} 
                    size={30} 
                    color={isFavorite(item) ? "#ff6347" : "#fff"} // Change color based on favorite status
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212', // Dark background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White text for title
  },
  centered: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  noFavorites: {
    fontSize: 18,
    color: '#bbb', // Lighter grey for no favorites text
    textAlign: 'center', // Centers text horizontally
  },
  movieItem: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e', // Slightly lighter black for movie items
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for movie title
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 14,
    color: '#bbb', // Lighter grey for release date
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#bbb', // Lighter grey for rating
    marginBottom: 10,
  },
  favourite: {
    justifyContent: 'center',
  },
});

export default ShortListScreen;
