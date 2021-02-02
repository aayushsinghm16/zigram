const state = {
    cocktails:[],
    categoryList:[],
    ingredientsList:[]
}

const getters = {

}

const actions = {
    async cocktailsByName({commit}){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
        let result = await this.$axios.$get(url);
        //console.log(result)
    },
    async cocktailsCategories({commit}){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
        let result = await this.$axios.$get(url);
        commit('updateCategoriesList',result.drinks)
        return result
    },
    async ingredientsCategories({commit}){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`;
        let result = await this.$axios.$get(url);
        commit('updateIngredientsList',result.drinks)
        return result
    },
    async cocktailsByCategories({commit},payload){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${payload}`;
        let result = await this.$axios.$get(url);
        commit('updateCocktails',result.drinks)
        return result
    },
    async cocktailsByIngredients({commit},payload){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${payload}`;
        let result = await this.$axios.$get(url);
        commit('updateCocktails',result.drinks)
        return result
    },
    async cocktailsRandom({commit}){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`;
        let result = await this.$axios.$get(url);
        commit('updateCocktails',result.drinks)
        return result
    },
    async cocktailsByName({commit},payload){
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${payload}`
        let result = await this.$axios.$get(url);
        commit('updateCocktails',result.drinks)
        return result
    }
}

const mutations = {
    updateCategoriesList(state,data){
        state.categoryList= data
    },
    updateCocktails(state,data){
        state.cocktails = data
    },
    updateIngredientsList(state,data){
        state.ingredientsList = data
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
