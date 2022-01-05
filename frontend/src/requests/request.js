import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost"
import gql from 'graphql-tag'

const endPointURL = "http://localhost:4000/graphql";

const client = new ApolloClient({
    link: new HttpLink({uri: endPointURL}),
    cache: new InMemoryCache()
})


export async function loadAllPokemon() {
    const query = gql`query{
        pokemons(query: {
            limit: 151
        }) {
          edges{
            id
            name
            types
            isFavorite
            image
          }
        }
      }`

    const {data} = await client.query({query});
    return data.pokemons.edges;
}

export async function searchPokemon(string) {
    const query = gql`query{
        pokemons(query:{
          search: "${string}"
        }){
          edges {
            id
            name
            types
            isFavorite
            image
          }
        }
      }
    `
    const {data} = await client.query({query});
    return data.pokemons.edges;
}


export async function loadPokemonById(id) {
    const query = gql`query {
        pokemonById (id:"${id}") {
          id
          name
          isFavorite
        }
    }`

    const {data} = await client.query({query});
    return data;
}

export async function loadPokemonByName(name) {
    const query = gql`query {
        pokemonByName (name:"${name}") {
            id
            name
            types
            weight {
              minimum
              maximum
            }
            height{
              minimum
              maximum
            }
            evolutions {
              id
              name
              image
              isFavorite
            }
            isFavorite
            image
            maxCP
            maxHP
        }
    }`

    const {data} = await client.query({query});
    return data;
}

export async function loadPokemonByType(type) {
    const query = gql`query {
        pokemonByType (type:"${type}") {
          id
          name
          types
          isFavorite
          image
        }
    }`

    const {data} = await client.query({query});
    return data;
}

export async function likePokemon(id) {
    const {data} = await client.mutate({
        mutation: gql`
         mutation {
            favoritePokemon(id: "${id}") {
                isFavorite
                id
              }
         }`,
     });
    return data;
}


export async function unlikePokemon(id) { 
    const {data} = await client.mutate({
        mutation: gql`
         mutation {
            unFavoritePokemon(id: "${id}") {
                isFavorite
                id
              }
         }`,
     });
    return data;
}